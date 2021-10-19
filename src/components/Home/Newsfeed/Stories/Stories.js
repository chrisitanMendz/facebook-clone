import React from "react";

// Icons
import { FaPlus } from "react-icons/fa";

// Data
import { listOfImage } from "./data";

// Styles
import {
  storiesContainer,
  storiesWrapper,
  iconTextContainer,
  iconContainer,
  icon,
  cname,
} from "./Stories.module.scss";

const Stories = ({ user }) => {
  const { photoURL } = user;

  return (
    <div className={storiesContainer}>
      <div
        className={storiesWrapper}
        style={{
          backgroundImage: `url(${photoURL})`,
        }}
      >
        <div className={iconTextContainer}>
          <div className={iconContainer}>
            <FaPlus className={icon} />
          </div>
          <p>Create Story</p>
        </div>
      </div>

      {listOfImage.map(({ id, name, image }) => (
        <div
          key={id}
          className={storiesWrapper}
          style={{
            backgroundImage: image,
          }}
        >
          <p className={cname}>{name}</p>
        </div>
      ))}
    </div>
  );
};

export default Stories;
