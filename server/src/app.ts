import "dotenv/config";
import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectionDB } from "./connection/connection";
import authRoutes from "./routes/auth.routes";
import neighborRoutes from "./routes/neighbor.routes";
import placeRoutes from "./routes/place.routes";
import neighborPlaceRoutes from "./routes/neighborPlace.routes";
import monthlyFeeRoutes from "./routes/monthlyFee.routes";
import yearRoutes from "./routes/year.routes";

const app = express();

app.use(morgan("dev"));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(urlencoded({ extended: false }));

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", neighborRoutes);
app.use("/api", placeRoutes);
app.use("/api", neighborPlaceRoutes);
app.use("/api", monthlyFeeRoutes);
app.use("/api", yearRoutes);

app.get("/", (_req, res) => {
  res.send("Hola mundo");
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
connectionDB();
export default app;
