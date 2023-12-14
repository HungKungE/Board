import mysql2, { RowDataPacket } from "mysql2/promise";
import { dbConfig } from "../dbConnect";
import {
  CommentData,
  Post,
  PostHeader,
  getContent,
  mapToCommentData,
  mapToPost,
  mapToPostHeader,
} from "../../entity/post";

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

export const createComment = async (
  userId: number,
  postId: number,
  content: string
) => {
  const connection = await mysql2.createConnection(dbConfig);
  const insertPostQuery =
    "INSERT INTO comment (user_id, post_id, create_time, content) VALUES (?, ?, NOW(), ?)";

  try {
    await connection.query(insertPostQuery, [userId, postId, content]);
  } catch (error) {
    throw error;
  } finally {
    await connection.end();
  }
};

export const getComments = async (post_id: number) => {
  const connection = await mysql2.createConnection(dbConfig);
  const query =
    "SELECT c.comment_id, u.nickname, c.post_id, c.create_time, SUM(CASE WHEN cl.likes THEN 1 ELSE 0 END) AS likes, SUM(CASE WHEN cl.dislikes THEN 1 ELSE 0 END) AS dislikes, c.content FROM comment c INNER JOIN user_info u ON c.user_id = u.user_id LEFT JOIN comment_likes cl ON c.comment_id = cl.comment_id AND c.post_id = cl.post_id AND c.user_id = cl.user_id WHERE c.post_id = ? GROUP BY c.comment_id, u.nickname, c.post_id, c.create_time, c.content ORDER BY c.create_time ASC;";
  try {
    const [rows] = await connection.query<RowDataPacket[]>(query, [post_id]);
    const comments: CommentData[] = rows.map((row) => {
      return mapToCommentData(row);
    });
    return comments;
  } catch (error) {
    throw error;
  } finally {
    await connection.end();
  }
};
