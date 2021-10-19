import React, { useState, useRef } from "react";

// Data
import { iconList } from "./data";

// Icons
import { RiCloseFill } from "react-icons/ri";

// CSS
import {
  section,
  container,
  iconContainer,
  icon,
  wrapper,
  wrapper2,
  captionTextField,
  userInfo,
  imageContainer,
  nameContainer,
  imageWrapper,
  disable,
  iconWrapper,
  iconLalagyan,
  alertClass,
} from "./CreatePostPopup.module.scss";

// Firebase
import firebase from "firebase/app";
import "firebase/firestore";
import db, { storage } from "../../../firebase";

// Components
import Uploading from "./ImageUploading/Uploading";

const CreatePostPopup = ({ user, setPopupCreatePost }) => {
  const [caption, setCaption] = useState("");
  const [imgURL, setImgURL] = useState(null);
  const [alert, setAlert] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const file = useRef(null);

  const { displayName, photoURL, uid } = user;
  const name = displayName.split(" ");
  const firstName = name[0];

  const toCreateNewPost = (e) => {
    e.preventDefault();

    setAlert("");

    if (caption.trim().length > 0 || imgURL) {
      // Loading
      setMessageLoading(true);

      document.activeElement.blur();

      db.collection("Posts")
        .add({
          caption: caption.trim(),
          name: displayName,
          comments: [],
          datePosted: firebase.firestore.FieldValue.serverTimestamp(),
          profilePic: photoURL,
          reactors: [],
          image: imgURL ? "waiting" : "",
          userID: uid,
        })
        .then((doc) => {
          setMessageLoading(false);

          if (imgURL) {
            setImageLoading(true);

            const uploadImage = storage
              .ref(`posts/${doc.id}`)
              .putString(imgURL, "data_url");

            uploadImage.on(
              "state_change",
              null,
              (error) => console.log(error),
              () => {
                storage
                  .ref(`posts/${doc.id}`)
                  .getDownloadURL()
                  .then((imageRes) => {
                    db.collection("Posts").doc(doc.id).set(
                      {
                        image: imageRes,
                      },
                      { merge: true }
                    );

                    removeImage();
                    setImageLoading(false);
                    setCaption("");
                    setImgURL(null);
                    document.querySelector(".contentEditable").innerText = "";
                    setPopupCreatePost(false);
                  });
              }
            );
          } else {
            setCaption("");
            setImgURL(null);
            document.querySelector(".contentEditable").innerText = "";
            setPopupCreatePost(false);
          }
        });
    }
  };

  const fileChosen = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      if (e.target.files[0].type.match("image.*")) {
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (event) => {
          if (event.total >= 15000000) {
            setAlert("The image is big! Maximum image file size is 15mb");
          } else {
            setImgURL(event.target.result);
            setAlert("");
          }
        };
      } else {
        setAlert("Please upload image or gif only!");
      }
    }
  };

  const removeImage = () => {
    setImgURL(null);
    file.current.value = "";
  };

  const buttonAllowed = () => {
    if (caption.trim().length > 0 || imgURL) {
      return false;
    } else {
      return true;
    }
  };

  const buttonClassname = () => {
    if (caption.trim().length < 1 && !imgURL) {
      return disable;
    }
  };

  return (
    <section className={section}>
      <div className={container}>
        <h1>
          Create Post
          <div className={iconContainer}>
            <RiCloseFill
              className={icon}
              onClick={() => setPopupCreatePost(false)}
            />
          </div>
        </h1>

        <form>
          <div className={userInfo}>
            <div className={imageContainer}>
              <img src={photoURL} alt="" />
            </div>
            <div className={nameContainer}>
              <h3>{displayName}</h3>
              <p>
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/n8s2iDL-sOI.png?_nc_eui2=AeFvSOgsMv4JEOvySfIfG6crb4n_LklBTsFvif8uSUFOweyxgmDYPuMVQZX_JACMqn9-jR6F8hr_B0SfldLx7Ijd"
                  alt=""
                />
                Public
              </p>
            </div>
          </div>

          <div className={wrapper}>
            {!caption && <p>{`What's on your mind, ${firstName}?`}</p>}
            <div
              className={`${captionTextField} contentEditable`}
              contentEditable="true"
              value={caption}
              onInput={(e) => setCaption(e.target.innerText)}
            />

            {imgURL && (
              <div className={imageWrapper}>
                <div className={iconLalagyan} onClick={removeImage}>
                  <RiCloseFill className={icon} />
                </div>
                <img src={imgURL} alt="" />
              </div>
            )}
          </div>

          <div className={wrapper}>
            <div className={wrapper2}>
              <h3 onClick={() => file.current.click()}>
                Add Image to Your Post
              </h3>
              <div className={iconWrapper}>
                {iconList.map((list, index) => (
                  <div key={index} onClick={() => file.current.click()}>
                    <i
                      style={{
                        height: "24px",
                        width: "24px",
                        backgroundImage: `url("${list.link}")`,
                        backgroundPosition: `${list.position}`,
                        backgroundSize: `${list.size}`,
                      }}
                    ></i>
                  </div>
                ))}
              </div>
              <input
                type="file"
                hidden
                ref={file}
                accept="image/*"
                onChange={fileChosen}
              />
            </div>
          </div>

          <div className={wrapper}>
            <button
              className={buttonClassname()}
              disabled={buttonAllowed()}
              onClick={toCreateNewPost}
            >
              Post
            </button>
          </div>

          <p className={alertClass}>{alert}</p>
        </form>

        {messageLoading && <Uploading message="Uploading" />}

        {imageLoading && (
          <Uploading
            message="Image is still uploading"
            alert="Do not close this tab or else your post won't be uploaded!"
          />
        )}
      </div>
    </section>
  );
};

export default CreatePostPopup;
