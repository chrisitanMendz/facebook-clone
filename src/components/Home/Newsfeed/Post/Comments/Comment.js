import React, { useState } from "react";

// Icons
import { FaTrashAlt } from "react-icons/fa";

// Styles
import {
  chatWrapper,
  nameMessage_buttonWrapper,
  buttonWrapper,
  nameMessageWrapper,
  iconWrapper,
  iconCon,
  icon,
} from "./Comments.module.scss";

// Data
import { getTimeAgoString } from "./data";

const Comment = (props) => {
  const { comment, uid, removeComment } = props;
  const [toShowDeleteButton, setToShowDeleteButton] = useState(false);

  return (
    <>
      <div
        className={`${chatWrapper}`}
        onMouseEnter={() => setToShowDeleteButton(true)}
        onMouseLeave={() => setToShowDeleteButton(false)}
      >
        <img src={comment.photoURL} alt="" />
        <div className={nameMessage_buttonWrapper}>
          <div className={nameMessageWrapper}>
            <h4>{comment.name}</h4>
            <pre>{comment.message}</pre>
          </div>
          <div className={buttonWrapper}>
            <button>Like</button> · <button>Reply</button> ·{" "}
            {getTimeAgoString(comment?.timestamp)}
          </div>
        </div>

        {comment.uid === uid && toShowDeleteButton && (
          <div className={iconWrapper}>
            <div
              className={iconCon}
              onClick={() =>
                removeComment(
                  comment.name,
                  comment.message,
                  comment.photoURL,
                  comment.uid,
                  comment.timestamp
                )
              }
            >
              <FaTrashAlt className={icon} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Comment;
