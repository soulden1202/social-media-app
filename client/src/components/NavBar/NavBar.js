import React, { useEffect } from "react";

import { useLocation, useHistory } from "react-router-dom";

import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyle from "./style";
import memoryLogo from "../../images/memories-Logo.png";
import memoryText from "../../images/memories-Text.png";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../features/user/authGoogleSlice";
import { setUser } from "../../features/user/userSlice";
import { fetchPosts } from "../../features/posts/postSlice";

const NavBar = () => {
  const classes = useStyle();

  const user = useSelector((state) => state.user.currentUser);

  const statusGg = useSelector((state) => state.authGG.status);
  const status = useSelector((state) => state.auth.status);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const googleProfile = JSON.parse(localStorage.getItem("profileGoogle"));
  const profile = JSON.parse(localStorage.getItem("profile"));

  const logout = () => {
    dispatch(logOut());
    dispatch(setUser(null));
    history.push("/");
  };

  useEffect(() => {
    const token = googleProfile || null;
    if (token !== null) {
      const decoded = jwt_decode(token);
      dispatch(setUser(decoded));
      if (decoded.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  }, [statusGg, location, dispatch]);

  useEffect(() => {
    let res = null;
    let token = null;
    if (profile) {
      res = profile.result;
      token = profile.token;
    }
    if (res !== null) {
      dispatch(setUser(res));
      const decoded = jwt_decode(token);
      if (decoded.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  }, [status, location, dispatch]);

  return (
    <AppBar className={classes.appBar} color="inherit">
      <Link
        to="/"
        className={classes.brandContainer}
        onClick={() => {
          dispatch(fetchPosts());
        }}
      >
        <img
          className={classes.image}
          src={memoryText}
          alt="text-icon"
          height="40px"
        ></img>
        <img
          className={classes.image}
          src={memoryLogo}
          alt="logo"
          height="40px"
        ></img>
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              alt={user?.name}
              src={user?.picture}
              referrerPolicy="no-referrer"
              className={classes.purple}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Log Out
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
