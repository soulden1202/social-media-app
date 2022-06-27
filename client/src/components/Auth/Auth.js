import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Avatar,
  Button,
  Grid,
  Paper,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyle from "./styles";
import Input from "./Input";
import Icon from "./icon";

import { useGoogleLogin } from "@react-oauth/google";

import { getTokenGoogle } from "../../features/user/authGoogleSlice";

import { signIn, signUp, resetErrorState } from "../../features/user/authSlice";

import { useDispatch, useSelector } from "react-redux";

const Auth = () => {
  const classes = useStyle();

  const dispatch = useDispatch();

  const history = useHistory();

  const [isSignUp, setisSignUp] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const authErrorResponse = useSelector((state) => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      formData: formData,
      history: history,
    };
    if (isSignUp) {
      dispatch(signUp(data));
    } else {
      dispatch(signIn(data));
    }
  };

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setshowPassword((state) => !state);
  };

  const switchMode = () => {
    setisSignUp((state) => !state);
    dispatch(resetErrorState(""));
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      dispatch(getTokenGoogle(tokenResponse));
      history.push("/");
    },
    onError: () => console.log("err"),
    flow: "auth-code",
  });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignUp ? " Sign up" : "Sign In"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  type="text"
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  type="text"
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              showPassword={showPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>

          <Button
            style={{ marginTop: "10px" }}
            className={classes.googleButton}
            color="primary"
            fullWidth
            startIcon={<Icon />}
            variant="contained"
            onClick={() => login()}
          >
            Google Sign In
          </Button>
          {authErrorResponse !== "" && (
            <Grid container justifyContent="center">
              <Grid item>
                <div style={{ color: "red" }}>{authErrorResponse}</div>
              </Grid>
            </Grid>
          )}

          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp ? (
                  <div>
                    <p>Already have an account?</p> <u>Sign in</u>
                  </div>
                ) : (
                  <div>
                    <p>Don't have an account?</p> <u>Sign up</u>
                  </div>
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
