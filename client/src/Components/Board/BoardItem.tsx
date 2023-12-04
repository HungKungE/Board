import { PostHeader } from "../../../../server/src/db/entity/post";

export interface BoardItemProps {
  onClick: (postId: number) => void;
  boardItem: PostHeader;
}

const BoardItem: React.FunctionComponent<BoardItemProps> = ({
  boardItem,
  onClick,
}) => {
  const createTime: Date = new Date(boardItem.create_time);

  return (
    <div className="flex flex-row w-full h-[100px]">
      <div className="flex flex-col w-[70%]">
        <div
          className="cursor-pointer"
          onClick={() => {
            onClick(boardItem.post_id);
          }}
        >
          {boardItem.title}
        </div>
        <div className="flex flex-row gap-1">
          <div>{boardItem.nickname}</div>
          <div>{createTime.toISOString()}</div>
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
