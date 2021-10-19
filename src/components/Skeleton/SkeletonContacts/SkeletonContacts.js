import React from "react";
import "./SkeletonContacts.scss";

const SkeletonContacts = () => {
  return (
    <li className="skeletonUserContainer">
      <div className="skeletonImage"></div>
      <div className="skeletonTextWrapper">
        <div className="skeletonText"></div>
      </div>
    </li>
  );
};

export default SkeletonContacts;
