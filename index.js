const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

/* Middleware*/

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// if deployed serve static files from build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build/")));
}

// console.log(path.join(__dirname, "/client/));

// an api endpoint that returns a short list of items
app.get("/api/getArticles", (req, res) => {
  const list = [
    {
      title: "Article 1",
      publishDate: "2022-02-26",
      content: "The text goes here. It is the blog article 1.",
      author: "sunny-codes",
    },
    {
      title: "Article 2",
      publishDate: "2022-02-27",
      content: "The text goes here. It is the blog article 2.",
      author: "sunny-codes",
    },
    {
      title: "Article 3",
      publishDate: "2022-02-28",
      content: "The text goes here. It is the blog article 3.",
      author: "sunny-codes",
    },
  ];
  res.json(list);
  console.log(res.json(list));
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname + "/client/build/index.html"));
  res.sendStatus(404);
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
