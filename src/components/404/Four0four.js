import React from "react";

// assets
import chain from "../../assets/chain.svg";

import { Link } from "react-router-dom";

//Styles
import {
  section,
  container,
  img,
  h1,
  p,
  button,
} from "./Four0four.module.scss";

const Four0four = () => {
  return (
    <div className={section}>
      <div className={container}>
        <img src={chain} alt="" className={img} />
        <h1 className={h1}>This Page Isn't Available</h1>
        <p className={p}>
          The link may be broken, or the page may have been removed. Check to
          see if the link you're trying to open is correct
        </p>
        <Link to="/" className={button}>
          Go to News Feed
        </Link>
      </div>
    </div>
  );
};

export default Four0four;
