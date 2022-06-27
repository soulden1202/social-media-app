import React, { useState } from "react";
import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchPostsbySearch } from "../../features/posts/postSlice";

import useStyles from "./styles";

const Home = () => {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  const [search, setsearch] = useState("");
  const [tags, settags] = useState([]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(fetchPostsbySearch({ search: search, tags: tags.join(",") }));
      settags([]);
      setsearch("");
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else if (!search && !tags) {
      history.push("/");
    }
  };

  const handleAdd = (tag) => settags([...tags, tag]);
  const handleDelete = (tagToDelete) =>
    settags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={8} md={8}>
            <Posts></Posts>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search memories"
                fullWidth
                onKeyDown={handleKeyPress}
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              ></TextField>
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search by tags"
                variant="outlined"
              ></ChipInput>
              <Button
                onClick={searchPost}
                className={classes.searchPost}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form></Form>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
