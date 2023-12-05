// Post Entity ======================================================
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

export interface Comment {
  comment_id: number;
  user_id: number;
  post_id: number;
  create_time: Date;
  content: string;
}

export interface CommentLike {
  comment_id: number;
  post_id: number;
  user_id: number;
  likes: boolean;
  dislikes: boolean;
}

// 서비스에 필요한 파생 데이터 타입 ====================================

export interface PostHeader {
  post_id: number;
  nickname: string;
  create_time: Date;
  title: string;
  likes: number;
  dislikes: number;
}

export interface PostData {
  postHeader: PostHeader;
  content: string;
}

export interface CommentData {
  comment_id: number;
  nickname: string;
  post_id: number;
  create_time: Date;
  likes: number;
  dislikes: number;
  content: string;
}

// Post Method ======================================================
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
    likes: data.likes,
    dislikes: data.dislikes,
  };
};

export const mapToCommentData = (data: any): CommentData => {
  if (!data) {
    return {
      comment_id: -1,
      nickname: "",
      post_id: -1,
      create_time: new Date(),
      likes: 0,
      dislikes: 0,
      content: "",
    };
  }

  return {
    comment_id: data.comment_id,
    nickname: data.nickname,
    post_id: data.post_id,
    create_time: new Date(data.create_time),
    likes: data.likes,
    dislikes: data.dislikes,
    content: data.content,
  };
};

export const getContent = (data: any): string => {
  if (!data) {
    return "";
  }

  return data.content;
};
