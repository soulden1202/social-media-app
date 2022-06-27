import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Avatar,
  Grid,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpAltIconOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { setpostID } from "../../../features/posts/idSlice";
import { deletingPost, likingPost } from "../../../features/posts/postSlice";
import useStyles from "./styles";

const Post = ({ post, handleOpen }) => {
  const dispatch = useDispatch();
  const currentpostID = useSelector((state) => state.id.currentID);
  const user = useSelector((state) => state.user.currentUser);
  const classes = useStyles();

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === user?.sub || user?._id) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      ) : (
        <>
          <ThumbUpAltIconOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltIconOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia
        className={classes.media}
        image={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
        onClick={() => handleOpen(post)}
      ></CardMedia>
      <div className={classes.overlay}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Avatar
              className={classes.purple}
              alt={post?.name}
              src={post?.avatar}
              referrerPolicy="no-referrer"
            >
              {post.name.charAt(0)}
            </Avatar>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">
              {moment(post.createAt).fromNow()}
            </Typography>
          </Grid>
        </Grid>
      </div>

      {(user?.sub === post?.creator || user?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => {
              if (!currentpostID) {
                dispatch(setpostID(post._id));
              } else {
                dispatch(setpostID(null));
              }
            }}
          >
            <MoreHorizIcon fontSize="medium"></MoreHorizIcon>
          </Button>
        </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography variant="h5" className={classes.title} gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" className={classes.message} gutterBottom>
          {post.message}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(likingPost(post?._id));
          }}
          disabled={!user}
        >
          <Likes></Likes>
        </Button>

        {(user?.sub === post?.creator || user?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deletingPost(post._id));
            }}
          >
            <DeleteIcon fontSize="small"></DeleteIcon>
            <p style={{ marginLeft: "15px" }}> Delete</p>
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
