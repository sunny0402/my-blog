const express = require("express");
const cors = require("cors");
const path = require("path");
// const { Router } = require("express");
let my_db = require("./database");
const { Article } = my_db.models;

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
    //    title, author, readTime(10),publishDate(DATEONLY: yyyy-mm-dd)
    //    isPublished(false), content

    //SET sql_mode = '';
    // const [results, metadata] = await sequelize.query("SET sql_mode = ''");
    // console.log(results);
    // console.log(metadata);
    // const articleInstances = await Promise.all([   ]);

    //create table on mysql workbench...

    await Article.create({
      title: "First Article",
      author: "sunny-codes",
      content:
        "Testing... First Article. About Python. It is a great article. It was the best article ever.",
      publishDate: "2022-03-07",
    });
    await Article.create({
      title: "Second Article",
      author: "sunny-codes",
      content: "Testing... Second Article. About JavaScript.",
      // publishDate: new Date().toLocaleDateString(),
      publishDate: "2022-03-06",
    });
    await Article.create({
      title: "Second Article",
      author: "sunny-codes",
      content: "Testing... Thirt article. Article. About JavaScript.",
      publishDate: "2022-03-07",
    });
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
  // database_start().then(() => {
  //   app.listen(port);
  //   console.log("App is listening on port " + port);
  // });
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
    // const all_articles = await Article.findAll();
    // console.log(all_articles.map((an_article) => an_article.toJSON()));
    // const articles = [
    //   {
    //     title: "First Article",
    //     author: "sunny-codes",
    //     content: "Testing... First Article. About Python.",
    //     publishDate: "2022-03-02",
    //   },
    //   {
    //     title: "Second Article",
    //     author: "sunny-codes",
    //     content: "Testing... Second Article. About Python.",
    //     publishDate: "2022-03-03",
    //   },
    // ];
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
