const { Sequelize, DataTypes } = require("sequelize");

function imageModelFunction(sqlize_connection_instance) {
  class Image extends Sequelize.Model {}
  Image.init(
    // 1. Attributes object
    {
      // set custom primary key
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      imageTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "imageTitle cannot be null.",
          },
          notEmpty: {
            msg: "Please provide a value for imageTitle.",
          },
        },
      },
      s3URL: {
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
      inArtcileIndex: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          notNull: {
            msg: "inArtcileIndex cannot be null.",
          },
          min: {
            args: 1,
            msg: "inArtcileIndex must be at least 1.",
          },
        },
      },
      isIcon: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

      modelName: "image", //table name will be images, note it is lowercase
      paranoid: "true",
      sequelize: sqlize_connection_instance,
      // model wide validation
      //   validate: {},
    }
  );
  return Image;
}

module.exports = imageModelFunction;
