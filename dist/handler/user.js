"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByID = exports.DeleteUser = exports.UpdateUser = exports.InsertUser = exports.GetUser = void 0;
const user_1 = require("../service/user");
function GetUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, user_1.GetUserService)();
            return res.status(200).json({
                message: "sucess",
                data,
            });
        }
        catch (e) {
            return res.status(400).send(e);
        }
    });
}
exports.GetUser = GetUser;
function InsertUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const param = req.body;
            console.log(param);
            const data = yield (0, user_1.InsertUserService)(param);
            return res.status(200).json({
                message: "sucess",
                data,
            });
        }
        catch (e) {
            return res.status(400).send(e);
        }
    });
}
exports.InsertUser = InsertUser;
function UpdateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const param = req.body;
            var dateObject = new Date(param.dob);
            const params = {
                id: parseInt(param.id),
                name: param.name,
                email: param.email,
                phone: param.phone,
                dob: dateObject,
            };
            const data = yield (0, user_1.UpdateUserService)(params);
            return res.status(200).json({
                message: "sucess",
                data,
            });
        }
        catch (e) {
            return res.status(400).send(e);
        }
    });
}
exports.UpdateUser = UpdateUser;
function DeleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const param = req.body;
            const useParam = {
                id: parseInt(param.id),
            };
            if (!param.id) {
                throw new Error("user not found");
            }
            const data = yield (0, user_1.DeleteUserService)(useParam);
            if (!data) {
                return res.status(501).send("user not found");
            }
            return res.status(200).json({
                message: "sucess",
                data,
            });
        }
        catch (e) {
            return res.status(400).send(e);
        }
    });
}
exports.DeleteUser = DeleteUser;
function GetUserByID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const params = req.body;
            const data = yield (0, user_1.GetUserByIDService)(params);
            if (!data) {
                return res.status(500).send("user not found");
            }
            return res.status(200).json({ mesaage: "success", data });
        }
        catch (e) {
            return res.status(400).send(e);
        }
    });
}
exports.GetUserByID = GetUserByID;
