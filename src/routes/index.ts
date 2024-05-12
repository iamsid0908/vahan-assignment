import { Router } from "express";
import {
  DeleteUser,
  GetUser,
  GetUserByID,
  InsertUser,
  UpdateUser,
} from "../handler/user";

const globalRoutes = Router();

globalRoutes.get("/healthCheck", (req, res) => {
  res.status(200).send({ message: "working" });
});
globalRoutes.get("/get-user", GetUser);
globalRoutes.post("/insert-user", InsertUser);
globalRoutes.put("/update-user", UpdateUser);
globalRoutes.delete("/delete-user", DeleteUser);
globalRoutes.post("/get-user-by-id", GetUserByID);

export default globalRoutes;
