import React, { Component } from "react";
import Navbar from "./Navbar";

class About extends Component {
  state = {};
  render() {
    return (
      <div>
        <h2>About Page</h2>
        <Navbar />
        <p>
          I am web developer based in Toronto, Canada. Programming is awesome.
          My current focus is web apps and JavaScript. I hope this blog helps
          you in one of your projects.
        </p>
      </div>
    );
  }
}

export default About;
