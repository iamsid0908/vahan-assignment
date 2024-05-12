export interface User {
  email: string;
  name?: string | null;
  phone?: string | null;
  dob?: Date | null;
}
export interface UpdateParam {
  id: number;
  email: string;
  name?: string | null;
  phone?: string | null;
  dob?: Date | null;
}
export interface DeleteParam {
  id: number;
}
export interface DeleteParamString {
  id: string;
}
export interface GetUserIdParam {
  id: string;
}
export interface GetUserIdResp {
  id: number;
  email: string;
  name: string;
  phone: string;
  dob: Date;
}
export type GetUserIdRes = {
  id: number;
  email: string;
  name: string;
  phone: string;
  dob: Date;
};
export type GetUserIdRess = {
  id: number;
  email: string;
  name: string;
  phone: string;
  dob: string;
};
