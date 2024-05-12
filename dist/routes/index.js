"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../handler/user");
const globalRoutes = (0, express_1.Router)();
globalRoutes.get("/healthCheck", (req, res) => {
    res.status(200).send({ message: "working" });
});
globalRoutes.get("/get-user", user_1.GetUser);
globalRoutes.post("/insert-user", user_1.InsertUser);
globalRoutes.put("/update-user", user_1.UpdateUser);
globalRoutes.delete("/delete-user", user_1.DeleteUser);
globalRoutes.post("/get-user-by-id", user_1.GetUserByID);
exports.default = globalRoutes;
