//Imports
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";
//app config
const app = express();
const port = process.env.PORT || 5000;

const pusher = new Pusher({
  appId: "1073474",
  key: "55ca5c7d6693592b419e",
  secret: "295aa9ec232470203bb6",
  cluster: "ap2",
  encrypted: true,
});

//middleware
app.use(express.json());

//allow all header to access the application
app.use(cors());

//Below is alternative to cors
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Access-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });
//DB Config
const connectionUri = `mongodb+srv://WA-Admin:wa-admin@whatsapp.wst94.mongodb.net/Appdb?retryWrites=true&w=majority`;
mongoose.connect(connectionUri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("Db Connected");

  const messageCollection = db.collection("messagecontents");
  const changeStream = messageCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      //Arg1: channnel-name Arg2: event
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timeStamp: messageDetails.timeStamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error Triggering in the pusher");
    }
  });
});

// ???

//api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/api/v1/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/api/v1/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`New Message created ${data}`);
    }
  });
});
//listener
app.listen(port, () => console.log(`Listening on Port ${port}`));
