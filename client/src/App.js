import React, { Component } from "react";
import "./App.css";
import BlogHome from "./BlogHome";

import { Routes, Route } from "react-router-dom";

class App extends Component {
  state = {
    my_article_state: [],
  };

  componentDidMount() {
    this.getArticles();
  }

  getArticles = async () => {
    try {
      const response = await fetch("/api/getArticles", {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const serverResponse = await response.json();

      console.log("serverDataRequest: serverResponse", serverResponse);

      this.setState(() => ({ my_article_state: serverResponse }));
    } catch (error) {
      console.log("error", error);
    }
  };

  render() {
    const { my_article_state } = this.state;

    return (
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<BlogHome my_articles={my_article_state} />}
          />
        </Routes>
      </div>
    );
  }
}

export default App;
