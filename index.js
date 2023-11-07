import express from "express";
import apiRoutes from "./routes/index.js";
import { db } from "./database/connection.js";

const app = express();
const PORT = 8080;

db();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// declare routes
app.use(apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});