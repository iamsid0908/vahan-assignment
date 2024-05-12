import {
  DeleteUserDomain,
  GetUserByIDServiceDomain,
  GetUserDomain,
  InsertUserDomain,
  UpdateUserDomain,
  VarifyUser,
} from "../domain/user";
import {
  DeleteParam,
  GetUserIdParam,
  GetUserIdRes,
  GetUserIdResp,
  GetUserIdRess,
  UpdateParam,
  User,
} from "../interface/user";

export async function GetUserService() {
  return await GetUserDomain();
}

export async function InsertUserService(param: User) {
  return await InsertUserDomain(param);
}

export async function UpdateUserService(param: UpdateParam) {
  if (!param.id) {
    throw new Error("user not found");
  }
  return await UpdateUserDomain(param);
}

export async function DeleteUserService(param: DeleteParam) {
  try {
    const exist = VarifyUser(param);
    if (!exist) {
      throw new Error("user not found");
    }
    return await DeleteUserDomain(param);
  } catch (e) {
    return e;
  }
}

export async function GetUserByIDService(
  param: GetUserIdParam
): Promise<GetUserIdRess> {
  const response = await GetUserByIDServiceDomain(param);
  if (!response) {
    throw new Error("Empty response received.");
  }
  const dateString = response.dob.toISOString();

  const getUserIdResp: GetUserIdRess = {
    id: response.id,
    name: response.name,
    email: response.email,
    dob: dateString.split("T")[0],
    phone: response.phone,
  };

  return getUserIdResp;
}
