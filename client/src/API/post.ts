import { sendGetRequest, sendPostRequest } from "./api";

export interface PostRequest {
  title: string;
  content: string;
}

export interface CommentRequest {
  post_id: number;
  content: string;
}

export const sendGetPostHeadersRequest = () => {
  return sendGetRequest("/post/header");
};

export const sendGetOpenPostDataRequest = (post_id: number) => {
  return sendGetRequest(`/post/opendata?post_id=${post_id}`);
};

export const sendCreatePostRequest = (postRequest: PostRequest) => {
  return sendPostRequest("/post/post", postRequest);
};

export const sendGetCommentDatasRequest = (post_id: number) => {
  return sendGetRequest(`/post/comment?post_id=${post_id}`);
};

export const sendCreateCommentRequest = (commentRequest: CommentRequest) => {
  return sendPostRequest("/post/comment", commentRequest);
};
