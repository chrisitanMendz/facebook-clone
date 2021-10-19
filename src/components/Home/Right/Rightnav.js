import React from "react";

// icons
import { RiVideoAddFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

// Styles
import {
  rightNavContainer,
  mainWrapper,
  iconWrapper,
  userInfo,
  iconCon,
  icon,
  title,
} from "./Right.module.scss";

// Firebase
import { useCollection } from "react-firebase-hooks/firestore";
import db from "../../firebase";

// Components
import SkeletonContacts from "../../Skeleton/SkeletonContacts/SkeletonContacts";

const Rightnav = ({ user }) => {
  const { uid } = user;
  const [users, loading] = useCollection(db.collection("users"));

  return (
    <div className={rightNavContainer}>
      <div className={mainWrapper}>
        <div className={title}>
          <h3>Contacts</h3>
          <div className={iconWrapper}>
            <div className={iconCon}>
              <RiVideoAddFill className={icon} />
            </div>
            <div className={iconCon}>
              <FaSearch className={icon} />
            </div>
            <div className={iconCon}>
              <HiOutlineDotsHorizontal className={icon} />
            </div>
          </div>
        </div>

        {users && (
          <ul className={userInfo}>
            {users.docs.map(
              (doc) =>
                uid !== doc.id && (
                  <li key={doc.id}>
                    <img src={doc.data().photoURL} alt="" />
                    <h1>{doc.data().name}</h1>
                  </li>
                )
            )}
          </ul>
        )}

        {(loading || users.empty) && (
          <ul>
            <SkeletonContacts />
            <SkeletonContacts />
            <SkeletonContacts />
            <SkeletonContacts />
            <SkeletonContacts />
            <SkeletonContacts />
          </ul>
        )}
      </div>
    </div>
  );
};

export default Rightnav;
