import "dotenv/config";
import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(morgan("dev"));

app.use(cors());

app.use(urlencoded({ extended: false }));

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send("Hola mundo");
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;
