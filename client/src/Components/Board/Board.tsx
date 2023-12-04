import { useEffect, useState } from "react";
import PlusIcon from "../../Icons/Imgs/plus-svgrepo-com (2).svg";
import BoardItem from "./BoardItem";
import { isDevMode } from "../../Utils/detectMode";
import { prePostList } from "../../Mock/mockedPost";
import { sendGetPostHeadersRequest } from "../../API/post";
import { PostHeader } from "../../../../server/src/db/entity/post";
import UploadPostModal from "./Modal/UploadPostModal";

const Board: React.FunctionComponent = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [doFetch, setDoFetch] = useState<boolean>(false);

  const [boardItems, setBoardItems] = useState<PostHeader[]>([]);

  useEffect(() => {
    if (openModal) {
      return;
    }
  }, [openModal]);

  useEffect(() => {
    if (isDevMode()) {
      if (doFetch) {
        return;
      }

      setBoardItems(prePostList);
      setDoFetch(true);
    } else {
      sendGetPostHeadersRequest().then((res) => {
        if (!res.success) {
          console.log(res.error);
          return;
        }
        setBoardItems(res.postHeaders);
        setDoFetch(true);
      });
    }
  }, [doFetch]);

  return (
    <div className="flex flex-col w-full h-full px-[30px] py-[20px] items-center">
      {openModal && (
        <UploadPostModal
          closeModal={() => {
            setOpenModal(false);
            setDoFetch(false);
          }}
        ></UploadPostModal>
      )}
      <div className="flex flex-row w-full h-[40px] border-solid border-2 border-white border-opacity-20">
        <div className="px-[10px] h-full left-0">
          <div
            className="w-[100px] h-full flex flex-row hover:cursor-pointer"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <img className="w-[30px]" alt="plus_icon" src={PlusIcon}></img>
            <p className="flex text-center justify-center items-center">
              글쓰기
            </p>
          </div>
          <div className="w-full h-full">{/* TODO : 이모티콘 종류 */}</div>
        </div>
      </div>
      <div className="w-full h-full rounded-b-xl border-solid border-2 border-white border-opacity-20 p-[20px]">
        {doFetch &&
          boardItems.map((board) => {
            return (
              <BoardItem key={board.post_id} boardItem={board}></BoardItem>
            );
          })}
      </div>
    </div>
  );
};

export default Board;
