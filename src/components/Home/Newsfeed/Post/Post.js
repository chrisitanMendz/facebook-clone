import React, { useEffect, useState } from "react";

// Icons
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";
import { FaTrashAlt } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";

// Data
import { like } from "./data";

// Firebase
import firebase from "firebase/app";
import "firebase/firestore";
import db, { storage } from "../../../firebase";

// Styles
import {
  section,
  imgWrapper,
  nameTimeWrapper,
  dotsWrapper,
  threeDotsWrapper,
  deleteWrapper,
  trashIcon,
  caption,
  reactComentWrapper,
  reactWrapper,
  commentWrapper,
  likeCommentWrapper,
  wrapper,
  logo,
  liked,
  icon,
  sectionAlert,
  container,
  header,
  iconContainer,
  body,
  p,
  buttonContainer,
  cancel,
  confirm,
} from "./Post.module.scss";

// Alert
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

// Components
import Comments from "./Comments/Comments";
import Reactors from "./Reactors/Reactors";

// Main
const Post = (props) => {
  const {
    message,
    comments,
    datePosted,
    image,
    name,
    profilePic,
    reactors,
    docId,
    userID,
    user,
  } = props;

  const { uid, displayName, photoURL } = user;

  // State
  const [toShowComment, setToShowComment] = useState(false);
  const [toShowDelete, setToShowDelete] = useState(false);
  const [toShowReactors, setToShowReactors] = useState(false);

  useEffect(() => {
    if (toShowReactors) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [toShowReactors]);

  // likes
  const likesCount = reactors.length;
  const isExist = reactors.filter((reactor) => reactor.reactorID === uid);
  const dateCreated = datePosted?.toDate().toGMTString();

  // Events Handler
  const toDeletePost = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className={sectionAlert}>
            <div className={container}>
              <div className={header}>
                <h4>Delete Post</h4>
                <div className={iconContainer} onClick={() => onClose()}>
                  <RiCloseFill className={icon} />
                </div>
              </div>
              <div className={body}>
                <p className={p}>Are you sure you want to delete this post?</p>
                <div className={buttonContainer}>
                  <button className={cancel} onClick={() => onClose()}>
                    Cancel
                  </button>
                  <button className={confirm} onClick={() => toDelete(onClose)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      },
    });

    const toDelete = (onClose) => {
      if (image) {
        db.collection("Posts").doc(docId).delete();
        storage.ref("posts").child(docId).delete();
      } else {
        db.collection("Posts").doc(docId).delete();
      }

      onClose();
    };
  };

  const toUpdateLike = () => {
    const docRef = db.collection("Posts").doc(docId);

    if (isExist.length > 0) {
      docRef.set(
        {
          reactors: firebase.firestore.FieldValue.arrayRemove({
            name: displayName,
            reactorID: uid,
            photoURL,
          }),
        },
        { merge: true }
      );
    } else {
      docRef.set(
        {
          reactors: firebase.firestore.FieldValue.arrayUnion({
            name: displayName,
            reactorID: uid,
            photoURL,
          }),
        },
        { merge: true }
      );
    }
  };

  return (
    <div className={section}>
      {/* header */}
      <header>
        <div className={imgWrapper}>
          <img src={profilePic} alt="" />
        </div>
        <div className={nameTimeWrapper}>
          <h1>{name}</h1>
          <p>{dateCreated?.substring(0, dateCreated.length - 7)}</p>
        </div>
        {userID === uid && (
          <div className={dotsWrapper}>
            <div
              className={threeDotsWrapper}
              onClick={() => setToShowDelete((prev) => !prev)}
            >
              <BiDotsHorizontalRounded className={icon} />
            </div>
            {toShowDelete && (
              <div className={deleteWrapper} onClick={toDeletePost}>
                <FaTrashAlt className={trashIcon} />
                Delete this post
              </div>
            )}
          </div>
        )}
      </header>

      {/* Caption */}
      {message && (
        <div className={caption}>
          <pre>{message}</pre>
        </div>
      )}

      {/* Image */}
      {image && (
        <div className={imgWrapper}>
          <img src={image} alt="" />
        </div>
      )}

      {/* Likes and Comments */}
      {(likesCount > 0 || comments.length > 0) && (
        <div className={reactComentWrapper}>
          {likesCount > 0 && (
            <div
              className={reactWrapper}
              onClick={() => setToShowReactors(true)}
            >
              <img src={like} alt="" />
              <p>{likesCount}</p>
            </div>
          )}
          {comments.length > 0 && (
            <div className={commentWrapper}>
              <p onClick={() => setToShowComment((prev) => !prev)}>
                {comments.length} {comments.length > 1 ? "Comments" : "Comment"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Like and Comment button */}
      <div className={likeCommentWrapper}>
        <div className={wrapper}>
          {/* Like button */}
          <div onClick={toUpdateLike}>
            {isExist.length > 0 ? (
              <AiTwotoneLike className={liked} />
            ) : (
              <AiOutlineLike className={logo} />
            )}

            <p>Like</p>
          </div>

          {/* Comment button */}
          <div onClick={() => setToShowComment((prev) => !prev)}>
            <VscComment className={logo} />
            <p>Comment</p>
          </div>
        </div>
      </div>

      {/* Comments */}
      {toShowComment && (
        <Comments
          docId={docId}
          toShowComment={toShowComment}
          comments={comments}
          uid={uid}
          displayName={displayName}
          photoURL={photoURL}
        />
      )}

      {/* Reactors */}
      {toShowReactors && (
        <Reactors reactors={reactors} setToShowReactors={setToShowReactors} />
      )}
    </div>
  );
};

export default Post;
