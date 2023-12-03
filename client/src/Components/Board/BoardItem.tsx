interface Post {
  title: string;
  nickname: string;
  likes: number;
  dislikes: number;
}

const BoardItem: React.FunctionComponent = () => {
  const post: Post = {
    title: "타이틀1",
    nickname: "글쓴이",
    likes: 5,
    dislikes: 1,
  };

  return (
    <div className="flex flex-row w-full h-[100px]">
      <div className="flex flex-col"></div>
      <div></div>
    </div>
  );
};

export default BoardItem;
