import React from "react";

// Assets
import likeIcons from "../../../../../assets/like.png";

// Icons
import { RiCloseFill } from "react-icons/ri";

// Styles
import {
  section,
  container,
  header,
  iconContainer,
  icon,
  reactorsContainer,
  reactorWrapper,
  imgContainer,
  profile,
  likeIcon,
} from "./Reactors.module.scss";

const Reactors = ({ reactors, setToShowReactors }) => {
  return (
    <div className={section}>
      <div className={container}>
        <div className={header}>
          <h4>Like{reactors.length > 1 && "s"}</h4>
          <div
            className={iconContainer}
            onClick={() => setToShowReactors(false)}
          >
            <RiCloseFill className={icon} />
          </div>
        </div>
        <div className={reactorsContainer}>
          {reactors.map((reactor) => (
            <div key={reactor.reactorID} className={reactorWrapper}>
              <div className={imgContainer}>
                <img src={reactor.photoURL} alt="" className={profile} />
                <img
                  src={likeIcons}
                  alt=""
                  style={{ height: "16px", width: "16px" }}
                  className={likeIcon}
                />
              </div>
              <h3>{reactor.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reactors;
