import React, { useState, useEffect } from "react";
// import "./App.css";
import BlogHome from "./BlogHome";
import About from "./About";
import useFetchData from "./useFetchData";
import { Routes, Route, Link } from "react-router-dom";
// For Blog use DuckDuckGo Theme colours. Or MUI dark mode.

function App() {
  // Article state now in useFetchData
  // state = {
  //   my_article_state: [],
  // };
  // instead of componentDidMount() {}
  const { data } = useFetchData("/api/getArticles");
  console.log("App.js: data: ", data);

  let arr_of_md_strings = [];
  data.forEach((article_obj, idx) => {
    arr_of_md_strings.push(article_obj.contentMarkdown);
  });
  console.log("App.js: arr_of_md_strings: ", arr_of_md_strings);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<BlogHome my_articles={arr_of_md_strings} />}
        />
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
