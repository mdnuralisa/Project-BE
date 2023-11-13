import { DataTypes } from "sequelize";
import { postgresConnection } from "../database/connection.js";

const categories = postgresConnection.define(
  "categories",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default categories;