import React from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton, Avatar } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Avatar src="https://scontent.fmaa2-1.fna.fbcdn.net/v/t1.0-9/22308869_2374417309450015_1138685948248613972_n.jpg?_nc_cat=102&_nc_sid=730e14&_nc_ohc=dasjqAVigcQAX-BCvCq&_nc_ht=scontent.fmaa2-1.fna&oh=8f65f5faf97349ffe5aebb34f5f390b6&oe=5F7CA37C" />
        <div className="sidebar-header-right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar-search">
        <div className="sidebar-search-container">
          <SearchOutlined />
          <input type="text" placeholder="Search or Start new chat" />
        </div>
      </div>

      <div className="sidebar-chats">
        <SidebarChat />
      </div>
    </div>
  );
};

export default Sidebar;
