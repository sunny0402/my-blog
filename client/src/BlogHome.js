import React from "react";
import PropTypes from "prop-types";
import Article from "./Article";
//MUI imports ...
import CssBaseline from "@mui/material/CssBaseline";
// import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import Footer from "./Footer";
import MainFeaturedPost from "./MainFeaturedPost";
import Main from "./Main";

// import post1 from "./blog-post1.md";
// import post2 from "./blog-post1.md";
// import post3 from "./blog-post1.md";

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imageText: "main image description",
  linkText: "Continue reading…",
};

// const featuredPosts = [
//   {
//     title: "Featured post",
//     date: "Nov 12",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     image: "https://source.unsplash.com/random",
//     imageLabel: "Image Text",
//   },
//   {
//     title: "Post title",
//     date: "Nov 11",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     image: "https://source.unsplash.com/random",
//     imageLabel: "Image Text",
//   },
// ];

// const posts = [post1, post2, post3];

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const sections = [
  { title: "JavaScript", url: "#" },
  { title: "Python", url: "#" },
  { title: "Other", url: "#" },
];

function BlogHome(props) {
  const { my_articles } = props;

  return (
    <div className="blog-home-container">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <main>
            <MainFeaturedPost post={mainFeaturedPost} />
            <div className="articles-bookshelf">
              <Header title="Blog" sections={sections} />
              <ol className="articles-grid">
                {my_articles.map((an_article, an_article_idx) => {
                  return (
                    <Article key={an_article_idx} the_article={an_article} />
                  );
                })}
              </ol>
            </div>
          </main>
        </Container>
        <Footer
          title="Footer"
          description="created by https://github.com/sunny0402"
        />
      </ThemeProvider>
    </div>
  );
}

BlogHome.propTypes = {
  my_articles: PropTypes.array.isRequired,
};

export default BlogHome;
