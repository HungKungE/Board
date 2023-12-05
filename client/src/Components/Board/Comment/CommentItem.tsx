import { CommentData } from "../../../../../server/src/entity/post";

export interface CommentItemProps {
  addLikes: (commentId: number) => void;
  addDislikes: (commentId: number) => void;
  commentData: CommentData;
}

const CommentItem: React.FunctionComponent<CommentItemProps> = ({
  commentData,
  addLikes,
  addDislikes,
}) => {
  const createTime: Date = new Date(commentData.create_time);

  return (
    <div className="flex flex-row w-full border-2">
      <div className="flex flex-col w-[70%]">
        <div className="flex flex-row gap-1">
          <div className="font-bold">{commentData.nickname}</div>
          <div>{createTime.toISOString()}</div>
        </div>
        <div className="flex h-full items-center">{commentData.content}</div>
      </div>
      <div className="flex flex-col w-[30%]">
        <div
          className="flex border-2 rounded-sm p-1"
          onClick={() => {
            addLikes(commentData.comment_id);
          }}
        >
          좋아요 : {commentData.likes}
        </div>
        <div
          className="flex border-2 rounded-sm p-1"
          onClick={() => {
            addDislikes(commentData.comment_id);
          }}
        >
          싫어요 : {commentData.dislikes}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
