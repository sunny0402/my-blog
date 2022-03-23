const { Sequelize, DataTypes } = require("sequelize");
//save mardown to db. then convert markdown to html, sanitize, and render
//https://github.com/WebDevSimplified/Markdown-Blog/blob/master/models/article.js
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);
const marked = require("marked");

function articleModelFunction(sqlize_connection_instance) {
  class Article extends Sequelize.Model {}
  Article.init(
    // 1. Attributes object
    {
      // set custom primary key
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title cannot be null.",
          },
          notEmpty: {
            msg: "Please provide a value for title.",
          },
        },
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Alex",
        validate: {
          notNull: {
            msg: "Author cannot be null.",
          },
          notEmpty: {
            msg: "Please provide a value for author.",
          },
        },
      },
      readTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10,
        validate: {
          notNull: {
            msg: "Read time cannot be null.",
          },
          min: {
            args: 3,
            msg: "Read time must be at least 3 minutes.",
          },
        },
      },
      publishDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        // defaultValue: new Date().toLocaleDateString(),
        // defaultValue: Sequelize.NOW,
        validate: {
          notNull: {
            msg: "Publish date cannot be null.",
          },
          notEmpty: {
            msg: "Please provide a value for publish date.",
          },
          isDate: {
            msg: "Only allow date strings.",
          },
          isAfter: {
            args: "2022-01-01",
            msg: 'Please provide a value on or after "2022-01-01".',
          },
        },
      },
      isPublished: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      contentMarkdown: {
        // constraints are at SQL level
        type: Sequelize.TEXT,
        allowNull: false,
        // validation at JavaScript level, if fail validation no SQL query
        validate: {
          notNull: {
            msg: "Content cannot be null.",
          },
          notEmpty: {
            msg: "Please provide a value for content.",
          },
        },
      },
      // if wanted to render html instead of markdown
      contentSanitizedHTML: {
        type: Sequelize.TEXT,
        required: true,
        // validate: {}, //use model wide validation to set contentSanitizedHTML
      },
    },
    // 2. Model options object
    {
      // Model option notes:
      //   timestamps: false, // disable timestamps
      //   freezeTableName: true, // disable plural table names
      //   modelName: 'movie', // set model name to 'movie'; table name will be 'movies'
      //   tableName: 'my_movies_table', // table name change
      //   soft deletes(paranoid): mark record as deleted instead of actually deleting

      modelName: "article", //table name will be articles
      paranoid: "true",
      sequelize: sqlize_connection_instance,
      // model wide validation
      validate: {
        sanitizeHTML() {
          if (this.contentMarkdown) {
            this.contentSanitizedHTML = dompurify.sanitize(
              this.contentMarkdown
            );
          }
        },
      },
    }
  );
  return Article;
}

module.exports = articleModelFunction;
