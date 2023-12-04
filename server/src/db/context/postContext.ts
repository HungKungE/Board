import mysql2, { RowDataPacket } from "mysql2/promise";
import { dbConfig } from "../dbConnect";
import { Post, mapToPost } from "../entity/post";

export const createPost = async (
  userId: number,
  title: string,
  content: string
) => {
  const connection = await mysql2.createConnection(dbConfig);
  const insertQuery =
    "INSERT INTO post (user_id, create_time, title, conntent) VALUES (?, NOW(), ?, ?)";

  try {
    await connection.query(insertQuery, [userId, title, content]);
  } catch (error) {
    throw error;
  } finally {
    await connection.end();
  }
};

export const getPosts = async () => {
  const connection = await mysql2.createConnection(dbConfig);
  const query = "SELECT * FROM post";

  try {
    const [rows] = await connection.query<RowDataPacket[]>(query);
    const posts: Post[] = rows.map((row) => {
      return mapToPost(row);
    });
    return posts;
  } catch (error) {
    throw error;
  } finally {
    await connection.end();
  }
};
