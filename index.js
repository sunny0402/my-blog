const express = require("express");
const cors = require("cors");
const path = require("path");
let my_db = require("./database");
const { Article } = my_db.models;
//blog articles written in markdown files, save HTML string to db
const fs = require("fs");
const marked = require("marked");

// const router = new Router();
const app = express();

/* Middleware*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

async function database_start() {
  try {
    await my_db.my_db_connection_instance.authenticate();
    console.log("Connection to the database successful!");
    //{ force: true }
    await my_db.my_db_connection_instance.sync({ force: true });
    // TODO: model attributes based on proptypes of Main.js, MainFeaturedPost.js, FeaturedPost.js
    //    title, author, readTime(10),publishDate(DATEONLY: yyyy-mm-dd), isPublished(false), content

    // const articleInstances = await Promise.all([   ]);

    //TODO: import markdown file and assign to contentMarkdown...
    //TODO: leave file1 in markdown format... so save a markdown string to db instead of html string..
    const markdown_article1 = fs.readFileSync(
      "./myArticles/blog-post.1.md",
      "utf8"
    );
    const html_article1 = marked.parse(markdown_article1);

    const markdown_article2 = fs.readFileSync(
      "./myArticles/blog-post.2.md",
      "utf8"
    );
    const html_article2 = marked.parse(markdown_article2);

    const markdown_article3 = fs.readFileSync(
      "./myArticles/blog-post.3.md",
      "utf8"
    );
    const html_article3 = marked.parse(markdown_article3);

    await Article.create({
      title: "First Article",
      author: "sunny-codes",
      contentMarkdown: markdown_article1,
      publishDate: "2022-03-17",
    });

    await Article.create({
      title: "Second Article",
      author: "sunny-codes",
      contentMarkdown: markdown_article2,
      // publishDate: new Date().toLocaleDateString(),
      publishDate: "2022-03-18",
    });

    await Article.create({
      title: "Second Article",
      author: "sunny-codes",
      contentMarkdown: markdown_article3,
      publishDate: "2022-03-19",
    });

    //heroku run node index.js: no SQL errors if successful.
    console.log("Entered articles into database successful!");
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      console.error("Validation errors: ", errors);
    } else {
      // throw error;
      console.log(error);
    }
  }
}

database_start();

const port = process.env.PORT || 5000;
try {
  app.listen(port);
  console.log("App is listening on port " + port);
} catch (error) {
  throw error;
}

// if deployed serve static files from build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname + "/client/build/index.html"));
  // });
} else {
  app.use(express.static(path.join(__dirname, "/client/public")));
  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname + "/client/public/index.html"));
  // });
}

// an api endpoint that returns a short list of items
app.get("/api/getArticles", async (req, res) => {
  console.log("get all articles request received ...");
  try {
    //await db operation
    const articles = await Article.findAll({
      order: [["publishDate", "DESC"]],
    });
    console.log("articles from db:");
    console.log(articles);
    res.json(articles);
  } catch (error) {
    console.log(error);
    res.sendStatus(error.status || 500);
  }
});

// get a single article
// app.get("/api/:id", async (req, res) => {
//   try {
//     console.log(`article requested: ${req.params.id}`);
//     const article = await Article.findByPk(req.params.id);
//   } catch (error) {
//     res.sendStatus(error.status || 500);
//   }
// });

// //Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
  //res.sendStatus(404);
});
