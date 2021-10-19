import React from "react";
import "./SkeletonPost.scss";

const SkeletonPost = () => {
  return (
    <div className="skeletonPostContainer">
      <div className="skeletonHeader">
        <div className="skeletonImage"></div>
        <div className="skeletonTextWrapper">
          <div className="skeletonText"></div>
          <div className="skeletonText" style={{ width: "120px" }}></div>
        </div>
      </div>

      <div className="skeletonButtonContainer">
        {[1, 2, 3].map((each) => (
          <div key={each} className="skeletonButtonWrapper">
            <div className="skeletonText"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonPost;
