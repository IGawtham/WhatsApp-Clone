import React from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
const SidebarChat = () => {
  return (
    <div className="sidebar-chat">
      <Avatar />
      <div className="sidebar-info">
        <h2>Room Name</h2>
        <p>Last message</p>
      </div>
    </div>
  );
};

export default SidebarChat;
