import { PostHeader } from "../../../server/src/db/entity/post";

export const prePostList: PostHeader[] = [
  {
    post_id: 1,
    title: "테스트 포스트 제목입니다 - 1",
    nickname: "테스트유저1",
    create_time: new Date(),
    likes: 25,
    dislikes: 0,
  },
  {
    post_id: 2,
    title: "테스트 포스트 제목입니다 - 2",
    nickname: "테스트유저2",
    create_time: new Date(),
    likes: 40,
    dislikes: 31,
  },
  {
    post_id: 3,
    title: "테스트 포스트 제목입니다 - 3",
    nickname: "테스트유저3",
    create_time: new Date(),
    likes: 100,
    dislikes: 1,
  },
  {
    post_id: 4,
    title: "테스트 포스트 제목입니다 - 4",
    nickname: "테스트유저4",
    create_time: new Date(),
    likes: 1,
    dislikes: 124,
  },
];
