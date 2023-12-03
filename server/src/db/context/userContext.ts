import mysql from "mysql";
import { dbConfig } from "../dbConnect";

// db connect
export const getUserInfo = (nickname: string) => {
  const connection = mysql.createConnection(dbConfig);
  const query = "SELECT * FROM user_info WHERE nickname = ?";

  connection.query(query, [nickname], (error, rows) => {
    if (error) {
      throw error;
    }
    console.log("User info is: ", rows);
    return rows;
  });
};
