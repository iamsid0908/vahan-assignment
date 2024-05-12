import { Request, Response } from "express";
import {
  DeleteUserService,
  GetUserByIDService,
  GetUserService,
  InsertUserService,
  UpdateUserService,
} from "../service/user";
import {
  DeleteParam,
  DeleteParamString,
  GetUserIdParam,
  UpdateParam,
  User,
} from "../interface/user";

export async function GetUser(req: Request, res: Response) {
  try {
    const data = await GetUserService();
    return res.status(200).json({
      message: "sucess",
      data,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
}

export async function InsertUser(req: Request, res: Response) {
  try {
    const param: User = req.body;
    console.log(param);
    const data = await InsertUserService(param);
    return res.status(200).json({
      message: "sucess",
      data,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
}

export async function UpdateUser(req: Request, res: Response) {
  try {
    const param: any = req.body;
    var dateObject = new Date(param.dob);
    const params: UpdateParam = {
      id: parseInt(param.id),
      name: param.name,
      email: param.email,
      phone: param.phone,
      dob: dateObject,
    };

    const data = await UpdateUserService(params);
    return res.status(200).json({
      message: "sucess",
      data,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
}

export async function DeleteUser(req: Request, res: Response) {
  try {
    const param: DeleteParamString = req.body;
    const useParam: DeleteParam = {
      id: parseInt(param.id),
    };
    if (!param.id) {
      throw new Error("user not found");
    }
    const data = await DeleteUserService(useParam);
    if (!data) {
      return res.status(501).send("user not found");
    }
    return res.status(200).json({
      message: "sucess",
      data,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
}

export async function GetUserByID(req: Request, res: Response) {
  try {
    const params: GetUserIdParam = req.body;
    const data = await GetUserByIDService(params);
    if (!data) {
      return res.status(500).send("user not found");
    }
    return res.status(200).json({ mesaage: "success", data });
  } catch (e) {
    return res.status(400).send(e);
  }
}
