import { PostHeader } from "../../../../server/src/db/entity/post";

export interface BoardItemProps {
  boardItem: PostHeader;
}

const BoardItem: React.FunctionComponent<BoardItemProps> = ({ boardItem }) => {
  return (
    <div className="flex flex-row w-full h-[100px]">
      <div className="flex flex-col w-[70%]">
        <div>{boardItem.title}</div>
        <div className="flex flex-row gap-1">
          <div>{boardItem.nickname}</div>
          <div>{boardItem.create_time.toISOString()}</div>
        </div>
      </div>
      <div className="flex flex-col w-[30%]">
        <div>좋아요 : {boardItem.likes}</div>
        <div>싫어요 : {boardItem.dislikes}</div>
      </div>
    </div>
  );
};

export default BoardItem;
