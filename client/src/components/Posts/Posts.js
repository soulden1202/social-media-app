import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, selectAllPosts } from "../../features/posts/postSlice";
import { getPostById } from "../../features/posts/modalSlice";
import { useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";

import Post from "./Post/Post";

import useStyles from "./styles";
import ModalComponent from "../Modal/ModalComponent";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const classes = useStyles();
  let content;

  const [open, setopen] = useState(false);

  const handleOpen = (post) => {
    dispatch(getPostById(post._id));
    setopen(true);
  };

  const handleClose = () => {
    setopen(false);
  };

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  if (postStatus === "loading") {
    content = <CircularProgress />;
  } else if (postStatus === "succeeded") {
    content = (
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6}>
            <Post post={post} handleOpen={handleOpen} />
          </Grid>
        ))}

        <ModalComponent open={open} handleClose={handleClose}></ModalComponent>
      </Grid>
    );
  } else if (postStatus === "failed") {
    content = <div>{error}</div>;
  } else if (posts.length === 0) {
    content = <div>No post found</div>;
  }

  return <>{content}</>;
};

export default Posts;
