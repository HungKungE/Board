import { sendGetRequest, sendPostRequest } from "./api";

export interface PostRequest {
  title: string;
  content: string;
}

export const sendGetPostHeadersRequest = () => {
  return sendGetRequest("/post/header");
};

export const sendCreatePostRequest = (postRequest: PostRequest) => {
  return sendPostRequest("/post/post", postRequest);
};
