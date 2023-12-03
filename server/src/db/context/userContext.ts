import mysql2, { RowDataPacket } from "mysql2/promise";
import { dbConfig } from "../dbConnect";
import { mapToUserInfo } from "../entity/user";

export const getUserInfo = async (nickname: string) => {
  const connection = await mysql2.createConnection(dbConfig); // 여기도 수정
  const query = "SELECT * FROM user_info WHERE nickname = ?";

  try {
    const [rows] = await connection.query<RowDataPacket[]>(query, [nickname]);
    const userInfo = mapToUserInfo(rows[0]);
    return userInfo;
  } catch (error) {
    throw error;
  } finally {
    await connection.end(); // 연결을 닫아주는 것이 중요
  }
};
