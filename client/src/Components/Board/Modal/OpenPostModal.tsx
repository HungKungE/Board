import { PostData } from "../../../../../server/src/db/entity/post";

interface OpenPostMoalProps {
  postData: PostData;
  closeModal: () => void;
}

const OpenPostModal: React.FunctionComponent<OpenPostMoalProps> = ({
  postData,
  closeModal,
}) => {
  const createTime: Date = new Date(postData.postHeader.create_time);

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
        <div className="flex flex-col w-full h-full gap-2 pt-[10px] items-center">
          <div className="font-extralight text-center">글쓴이 :</div>
          <div className="w-full h-full border-2 px-[10px] py-[5px]">
            {postData.postHeader.nickname}
          </div>
        </div>
        <div className="flex flex-col w-full h-full gap-2 pt-[10px] items-center">
          <div className="font-extralight text-center">글 쓴 시간 :</div>
          <div className="w-full h-full border-2 px-[10px] py-[5px]">
            {createTime.toISOString()}
          </div>
        </div>
        <div className="flex flex-col w-full h-full gap-2 pt-[10px] items-center">
          {postData.content}
        </div>
      </div>
    </div>
  );
};

export default OpenPostModal;
