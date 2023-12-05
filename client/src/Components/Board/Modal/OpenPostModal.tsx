import { useEffect, useState } from "react";
import { CommentData, PostData } from "../../../../../server/src/entity/post";
import { isDevMode } from "../../../Utils/detectMode";
import CommentItem from "../Comment/CommentItem";
import { preCommentList } from "../../../Mock/mockedComment";
import {
  CommentRequest,
  sendCreateCommentRequest,
  sendGetCommentDatasRequest,
} from "../../../API/post";

interface OpenPostMoalProps {
  postData: PostData;
  closeModal: () => void;
}

const OpenPostModal: React.FunctionComponent<OpenPostMoalProps> = ({
  postData,
  closeModal,
}) => {
  const createTime: Date = new Date(postData.postHeader.create_time);
  const postId: number = postData.postHeader.post_id;
  const [doFetch, setDoFetch] = useState<boolean>(false);
  const [commentDatas, setCommentDatas] = useState<CommentData[]>([]);
  const [uploadComment, setUploadComment] = useState<CommentRequest>({
    post_id: postData.postHeader.post_id,
    content: "",
  });

  const fetchCommentData = () => {
    if (!doFetch || !commentDatas.length) {
      return (
        <div className="flex h-[40%] items-center justify-center text-2xl text-gray-500">
          아직 댓글이 없어요!
        </div>
      );
    } else {
      return commentDatas.map((commentData) => {
        return (
          <CommentItem
            addLikes={(comment_id: number) => {}}
            addDislikes={(comment_id: number) => {}}
            commentData={commentData}
          ></CommentItem>
        );
      });
    }
  };

  useEffect(() => {
    if (doFetch) {
      return;
    }

    if (isDevMode()) {
      /* mock Data 채우기 */
      setCommentDatas(preCommentList);
    } else {
      /* 실제 data 채우기 */
      sendGetCommentDatasRequest(postId).then((res) => {
        if (res.error) {
          console.log(res.error);
          return;
        }

        setCommentDatas(res.commentDatas);
      });
    }

    setDoFetch(true);
  }, [doFetch, postId]);

  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[800px] h-[800px] bg-white rounded-xl flex flex-col items-center">
      <div className="w-full h-[60px] text-center relative flex flex-row justify-center border-b-2 p-[10px]">
        <div
          className="font-extralight flex items-center"
          style={{ fontWeight: 800 }}
        >
          {postData.postHeader.title}
        </div>
        <button
          className="absolute right-5 rounded-xl bg-red-500 text-white px-[10px] py-[5px]"
          onClick={() => {
            closeModal();
          }}
          style={{ fontWeight: 800 }}
        >
          닫기
        </button>
      </div>
      <div className="w-full h-full flex flex-col gap-[10px] p-[10px]">
        <div className="flex flex-row">
          <div className="flex flex-col w-[60%]">
            <div className="flex flex-row gap-2 pt-[10px] items-center">
              <div className="font-extralight text-center">글쓴이</div>
              <div className="border-2 px-[10px] py-[5px]">
                {postData.postHeader.nickname}
              </div>
            </div>
            <div className="flex flex-row gap-2 pt-[10px] items-center">
              <div className="font-extralight text-center">글 쓴 시간</div>
              <div className="border-2 px-[10px] py-[5px]">
                {createTime.toISOString()}
              </div>
            </div>
          </div>
          <div className="flex flex-row w-[40%]">
            <button className="flex flex-col w-full h-full text-center justify-center items-center rounded-sm border-2 bg-red-400">
              <div className="text-[50px] h-full flex text-center justify-center items-center">
                {postData.postHeader.likes}
              </div>
              <div>{"좋아요"}</div>
            </button>
            <button className="flex flex-col w-full h-full text-center justify-center items-center rounded-sm border-2 bg-blue-400">
              <div className="text-[50px] h-full flex text-center justify-center items-center">
                {postData.postHeader.dislikes}
              </div>
              <div>{"싫어요"}</div>
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full h-[50%] gap-2 pt-[10px] items-center">
          <div className="w-full h-full border-4 px-[10px] py-[5px]">
            {postData.content}
          </div>
        </div>
        <div className="flex flex-row w-full h-[10%] pt-[10px] items-center">
          <input
            className="border-2 w-[70%] px-[10px] py-[5px]"
            value={uploadComment.content}
            onChange={(e) => {
              setUploadComment({
                ...uploadComment,
                content: e.target.value,
              });
            }}
          />
          <button
            className="border-2 w-[30%] px-[10px] py-[5px]"
            onClick={() => {
              if (isDevMode()) {
                return;
              }

              if (!uploadComment.content.length) {
                return;
              }

              sendCreateCommentRequest(uploadComment).then((res) => {
                if (res.error) {
                  console.log(res.error);
                  return;
                }
              });

              setDoFetch(false);
            }}
          >
            댓글달기
          </button>
        </div>
        <div className="flex flex-col w-full h-[40%] gap-2 pt-[10px] items-center overflow-y-scroll">
          {fetchCommentData()}
        </div>
      </div>
    </div>
  );
};

export default OpenPostModal;
