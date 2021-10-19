import React from "react";

// Components
import Leftnav from "./Leftnav/Leftnav";

// Styles
import { homeContainer } from "./Home.module.scss";
import Newsfeed from "./Newsfeed/Newsfeed";
import Rightnav from "./Right/Rightnav";

const Home = ({ user }) => {
  return (
    <div className={homeContainer}>
      <Leftnav user={user} />
      <Newsfeed user={user} />
      <Rightnav user={user} />
    </div>
  );
};

export default Home;
