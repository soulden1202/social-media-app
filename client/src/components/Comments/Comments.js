import React, { useState, useRef } from "react";
import { TextField, Typography, Avatar, Box } from "@material-ui/core";

import ShowMoreText from "react-show-more-text";
import { useDispatch, useSelector } from "react-redux";
import { commentPost } from "../../features/posts/modalSlice";

import useStyles from "./styles";

const Comments = ({ selectedPost }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const commentRef = useRef();

  const [comment, setcomment] = useState("");

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      const data = {
        id: selectedPost._id,
        value: { avatar: user.picture, name: user.name, comment: comment },
      };
      dispatch(commentPost(data));
      setcomment("");
      commentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {user && (
        <div>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Avatar
              alt={user.name}
              src={user?.picture}
              referrerPolicy="no-referrer"
              className={classes.purple}
              style={{ marginLeft: "5px" }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <TextField
              name="comments"
              variant="standard"
              label="Write your comments"
              fullWidth
              className={classes.textComment}
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
              onKeyDown={handleKeyPress}
            ></TextField>
          </Box>
        </div>
      )}

      <div className={classes.divComment}>
        <div ref={commentRef}></div>
        {selectedPost.comments.length ? (
          selectedPost.comments
            .slice(0)
            .reverse()
            .map((comment, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ margin: "10px 5px 5px 5px" }}>
                  <Avatar
                    alt={comment?.name}
                    src={comment?.avatar}
                    className={classes.purple}
                    referrerPolicy="no-referrer"
                  >
                    {comment.name?.charAt(0)}
                  </Avatar>
                </div>

                <Box
                  sx={{
                    borderRadius: "15px",
                    backgroundColor: "#d3d3d3",
                    margin: "5px 10px 10px 10px",
                  }}
                >
                  <div style={{ margin: "5px 30px 5px 15px" }}>
                    <Typography variant="h6">{comment.name}</Typography>
                    <Typography gutterBottom variant="subtitle1">
                      <ShowMoreText
                        lines={2}
                        more="Show more"
                        less="Show less"
                        expanded={false}
                        truncatedEndingComponent={"... "}
                      >
                        {comment.comment}
                      </ShowMoreText>
                    </Typography>
                  </div>
                </Box>
              </div>
            ))
        ) : (
          <Box
            sx={{
              borderRadius: "15px",
              backgroundColor: "#d3d3d3",
              margin: "5px 10px 10px 10px",
            }}
          >
            <div style={{ margin: "5px 30px 5px 15px" }}>
              <Typography variant="h6">
                There is no comment. Be the first!
              </Typography>
            </div>
          </Box>
        )}
      </div>
    </>
  );
};

export default Comments;
