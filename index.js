const express = require("express");
const cors = require("cors");
const path = require("path");
const { Router } = require("express");
const my_db = require("./database/index");
const { Article } = require("./database/models/article");

const router = new Router();
const app = express();

/* Middleware*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// if deployed serve static files from build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build/")));
}

async function database_start() {
  //{ force: true } would drop all tables and create again
  await my_db.my_db_connection_instance.sync();
  try {
    await my_db.my_db_connection_instance.authenticate();
    console.log("Connection to the database successful!");

    const articleInstances = await Promise.all([
      //    title, author, readTime(10),publishDate(DATEONLY: yyyy-mm-dd)
      //    isPublished(false), content

      Article.create({
        title: "First Article",
        author: "Alex",
        content: "Testing... First Article. About Python.",
      }),
    ]);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      console.error("Validation errors: ", errors);
    } else {
      throw error;
    }
  }
}

const port = process.env.PORT || 5000;
database_start().then(() => {
  app.listen(port);
  console.log("App is listening on port " + port);
});

// an api endpoint that returns a short list of items
router.get("/api/getArticles", async (req, res) => {
  try {
    //await db operation
    const list = [
      {
        title: "Article 1",
        publishDate: "2022-02-26",
        content: "The text goes here. It is the blog article 1.",
        author: "sunny-codes",
      },
    ];
    res.json(list);
    console.log(res.json(list));
  } catch (error) {
    res.sendStatus(err.status || 500);
  }
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname + "/client/build/index.html"));
  res.sendStatus(err.status || 404);
});
