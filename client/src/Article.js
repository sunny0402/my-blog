// import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Article(props) {
  // const [articleState, setArticlestate] = useState("");
  const { the_article } = props;
  console.log(the_article);
  return (
    <div>
      {/* <li>
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
          </div> */}
      {/* article content formatted in markdown file and then sanitized html is rendered. */}
      {the_article.contentSanitizedHTML && (
        <div
          className="article-content"
          dangerouslySetInnerHTML={{
            __html: the_article.contentSanitizedHTML,
          }}
        ></div>
      )}
      {/* {the_article.author && (
            <div className="article-author">
              <h4>{the_article.author}</h4>
            </div>
          )}
        </div>
      </li> */}
    </div>
  );
}

Article.propTypes = {
  the_article: PropTypes.object.isRequired,
};
export default Article;
