import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Login from "./shared/authComponents/Login";
import Signup from "./shared/authComponents/Signup";
import Users from "./users/pages/User";
import Layout from "./shared/components/Layout";
import Userplaces from "./places/pages/UserPlaces";
import NewPlace from "./places/pages/NewPlace";

import { useAuth } from "./shared/hooks/auth-hook";
import { AuthContext } from "./shared/context/auth-context";

import "./App.css";

function App() {
  const { token, login, logout, userId } = useAuth();
  let routes;
  if (!token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/:userId/places" exact>
          <Userplaces />
        </Route>
        <Redirect to="/signup" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <Userplaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
      </Switch>
    );
  }

  return (
  <AuthContext.Provider
    value={{
      isLoggedIn: !!token,
      token,
      userId,
      login,
      logout,
    }}
  >
    <Layout>{routes}</Layout>
  </AuthContext.Provider>);
}

export default App;
