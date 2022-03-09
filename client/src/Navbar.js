import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>
          Home
        </Link>
        <Link to="/about" style={{ padding: 5 }}>
          About
        </Link>
      </nav>
    );
  }
}

export default Navbar;
