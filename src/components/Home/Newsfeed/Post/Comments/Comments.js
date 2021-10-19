import React, { useState } from "react";

// Styles
import {
  commentSection,
  allMessage,
  inputComment,
  imageContainer,
  textAreaWrapper,
  section,
  container,
  header,
  iconContainer,
  icon,
  body,
  p,
  buttonContainer,
  cancel,
  confirm,
} from "./Comments.module.scss";

// ICons
import { RiCloseFill } from "react-icons/ri";

// Firebase
import firebase from "firebase/app";
import "firebase/firestore";
import db from "../../../../firebase";

// Compornents
import Comment from "./Comment";

// Alert
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Comments = (props) => {
  const { toShowComment, comments, uid, displayName, photoURL, docId } = props;

  // State
  const [yourComment, setYourComment] = useState("");

  const addComment = (e) => {
    e.preventDefault();

    if (yourComment.trim().length > 0) {
      const docRef = db.collection("Posts").doc(docId);
      docRef.set(
        {
          comments: firebase.firestore.FieldValue.arrayUnion({
            name: displayName,
            message: yourComment.trim(),
            photoURL,
            uid,
            timestamp: Date.now(),
          }),
        },
        { merge: true }
      );
    }

    setYourComment("");
  };

  const removeComment = (pangalan, mensahe, letrato, id, time) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className={section}>
            <div className={container}>
              <div className={header}>
                <h4>Delete Comment</h4>
                <div className={iconContainer} onClick={() => onClose()}>
                  <RiCloseFill className={icon} />
                </div>
              </div>
              <div className={body}>
                <p className={p}>
                  Are you sure you want to delete this comment?
                </p>
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
      const docRef = db.collection("Posts").doc(docId);
      docRef
        .set(
          {
            comments: firebase.firestore.FieldValue.arrayRemove({
              name: pangalan,
              message: mensahe,
              photoURL: letrato,
              uid: id,
              timestamp: time,
            }),
          },
          { merge: true }
        )
        .then((e) => {
          setYourComment("");
          onClose();
        });
    };
  };

  return (
    <>
      {toShowComment && (
        <div className={commentSection}>
          {comments.length > 0 && (
            <div className={allMessage}>
              {comments.map((comment, index) => (
                <Comment
                  key={index}
                  comment={comment}
                  index={index}
                  uid={uid}
                  removeComment={removeComment}
                />
              ))}
            </div>
          )}

          <form className={inputComment} onSubmit={addComment}>
            <div className={imageContainer}>
              <img src={photoURL} alt="" />
            </div>
            <div className={textAreaWrapper}>
              <input
                value={yourComment}
                onChange={(e) => setYourComment(e.target.value)}
                placeholder="Write a comment..."
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Comments;
