import React, { Component } from "react";
import PropTypes from "prop-types";

class Article extends Component {
  state = {
    // https://overreacted.io/writing-resilient-components/#principle-1-dont-stop-the-data-flow
    // the_shelf: this.props.the_book.shelf, !!! Do not copy props to state !!!
    the_article_state: "",
  };
  // title publishDate content author
  render() {
    const { the_article } = this.props;
    return (
      <div>
        <li>
          <div className="article">
            <div className="article-top">
              {the_article.title && (
                <div className="article-title">
                  <h2>{the_article.title}</h2>
                </div>
              )}
              {the_article.publishDate && (
                <div className="article-publishDate">
                  <h4>{the_article.publishDate}</h4>
                </div>
              )}
            </div>
            {the_article.content && (
              <div className="article-content">
                <p>{the_article.content}</p>
              </div>
            )}
            {the_article.author && (
              <div className="article-author">
                <h4>{the_article.author}</h4>
              </div>
            )}
          </div>
        </li>
      </div>
    );
  }
}

Article.propTypes = {
  the_article: PropTypes.object.isRequired,
};
export default Article;
