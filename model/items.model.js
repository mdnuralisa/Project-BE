import { DataTypes } from "sequelize";
import { postgresConnection } from "../database/connection.js";

const items = postgresConnection.define(
  "items",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default items;