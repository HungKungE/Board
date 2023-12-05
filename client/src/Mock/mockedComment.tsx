import { CommentData } from "../../../server/src/entity/post";

export const preCommentList: CommentData[] = [
  {
    comment_id: 1,
    post_id: 1,
    nickname: "testUser1",
    create_time: new Date(),
    likes: 10,
    dislikes: 5,
    content: "첫번째 댓글",
  },
  {
    comment_id: 2,
    post_id: 1,
    nickname: "testUser2",
    create_time: new Date(),
    likes: 11,
    dislikes: 6,
    content: "두번째 댓글",
  },
  {
    comment_id: 3,
    post_id: 1,
    nickname: "testUser3",
    create_time: new Date(),
    likes: 12,
    dislikes: 7,
    content: "세번째 댓글",
  },
];
