import React from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useState, useEffect } from "react";
import FileBase from "react-file-base64";

import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { creatingPost, updatingPost } from "../../features/posts/postSlice";
import { setpostID } from "../../features/posts/idSlice";

const Form = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);

  const currentpostID = useSelector((state) => state.id.currentID);
  const post = useSelector((state) =>
    currentpostID
      ? state.posts.posts.find((p) => p._id === currentpostID)
      : null
  );

  useEffect(() => {
    if (post) {
      setpostData(post);
    } else {
      setpostData({
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
      });
    }
  }, [post]);

  const [postData, setpostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentpostID) {
      const data = {
        id: currentpostID,
        data: [{ ...postData, name: user?.name, avatar: user?.picture }],
      };
      dispatch(updatingPost(data));
    } else {
      dispatch(
        creatingPost({ ...postData, name: user?.name, avatar: user?.picture })
      );
    }

    clear();
  };
  const clear = () => {
    dispatch(setpostID(null));
    setpostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please login to create post or like other posts!
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <Typography variant="h6">
          {currentpostID ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setpostData({ ...postData, title: e.target.value })}
        ></TextField>
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setpostData({ ...postData, message: e.target.value })
          }
        ></TextField>
        <TextField
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setpostData({ ...postData, tags: e.target.value.split(/,| /) })
          }
        ></TextField>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setpostData({ ...postData, selectedFile: base64 })
            }
          />
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default Form;
