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
exports.GetUserByIDServiceDomain = exports.VarifyUser = exports.DeleteUserDomain = exports.UpdateUserDomain = exports.InsertUserDomain = exports.GetUserDomain = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function GetUserDomain() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield prisma.user.findMany();
            return users.sort((a, b) => {
                if (a.name && b.name) {
                    return a.name.localeCompare(b.name);
                }
                else if (!a.name && b.name) {
                    return -1;
                }
                else if (a.name && !b.name) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }
        catch (error) {
            return error;
        }
    });
}
exports.GetUserDomain = GetUserDomain;
function InsertUserDomain(param) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, name, phone, dob } = param;
            console.log(dob);
            const user = yield prisma.user.create({
                data: {
                    email,
                    name,
                    phone,
                    dob: dob ? new Date(dob) : undefined,
                },
            });
            return user;
        }
        catch (error) {
            return error;
        }
    });
}
exports.InsertUserDomain = InsertUserDomain;
function UpdateUserDomain(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = params.id;
            const { email, name, phone, dob } = params;
            const updateUser = yield prisma.user.update({
                where: { id: userId },
                data: {
                    email,
                    name,
                    phone,
                    dob: dob ? new Date(dob) : undefined,
                },
            });
            return updateUser;
        }
        catch (error) {
            return error;
        }
    });
}
exports.UpdateUserDomain = UpdateUserDomain;
function DeleteUserDomain(param) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userID = param.id;
            yield prisma.user.delete({ where: { id: userID } });
            return { message: "user deleted" };
        }
        catch (error) {
            return error;
        }
    });
}
exports.DeleteUserDomain = DeleteUserDomain;
function VarifyUser(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userID = params.id;
            const existingUser = yield prisma.user.findUnique({
                where: { id: userID },
            });
            return existingUser;
        }
        catch (e) {
            return e;
        }
    });
}
exports.VarifyUser = VarifyUser;
function GetUserByIDServiceDomain(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userID = parseInt(params.id);
            const user = yield prisma.user.findUnique({
                where: { id: userID },
            });
            return user;
        }
        catch (error) {
            return error;
        }
    });
}
exports.GetUserByIDServiceDomain = GetUserByIDServiceDomain;
