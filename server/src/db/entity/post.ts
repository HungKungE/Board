export interface Post {
  post_id: number;
  user_id: number;
  create_time: Date;
  title: string;
  content: string;
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
