import cors from "cors";
import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import { weatherRouter } from "./routes/weather.routes.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

// check express server is running
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/weather", weatherRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
