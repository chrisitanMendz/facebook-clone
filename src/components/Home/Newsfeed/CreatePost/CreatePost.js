import React from "react";

// Styles
import {
  postingContainer,
  div1,
  div2,
  button,
  icon,
} from "./CreatePost.module.scss";

// Data
import { iconPosting, icons } from "./data";

const CreatePost = ({ user, setPopupCreatePost }) => {
  const { displayName, photoURL } = user;
  const name = displayName.split(" ");
  const firstName = name[0];

  return (
    <div className={postingContainer}>
      <div className={div1}>
        <img src={photoURL} alt="" />
        <div onClick={() => setPopupCreatePost(true)}>
          What's on your mind, {firstName}?
        </div>
      </div>

      <div className={div2}>
        {iconPosting.map(({ name, pos }) => (
          <div
            key={name}
            className={button}
            onClick={() => setPopupCreatePost(true)}
          >
            <i
              data-visualcompletion="css-img"
              style={{
                backgroundImage: `url(${icons})`,
                backgroundPosition: `${pos}`,
                backgroundSize: "26px 656px",
                width: "24px",
                height: "24px",
                backgroundRepeat: "no-repeat",
                display: "inline-block",
              }}
              className={icon}
            ></i>
            <p>{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatePost;
