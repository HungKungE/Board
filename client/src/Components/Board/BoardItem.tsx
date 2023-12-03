export interface Post {
  post_id: number;
  title: string;
  nickname: string;
  likes: number;
  dislikes: number;
}

export interface BoardItemProps {
  boardItem: Post;
}

const BoardItem: React.FunctionComponent<BoardItemProps> = ({ boardItem }) => {
  return (
    <div className="flex flex-row w-full h-[100px]">
      <div className="flex flex-col w-[70%]">
        <div>{boardItem.title}</div>
        <div>{boardItem.nickname}</div>
      </div>
      <div className="flex flex-col w-[30%]">
        <div>좋아요 : {boardItem.likes}</div>
        <div>싫어요 : {boardItem.dislikes}</div>
      </div>
    </div>
  );
};

export default BoardItem;
