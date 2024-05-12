import express from "express";
import cors from "cors";
import globalRoutes from "./routes";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/v1", globalRoutes);

app.listen(9000, () => {
  console.log("server is running");
});
