import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <NavBar></NavBar>
        <Switch>
          <Route
            path="/"
            exact
            component={() => <Redirect to="/posts" />}
          ></Route>
          <Route path="/posts" exact component={Home}></Route>
          <Route path="/posts/search" exact component={Home}></Route>

          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
          ></Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
