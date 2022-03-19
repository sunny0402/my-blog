import React, { useState, useEffect } from "react";
// import "./App.css";
import BlogHome from "./BlogHome";
import About from "./About";
import useFetchData from "./useFetchData";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  // Article state now in useFetchData
  // state = {
  //   my_article_state: [],
  // };
  // instead of componentDidMount() {}
  const { data } = useFetchData("/api/getArticles");

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<BlogHome my_articles={data} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
