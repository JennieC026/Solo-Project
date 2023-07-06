import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";

import { useDispatch } from "react-redux";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
 



  let  sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
 

  return (
    <ul id="Navigation">
      <li>
        <NavLink exact to="/">
          <img src='https://cdn.discordapp.com/attachments/811082976501825539/1126181657754480780/logo_copy.jpg' alt="Home" id="home-image"/>
        </NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;