import categories from "../model/categories.model.js";
import items from "../model/items.model.js";
import user from "../model/user.model.js";
import { postgresConnection } from "./connection.js";

export const db = async () => {
  try {
    await postgresConnection.authenticate();
    console.log("Connection has been established successfully.");
    await user.sync({ alter: true });
    await categories.sync({ alter: true });
    await items.sync({alter: true});
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};