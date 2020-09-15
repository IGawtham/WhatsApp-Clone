import React, { useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined, InsertEmoticon } from "@material-ui/icons";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios";
const Chat = ({ messages }) => {
  const [input, setInput] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("/messages/new", {
      message: input,
      name: "Gawtham",
      timeStamp: "now",
      received: false,
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar />
        <div className="chat-header-info">
          <h3>Room Name</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat-header-right">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat-body">
        {messages.map((message) => (
          <p className={`chat-message ${message.received && "chat-receiver"}`}>
            <span className="chat-name">{message.name}</span>
            {message.message}
            <span className="chat-timestamp">{message.timeStamp}</span>
          </p>
        ))}
      </div>

      <div className="chat-footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage}> Send a Message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
