import React from "react";

// Styles
import { leftNav, icon } from "./Leftnav.module.scss";

// Data
import { lists } from "./data";

const Leftnav = ({ user }) => {
  const { displayName, photoURL } = user;

  return (
    <div>
      <ul className={leftNav}>
        <li>
          <img
            src={photoURL}
            alt=""
            style={{ height: "35px", width: "35px" }}
            className={icon}
          />
          {displayName}
        </li>

        {lists.map(({ name, src }, index) => (
          <li key={index}>
            <img
              src={src}
              alt=""
              style={{ height: "35px", width: "35px" }}
              className={icon}
            />
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leftnav;
