import mysql2, { RowDataPacket } from "mysql2/promise";
import { dbConfig } from "../dbConnect";
import {
  Post,
  PostHeader,
  getContent,
  mapToPost,
  mapToPostHeader,
} from "../entity/post";

export const createPost = async (
  userId: number,
  title: string,
  content: string
) => {
  const connection = await mysql2.createConnection(dbConfig);
  const insertPostQuery =
    "INSERT INTO post (user_id, create_time, title, content) VALUES (?, NOW(), ?, ?)";

  try {
    await connection.query(insertPostQuery, [userId, title, content]);
  } catch (error) {
    throw error;
  } finally {
    await connection.end();
  }
};

export const getPostContent = async (post_id: number) => {
  const connection = await mysql2.createConnection(dbConfig);
  const query = "SELECT content FROM post WHERE post_id = ?";
  try {
    const [rows] = await connection.query<RowDataPacket[]>(query, [post_id]);
    const content: string = getContent(rows[0]);
    return content;
  } catch (error) {
    throw error;
  } finally {
    await connection.end();
  }
};

export const getPostHeaders = async () => {
  const connection = await mysql2.createConnection(dbConfig);
  const query =
    "SELECT p.post_id, u.nickname, p.create_time, p.title, SUM(IF(pl.likes = true, 1, 0)) AS likes, SUM(IF(pl.dislikes = true, 1, 0)) AS dislikes FROM post p INNER JOIN user_info u ON p.user_id = u.user_id LEFT JOIN post_likes pl ON p.post_id = pl.post_id GROUP BY p.post_id, u.nickname, p.create_time, p.title ORDER BY p.create_time DESC;";
  try {
    const [rows] = await connection.query<RowDataPacket[]>(query);
    const postHeaders: PostHeader[] = rows.map((row) => {
      return mapToPostHeader(row);
    });
    return postHeaders;
  } catch (error) {
    throw error;
  } finally {
    await connection.end();
  }
};
