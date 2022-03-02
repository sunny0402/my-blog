import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Article from "./Article";

class BlogHome extends Component {
  render() {
    const { my_articles } = this.props;

    return (
      <div className="articles-bookshelf">
        <ol className="articles-grid">
          {my_articles.map((an_article, an_article_idx) => {
            return <Article key={an_article_idx} the_article={an_article} />;
          })}
        </ol>
      </div>
    );
  }
}

BlogHome.propTypes = {
  my_articles: PropTypes.array.isRequired,
};

export default BlogHome;
