import mysql2, { RowDataPacket } from "mysql2/promise";
import { dbConfig } from "../dbConnect";
import { getPassword, mapToUserInfo } from "../../entity/user";

export const getUserInfo = async (nickname: string) => {
  const connection = await mysql2.createConnection(dbConfig);
  const query = "SELECT * FROM user_info WHERE nickname = ?";

  try {
    const [rows] = await connection.query<RowDataPacket[]>(query, [nickname]);
    const userInfo = mapToUserInfo(rows[0]);
    return userInfo;
  } catch (error) {
    throw error;
  } finally {
    await connection.end();
  }
};

export const getUserPassword = async (nickname: string) => {
  const connection = await mysql2.createConnection(dbConfig);
  const query = "SELECT password FROM user_info WHERE nickname = ?";

  try {
    const [rows] = await connection.query<RowDataPacket[]>(query, [nickname]);
    const password = getPassword(rows[0]);
    return password;
  } catch (error) {
    throw error;
  } finally {
    await connection.end();
  }
};

export const createUserInfo = async (nickname: string, password: string) => {
  const connection = await mysql2.createConnection(dbConfig);
  const insertQuery =
    "INSERT INTO user_info (nickname, password, join_time, user_role) VALUES (?,?,NOW(),'user')";

  try {
    await connection.query(insertQuery, [nickname, password]);
  } catch (error) {
    throw error;
  } finally {
    await connection.end();
  }
};

export const updateUserPassword = async (
  nickname: string,
  password: string
) => {
  const connection = await mysql2.createConnection(dbConfig);
  const insertQuery = "UPDATE user_info SET password = ? WHERE nickname = ?";

  try {
    await connection.query(insertQuery, [password, nickname]);
  } catch (error) {
    throw error;
  } finally {
    await connection.end();
  }
};
