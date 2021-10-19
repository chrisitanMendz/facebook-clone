import React from "react";

// Styles
import {
  createRoomContainer,
  iconContainer,
  icon,
  userContainer,
  active,
  userWrapper,
} from "./CreateRoom.module.scss";

// Data
import { lists } from "./data";

// Image
import url from "../../../../assets/createRoom.png";

const CreateRoom = () => {
  return (
    <div className={createRoomContainer}>
      <div className={iconContainer}>
        <i
          data-visualcompletion="css-img"
          style={{
            backgroundImage: `url(${url})`,
            backgroundPosition: "0 -220px",
            backgroundSize: "502px 246px",
            width: "24px",
            height: "24px",
            backgroundRepeat: "no-repeat",
            display: "inline-block",
          }}
          className={icon}
        ></i>
        <p>Create Room</p>
      </div>

      <div className={userContainer}>
        {lists.map(({ name, url }, index) => (
          <div
            key={index}
            className={userWrapper}
            style={{ backgroundImage: url }}
          >
            <div className={active}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateRoom;
