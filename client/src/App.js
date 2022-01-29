import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Test from "./page/test";
import Alerts from "./components/layout/alert";
import Home from "./page/home";
import PrivateRoute from "./components/routing/PrivateRoute";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import listing from "./page/listing";
import edit_profile from "./page/edit_profile";
import profile from "./page/profile";
import ItemPage from "./page/itemPage";
import createReview from "./page/create_review";
import createPost from "./page/createPost";
import editPost from "./page/editPost";
import LoginPage from "./page/SignIn";
import SignUp from "./page/SignUp";
import SignIn from "./page/SignIn";
import { Container } from "@material-ui/core";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./action/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <div
        style={{
          marginTop: "100px",
          zIndex: 10,
          position: "fixed",
          width: "100%",
        }}
      >
        <Container style={{ width: "70%" }}>
          <Alerts />
        </Container>
      </div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/listing" component={listing} />
          <PrivateRoute exact path="/edit_profile" component={edit_profile} />
          <Route exact path="/profile/:id" component={profile} />
          <PrivateRoute exact path="/createPost" component={createPost} />
          <PrivateRoute exact path="/editPost/:id" component={editPost} />
          <Route exact path="/item/:id" component={ItemPage} />
          <PrivateRoute
            exact
            path="/create_review/:id"
            component={createReview}
          />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/login" component={SignIn} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
