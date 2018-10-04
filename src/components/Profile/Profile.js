import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./Profile.css";

export default class Profile extends React.Component {
  render() {
    return (
      <div>
        <h1 id="profile-header">My Memes</h1>
        <img src="./assets/Javascript-meme.png" />
        <img src="./assets/car-meme.png" />
        <img src="./assets/Office-Meme.png" />
        <img src="./assets/Kanye_meme.png" />
      </div>
    );
  }
}
