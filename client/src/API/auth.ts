import { sendPostRequest } from "./api";
import { SignInUserInfo } from "./user";

export const sendLogInRequest = (userData: SignInUserInfo) => {
  return sendPostRequest("/auth/login", userData);
};

export const sendLogOutRequest = () => {
  return sendPostRequest("/auth/logout", null);
};

export const sendCheckRequest = () => {
  return sendPostRequest("/auth/check", null);
};
