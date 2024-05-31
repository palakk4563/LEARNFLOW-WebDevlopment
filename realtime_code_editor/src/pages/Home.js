import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setroomId] = useState("");
  const [username, setusername] = useState("");
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setroomId(id);
    toast.success("Created New Room");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Room ID and Username is required");
      return;
    }
    //redirect
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = (e) => {
    // console.log("event", e.code);
    if (e.code === "Enter") {
      joinRoom();
    }
  };
  return (
    <div className="homepageWrapper">
      <div className="formWrapper">
        <div className="main_title">
          <img src="/icon_editor.jpg" alt="logo" id="logo" />
          <h1>Code Editor</h1>
        </div>
        <h4 className="mainLabel"> Enter Invitation Room Id</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="Room Id"
            value={roomId}
            onChange={(e) => setroomId(e.target.value)}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            onKeyUp={handleInputEnter}
          />
          <button className="btn joinbtn" onClick={joinRoom}>
            Join
          </button>
          <span className="createInfo">
            If you don't have an invite then create &nbsp;
            <a href="" onClick={createNewRoom} className="createNewlink">
              New Room
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>
          Built with 💛 by &nbsp;
          <a href="https://github.com/palakk4563"> Palak kumari </a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
