import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { convertCSVToJSON } from "./src/controllers";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/csv-json", convertCSVToJSON);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
