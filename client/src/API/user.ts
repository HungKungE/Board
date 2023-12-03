import { sendPostRequest } from "./api";

export interface SignUpUserInfo {
  id: string;
  password: { value: string; check: string };
  email: { local_part: string; domain: string };
}

export interface SignInUserInfo {
  id: string;
  password: string;
}

export const sendSignUpRequest = (userInfo: SignUpUserInfo) => {
  const getEmail = () => {
    if (
      userInfo.email.local_part.length !== 0 ||
      userInfo.email.domain.length !== 0
    ) {
      return userInfo.email.local_part + "@" + userInfo.email.domain;
    }

    return undefined;
  };

  const userData = {
    id: userInfo.id,
    password: userInfo.password.value,
    email: getEmail(),
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
