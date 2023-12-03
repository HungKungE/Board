export type UserRole = "admin" | "user";

export interface UserInfo {
  user_id: number;
  nickname: string;
  password: string;
  join_time: Date;
  user_role: UserRole;
}
