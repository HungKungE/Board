import { useState } from "react";
import { PostRequest, sendCreatePostRequest } from "../../../API/post";

interface UploadPostMoalProps {
  closeModal: () => void;
}

const UploadPostModal: React.FunctionComponent<UploadPostMoalProps> = ({
  closeModal,
}) => {
  const [uploadPostData, setUploadPostData] = useState<PostRequest>({
    title: "",
    content: "",
  });

  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[800px] h-[800px] bg-white rounded-xl flex flex-col items-center">
      <div className="w-full h-[60px] text-center relative flex flex-row justify-center border-b-2 p-[10px]">
        <button
          className="absolute left-5 rounded-xl bg-blue-500 text-white px-[10px] py-[5px]"
          style={{ fontWeight: 800 }}
          onClick={() => {
            sendCreatePostRequest(uploadPostData).then((res) => {
              if (!res.success) {
                console.log(res.error);
                return;
              }

              closeModal();
            });
          }}
        >
          업로드
        </button>
        <div
          className="font-extralight flex items-center"
          style={{ fontWeight: 800 }}
        >
          글 쓰기
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
        <div className="flex flex-row gap-2 pt-[10px] items-center">
          <div className="font-extralight text-center">글 제목 :</div>
          <input
            className="border-2 px-[10px] py-[5px]"
            value={uploadPostData.title}
            onChange={(e) => {
              setUploadPostData({
                ...uploadPostData,
                title: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex flex-col w-full h-full gap-2 pt-[10px] items-center">
          <div className="font-extralight text-center">글 내용</div>
          <input
            className="w-full h-full border-2 px-[10px] py-[5px]"
            value={uploadPostData.content}
            onChange={(e) => {
              setUploadPostData({
                ...uploadPostData,
                content: e.target.value,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadPostModal;
