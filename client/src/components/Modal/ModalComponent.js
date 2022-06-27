import React, { useState } from "react";

import useStyles from "./styles";
import moment from "moment";

import {
  Backdrop,
  Modal,
  Typography,
  Paper,
  Card,
  Grid,
  Avatar,
  CardContent,
  CardMedia,
  CircularProgress,
  Button,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ThumbUpAltIconOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ModeComment from "@material-ui/icons/ModeCommentOutlined";

import { useDispatch, useSelector } from "react-redux";
import { likingPostModal } from "../../features/posts/modalSlice";
import { likingPost } from "../../features/posts/postSlice";
import { addLike, removeLike } from "../../features/posts/modalSlice";

import Comments from "../Comments/Comments";

const ModalComponent = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const postStatus = useSelector((state) => state.modal.status);
  const selectedPost = useSelector((state) => state.modal.posts);
  const error = useSelector((state) => state.modal.error);

  const [isComment, setisComment] = useState(false);

  let userId = user?.sub || user?._id;
  let hadLiked = selectedPost.likes?.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likingPostModal(selectedPost?._id));
    dispatch(likingPost(selectedPost?._id));

    if (hadLiked) {
      dispatch(removeLike(userId));
    } else {
      dispatch(addLike(userId));
    }
  };

  let Likes = () => {
    if (selectedPost.likes?.length > 0) {
      return selectedPost.likes.find(
        (like) => like === user?.sub || user?._id
      ) ? (
        <>
          <ThumbUpAltIcon style={{ top: "45px" }} fontSize="small" />
          &nbsp;{selectedPost.likes.length}{" "}
          {selectedPost.likes.length === 1 ? "Like" : "Likes"}
        </>
      ) : (
        <>
          <ThumbUpAltIconOutlined style={{ top: "45px" }} fontSize="small" />
          &nbsp;{selectedPost.likes.length}{" "}
          {selectedPost.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltIconOutlined style={{ top: "45px" }} fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      {postStatus === "loading" ? (
        <Paper className={classes.paperloading}>
          <div className={classes.divLoading}>
            <CircularProgress style={{ marginTop: "30px" }} />
          </div>
        </Paper>
      ) : postStatus === "failed" ? (
        <Paper className={classes.paper}>
          <div>{error}</div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Card>
            <div onClick={handleClose} className={classes.closeIcon}>
              <ArrowBackIosIcon></ArrowBackIosIcon>
              <ArrowBackIosIcon></ArrowBackIosIcon>
            </div>

            <div className={classes.container}>
              <div>
                <Avatar
                  className={classes.purple}
                  alt={selectedPost.name}
                  src={selectedPost.avatar}
                  referrerPolicy="no-referrer"
                >
                  {selectedPost.name?.charAt(0)}
                </Avatar>
              </div>
              <div style={{ marginLeft: "10px" }}>
                <Typography variant="h6">{selectedPost?.name}</Typography>
                <Typography variant="body2">
                  {moment(selectedPost?.createAt).fromNow()}
                </Typography>
              </div>
            </div>
            <Typography variant="h5" className={classes.title} gutterBottom>
              {selectedPost?.title}
            </Typography>
            <CardContent>
              <Typography variant="body2" className={classes.message}>
                {selectedPost?.message}
              </Typography>
            </CardContent>

            <CardMedia
              className={classes.media}
              image={
                selectedPost?.selectedFile ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              title={selectedPost?.title}
            ></CardMedia>
            <div
              style={{
                marginTop: "15px",

                marginBottom: "15px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    className={classes.buttons}
                    onClick={handleLike}
                    disabled={!user}
                    color="primary"
                  >
                    <Likes />
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    className={classes.buttons}
                    onClick={() => {
                      setisComment((state) => !state);
                    }}
                    disabled={!user}
                    color="primary"
                  >
                    <ModeComment />
                    &nbsp;Comment
                  </Button>
                </Grid>
              </Grid>
            </div>

            {isComment && <Comments selectedPost={selectedPost} />}
          </Card>
        </Paper>
      )}
    </Modal>
  );
};

export default ModalComponent;
