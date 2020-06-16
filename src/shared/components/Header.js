import React, { useState, useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { NavLink, useHistory } from "react-router-dom";

import "./Header.css";
export default function Header() {
  const history = useHistory();
  const { isLoggedIn, userId, logout } = useContext(AuthContext);
  console.log("from header", isLoggedIn, userId);
  const [openSideDrawer, setOpenSideDrawer] = useState(false);

  const sideDrawerHandler = () => {
    setOpenSideDrawer(!openSideDrawer);
  };
  return (
    <nav className="header">
      <div className="left">
        <NavLink to="/" PicBucket>
          <div className="left-nav">
            <button className="main-logo">PicBucket</button>
          </div>
          <div className="left-nav">
            <button onClick={() => history.goBack()} className="main-logo">
              <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>
            </button>
          </div>
        </NavLink>
      </div>
      <div className="right">
        {!isLoggedIn && (
          <NavLink
            activeClassName="active-style"
            className="right-nav"
            to="/login"
          >
            <button className="no-border-btn">
              LogIn <i class="fa fa-user" aria-hidden="true"></i>
            </button>
          </NavLink>
        )}
        {!isLoggedIn && (
          <NavLink
            activeClassName="active-style"
            className="right-nav"
            to="/signup"
          >
            <button className="no-border-btn">
              SignUp <i class="fa fa-sign-in" aria-hidden="true"></i>
            </button>
          </NavLink>
        )}
        {isLoggedIn && (
          <NavLink
            activeClassName="active-style"
            className="right-nav"
            to="/places/new"
          >
            <button className="no-border-btn">Add Place</button>
          </NavLink>
        )}
        {isLoggedIn && (
          <a className="right-nav" href={`/${userId}/places`}>
            <button className="no-border-btn">My Places</button>
          </a>
        )}
        {isLoggedIn && (
          <NavLink className="right-nav" to="/" onClick={logout}>
            <button className="no-border-btn">LogOut</button>
          </NavLink>
        )}
      </div>

      <div className={!openSideDrawer ? "sidedrawer-display" : null}>
        <div className="sidedrawer">
          <NavLink to="/login" onClick={sideDrawerHandler}>
            LogIn
          </NavLink>
          <NavLink to="/signup" onClick={sideDrawerHandler}>
            SignUp
          </NavLink>
          <NavLink to="/places/new" onClick={sideDrawerHandler}>
            Add Place
          </NavLink>
        </div>
      </div>

      <button className="nav-menu-btn" onClick={sideDrawerHandler}>
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
