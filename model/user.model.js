import { DataTypes } from "sequelize";
import { postgresConnection } from "../database/connection.js";

const user = postgresConnection.define(
  "user",
  {
    // Model attributes are defined here
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default user;