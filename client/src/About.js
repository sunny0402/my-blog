import React, { Component } from "react";
import PropTypes from "prop-types";

class About extends Component {
  state = {};
  render() {
    return (
      <div>
        <h2>About Page</h2>
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
