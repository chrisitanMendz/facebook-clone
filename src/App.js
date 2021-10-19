import React from "react";

// Assets
import loadingLogo from "./assets/loading.gif";

// Router
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import Topnav from "./components/Topnav/Topnav";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

// Firebase
import { auth } from "./components/firebase";

// React Firebase Hooks
import { useAuthState } from "react-firebase-hooks/auth";
import Four0four from "./components/404/Four0four";

function App() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Router>
      {loading && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
            transition: "0s",
          }}
        >
          <img
            src={loadingLogo}
            alt=""
            style={{ width: "40px", height: "40px", transition: "0s" }}
          />
        </div>
      )}

      {user ? (
        <>
          <Route path="/" exact>
            <Home user={user} />
          </Route>
          <Route component={Four0four} />

          <Topnav user={user} />
        </>
      ) : !loading ? (
        <Login />
      ) : (
        ""
      )}

      {error && { error }}
    </Router>
  );
}

export default App;
