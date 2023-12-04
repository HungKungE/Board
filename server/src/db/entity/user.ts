export type UserRole = "admin" | "user";

export interface UserInfo {
  user_id: number;
  nickname: string;
  password: string;
  join_time: Date;
  user_role: UserRole;
}

export interface SessionUserInfo {
  user_id: number;
  nickname: string;
  login_time: Date;
  user_role: UserRole;
}

export const mapToUserInfo = (data: any): UserInfo => {
  if (!data) {
    return {
      user_id: -1,
      nickname: "",
      password: "",
      join_time: new Date(),
      user_role: "user",
    };
  }

  return {
    user_id: data.user_id,
    nickname: data.nickname,
    password: data.password,
    join_time: new Date(data.join_time),
    user_role: data.user_role as UserRole,
  };
};

export const getPassword = (data: any): string => {
  if (!data) {
    return "";
  }

  return data.password;
};
