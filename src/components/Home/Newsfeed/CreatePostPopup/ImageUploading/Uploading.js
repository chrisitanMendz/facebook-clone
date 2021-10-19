import React from "react";

// Styles
import {
  section,
  textWrapper,
  wrapper,
  iconWrapper,
  icon,
  alertWrapper,
  alertClass,
} from "./Uploading.module.scss";

const Uploading = ({ message, alert }) => {
  return (
    <div className={section}>
      <div className={textWrapper}>
        <div className={wrapper}>
          <h1>{message}</h1>
          <div className={iconWrapper}>
            <div className={icon}></div>
            <div className={icon}></div>
            <div className={icon}></div>
          </div>
        </div>

        {alert && (
          <div className={alertWrapper}>
            <p className={alertClass}>{alert}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploading;
