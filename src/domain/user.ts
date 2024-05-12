import { PrismaClient } from "@prisma/client";
import {
  DeleteParam,
  GetUserIdParam,
  GetUserIdRes,
  GetUserIdResp,
  UpdateParam,
  User,
} from "../interface/user";

const prisma = new PrismaClient();
export async function GetUserDomain() {
  try {
    const users = await prisma.user.findMany();
    return users.sort((a, b) => {
      if (a.name && b.name) {
        return a.name.localeCompare(b.name);
      } else if (!a.name && b.name) {
        return -1;
      } else if (a.name && !b.name) {
        return 1;
      } else {
        return 0;
      }
    });
  } catch (error) {
    return error;
  }
}

export async function InsertUserDomain(param: User) {
  try {
    const { email, name, phone, dob } = param;
    console.log(dob);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        phone,
        dob: dob ? new Date(dob) : undefined,
      },
    });
    return user;
  } catch (error) {
    return error;
  }
}

export async function UpdateUserDomain(params: UpdateParam) {
  try {
    const userId = params.id;
    const { email, name, phone, dob } = params;
    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email,
        name,
        phone,
        dob: dob ? new Date(dob) : undefined,
      },
    });
    return updateUser;
  } catch (error) {
    return error;
  }
}

export async function DeleteUserDomain(param: DeleteParam) {
  try {
    const userID = param.id;

    await prisma.user.delete({ where: { id: userID } });
    return { message: "user deleted" };
  } catch (error) {
    return error;
  }
}

export async function VarifyUser(params: DeleteParam) {
  try {
    const userID = params.id;
    const existingUser = await prisma.user.findUnique({
      where: { id: userID },
    });
    return existingUser;
  } catch (e) {
    return e;
  }
}

export async function GetUserByIDServiceDomain(
  params: GetUserIdParam
): Promise<GetUserIdRes> {
  try {
    const userID = parseInt(params.id);
    const user = await prisma.user.findUnique({
      where: { id: userID },
    });

    return user as GetUserIdRes;
  } catch (error) {
    return error as GetUserIdRes;
  }
}
