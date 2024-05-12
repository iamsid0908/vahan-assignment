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
exports.GetUserByIDService = exports.DeleteUserService = exports.UpdateUserService = exports.InsertUserService = exports.GetUserService = void 0;
const user_1 = require("../domain/user");
function GetUserService() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, user_1.GetUserDomain)();
    });
}
exports.GetUserService = GetUserService;
function InsertUserService(param) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, user_1.InsertUserDomain)(param);
    });
}
exports.InsertUserService = InsertUserService;
function UpdateUserService(param) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!param.id) {
            throw new Error("user not found");
        }
        return yield (0, user_1.UpdateUserDomain)(param);
    });
}
exports.UpdateUserService = UpdateUserService;
function DeleteUserService(param) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const exist = (0, user_1.VarifyUser)(param);
            if (!exist) {
                throw new Error("user not found");
            }
            return yield (0, user_1.DeleteUserDomain)(param);
        }
        catch (e) {
            return e;
        }
    });
}
exports.DeleteUserService = DeleteUserService;
function GetUserByIDService(param) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, user_1.GetUserByIDServiceDomain)(param);
        if (!response) {
            throw new Error("Empty response received.");
        }
        const dateString = response.dob.toISOString();
        const getUserIdResp = {
            id: response.id,
            name: response.name,
            email: response.email,
            dob: dateString.split("T")[0],
            phone: response.phone,
        };
        return getUserIdResp;
    });
}
exports.GetUserByIDService = GetUserByIDService;
