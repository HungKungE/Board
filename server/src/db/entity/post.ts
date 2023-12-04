export interface Post {
  post_id: number;
  user_id: number;
  create_time: Date;
  title: string;
  content: string;
}

export interface PostLike {
  post_id: number;
  user_id: number;
  likes: boolean;
  dislikes: boolean;
}

export interface PostHeader {
  post_id: number;
  nickname: string;
  create_time: Date;
  title: string;
  likes: number;
  dislikes: number;
}

export const mapToPost = (data: any): Post => {
  if (!data) {
    return {
      post_id: -1,
      user_id: -1,
      create_time: new Date(),
      title: "",
      content: "",
    };
  }

  return {
    post_id: data.post_id,
    user_id: data.user_id,
    create_time: new Date(data.create_time),
    title: data.title,
    content: data.content,
  };
};

export const mapToPostHeader = (data: any): PostHeader => {
  if (!data) {
    return {
      post_id: -1,
      nickname: "",
      create_time: new Date(),
      title: "",
      likes: 0,
      dislikes: 0,
    };
  }

  return {
    post_id: data.post_id,
    nickname: data.nickname,
    create_time: new Date(data.create_time),
    title: data.title,
    likes: data.likes, // 좋아요 정보가 있는 경우에만 true로 설정
    dislikes: data.dislikes, // 싫어요 정보가 있는 경우에만 true로 설정
  };
};
