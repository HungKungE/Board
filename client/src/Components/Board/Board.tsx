import { useEffect, useState } from "react";
import PlusIcon from "../../Icons/Imgs/plus-svgrepo-com (2).svg";
import UploadIconsModal from "./Modal/UploadIconsModal";

const Board: React.FunctionComponent = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (openModal) {
      return;
    }
  }, [openModal]);

  return (
    <div className="flex flex-col w-full h-full px-[30px] py-[20px] items-center">
      {openModal && (
        <UploadIconsModal
          closeModal={() => {
            setOpenModal(false);
          }}
        ></UploadIconsModal>
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
        {/* 이모티콘 사진들 */}
      </div>
    </div>
  );
};

export default Board;
