import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { convertCSVToJSON } from "./src/controllers";
import { connect, connection } from "mongoose";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/csv-json", convertCSVToJSON);

const makeDBConnection = (connectionInfo: any) => {
  // eslint-disable-next-line promise/param-names
  return new Promise<{
    connected: boolean;
    error?: any;
  }>((res: any, rej: any) => {
    try {
      connect(
        `${connectionInfo.connectionString}`,
        (connectionInfo.options = {})
      );

      connection.on("connected", () => {
        res({ connected: true });
      });
    } catch (err) {
      rej(err);
    }
  });
};

const mongoDBConnectionDetails = {
  connectionString: process.env.MONGO_CONN_URL,
  database: process.env.DB_NAME,
  options: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true,
  },
};

makeDBConnection(mongoDBConnectionDetails).then(() => {
  console.log("DB Connected");
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
