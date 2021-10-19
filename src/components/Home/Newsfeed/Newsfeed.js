import React, { useEffect, useState } from "react";

// Styles
import { section, newsFeedContainer } from "./Newsfeed.module.scss";

// React Firebase Hooks
import { useCollection } from "react-firebase-hooks/firestore";

// Firebase
import db from "../../firebase";

// Components
import Stories from "./Stories/Stories";
import CreatePost from "./CreatePost/CreatePost";
import CreateRoom from "./CreateRoom/CreateRoom";
import Post from "./Post/Post";
import CreatePostPopup from "./CreatePostPopup/CreatePostPopup";
import SkeletonPost from "../../Skeleton/SkeletonPost/SkeletonPost";

const Newsfeed = ({ user }) => {
  const [posts, loading] = useCollection(
    db.collection("Posts").orderBy("datePosted", "desc")
  );

  const [popupCreatePost, setPopupCreatePost] = useState(false);

  useEffect(() => {
    if (popupCreatePost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [popupCreatePost]);

  return (
    <div className={section}>
      <div className={newsFeedContainer}>
        <Stories user={user} />
        <CreatePost user={user} setPopupCreatePost={setPopupCreatePost} />
        <CreateRoom user={user} />

        {posts?.docs.map((doc) => (
          <React.Fragment key={doc.id}>
            {doc.data().image !== "waiting" && (
              <Post
                docId={doc.id}
                user={user}
                message={doc.data().caption}
                comments={doc.data().comments}
                datePosted={doc.data().datePosted}
                image={doc.data().image}
                name={doc.data().name}
                profilePic={doc.data().profilePic}
                reactors={doc.data().reactors}
                userID={doc.data().userID}
              />
            )}
          </React.Fragment>
        ))}

        {(loading || posts.empty) && (
          <>
            <SkeletonPost />
            <SkeletonPost />
          </>
        )}

        {popupCreatePost && (
          <CreatePostPopup
            user={user}
            setPopupCreatePost={setPopupCreatePost}
          />
        )}
      </div>
    </div>
  );
};

export default Newsfeed;
