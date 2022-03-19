import React, { Component } from "react";
import PropTypes from "prop-types";
import Article from "./Article";
import Header from "./Header";

const sections = [
  { title: "JavaScript", url: "#" },
  { title: "Python", url: "#" },
  { title: "Other", url: "#" },
];

function BlogHome(props) {
  const { my_articles } = props;

  return (
    <div className="articles-bookshelf">
      {/* <Navbar /> */}
      <Header title="Blog" sections={sections} />
      <ol className="articles-grid">
        {my_articles.map((an_article, an_article_idx) => {
          return <Article key={an_article_idx} the_article={an_article} />;
        })}
      </ol>
    </div>
  );
}

BlogHome.propTypes = {
  my_articles: PropTypes.array.isRequired,
};

export default BlogHome;
