require("dotenv").config();
console.log(process.env);
const Sequelize = require("sequelize");

//mysql database local instance 3306
const my_db_connection_instance = new Sequelize(
  process.env.DB_NAME,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",

    // can set global options here
    // define: {
    //   freezeTableName: true,
    //   timestamps: false,
    // },
  }
);

const db_to_export = {
  my_db_connection_instance,
  Sequelize,
  models: {},
};

db_to_export.models.Article = require("./models/article")(
  my_db_connection_instance
);

// TODO: add User model
// db_to_export.models.User = require("./models/user")(my_db_connection_instance);

module.exports = db_to_export;
