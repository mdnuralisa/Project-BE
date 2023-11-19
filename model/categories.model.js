import { DataTypes } from "sequelize";
import { postgresConnection } from "../database/connection.js";
import items from "./items.model.js";

const categories = postgresConnection.define(
  "categories",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

categories.hasMany(items)

export default categories;