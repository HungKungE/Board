import { sendPostRequest } from "./api";

export interface SignUpUserInfo {
  nickname: string;
  password: { value: string; check: string };
}

export interface SignInUserInfo {
  nickname: string;
  password: string;
}

export const sendSignUpRequest = (userInfo: SignUpUserInfo) => {
  const userData = {
    nickname: userInfo.nickname,
    password: userInfo.password.value,
  };
  return sendPostRequest("/user/signup", userData);
};

export const sendIdCheckRequest = (userId: string) => {
  return sendPostRequest("/user/check/id", { id: userId });
};

export const sendPasswordCheckRequest = (currentPassword: string) => {
  return sendPostRequest("/user/check/password", { password: currentPassword });
};

export const sendUpdatePasswordRequest = (newPassword: string) => {
  return sendPostRequest("/user/update/password", { password: newPassword });
};
