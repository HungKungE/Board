import { useRef, useState } from "react";
import {
  CreateEmoticon,
  sendCreateEmoticonRequest,
} from "../../../API/emoticon";

interface UploadIconsModalProps {
  closeModal: () => void;
}

const UploadIconsModal: React.FunctionComponent<UploadIconsModalProps> = ({
  closeModal,
}) => {
  const [uploadEmoticonData, setUploadEmoticonData] = useState<CreateEmoticon>({
    emoticonName: "",
    singleImage: null,
    multiImages: [],
  });

  const mainPictureRef = useRef<HTMLInputElement | null>(null);
  const IconItemsRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (files: FileList) => {
    const fileType = files[0].name
      .split(".")
      .slice(-1)
      .toString()
      .toLocaleUpperCase();

    if (fileType !== "JPG" && fileType !== "PNG" && fileType !== "JPEG") {
      alert("지원하지 않는 파일 포멧입니다!");
      return;
    }

    setUploadEmoticonData({ ...uploadEmoticonData, singleImage: files[0] });
  };

  const handleFiles = (files: FileList) => {
    const fileList: Set<File> = new Set();

    for (let i = 0; i < files.length; i++) {
      const fileType = files[i].name
        .split(".")
        .slice(-1)
        .toString()
        .toLocaleUpperCase();
      if (fileType !== "JPG" && fileType !== "PNG" && fileType !== "JPEG") {
        alert("지원하지 않는 파일 포멧입니다!");
        return;
      }
      fileList.add(files[i]);
    }

    setUploadEmoticonData({
      ...uploadEmoticonData,
      multiImages: [...uploadEmoticonData.multiImages, ...Array.from(fileList)],
    });
  };

  const mainPictureInputClick = () => {
    if (mainPictureRef.current) {
      mainPictureRef.current.click();
    }
  };

  const iconItemsInputClick = () => {
    if (IconItemsRef.current) {
      IconItemsRef.current.click();
    }
  };

  const UploadIcons = () => {
    if (
      !uploadEmoticonData.emoticonName.length ||
      !uploadEmoticonData.singleImage ||
      !uploadEmoticonData.multiImages.length
    ) {
      return;
    }

    sendCreateEmoticonRequest(uploadEmoticonData).then((res) => {
      console.log(res);
      closeModal();
    });
    /* 업로드 하는 api 추가 */
    /* 업로드 끝나면 closeModal */
  };

  const renderUploadedFile = () => {
    if (!uploadEmoticonData.singleImage) {
      return (
        <div
          className="border-2 w-[200px] h-[200px] text-center flex justify-center items-center hover:cursor-pointer"
          onClick={() => {
            mainPictureInputClick();
          }}
        >
          사진 추가하기
        </div>
      );
    } else {
      return (
        <div
          className="border-2 rounded-xl"
          onClick={() => {
            mainPictureInputClick();
          }}
        >
          <img
            className="rounded-xl"
            src={URL.createObjectURL(uploadEmoticonData.singleImage)}
            alt="Preview"
            style={{ width: "200px", height: "200px" }}
          />
        </div>
      );
    }
  };

  const renderUploadedFiles = () => {
    if (!uploadEmoticonData.multiImages.length) {
      return (
        <div
          className="border-2 px-[10px] py-[5px] flex justify-center items-center text-center w-full h-full hover:cursor-pointer"
          onClick={() => {
            iconItemsInputClick();
          }}
        >
          사진들 추가하기
        </div>
      );
    } else {
      return (
        <div className="w-full h-[348px] grid grid-cols-3 gap-[10px] overflow-auto">
          {uploadEmoticonData.multiImages.map((icon_item, index) => {
            return (
              <div className="relative w-[200px] h-[200px]">
                <img
                  src={URL.createObjectURL(icon_item)}
                  alt="Preview"
                  style={{ width: "200px", height: "200px" }}
                />
                <div
                  className="absolute top-[5px] right-[5px] text-red-500 border-2 border-red-500 px-[5px] hover:cursor-pointer bg-white"
                  onClick={() => {
                    uploadEmoticonData.multiImages.splice(index, 1);
                    setUploadEmoticonData({ ...uploadEmoticonData });
                  }}
                >
                  x
                </div>
              </div>
            );
          })}
          <div
            className="w-[200px] h-[200px] flex justify-center items-center"
            onClick={() => {
              iconItemsInputClick();
            }}
          >
            이미지 추가하기
          </div>
        </div>
      );
    }
  };

  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[800px] h-[800px] bg-white rounded-xl flex flex-col items-center">
      <div className="w-full h-[60px] text-center relative flex flex-row justify-center border-b-2 p-[10px]">
        <button
          className="absolute left-5 rounded-xl bg-blue-500 text-white px-[10px] py-[5px]"
          style={{ fontWeight: 800 }}
          onClick={() => {
            UploadIcons();
          }}
        >
          업로드
        </button>
        <div
          className="font-extralight flex items-center"
          style={{ fontWeight: 800 }}
        >
          이모티콘 업로드하기
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
          <div className="font-extralight text-center">이모티콘 이름 :</div>
          <input
            className="border-2 px-[10px] py-[5px]"
            value={uploadEmoticonData.emoticonName}
            onChange={(e) => {
              setUploadEmoticonData({
                ...uploadEmoticonData,
                emoticonName: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex flex-row gap-2 pt-[10px] items-center">
          <div className="font-extralight text-center">
            이모티콘 대표 사진 :
          </div>
          {renderUploadedFile()}
          <input
            className="invisible w-[0px] h-[0px]"
            type="file"
            accept=".jpg, .png"
            ref={mainPictureRef}
            onChange={(e) => {
              handleFile(e.target.files!);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 pt-[10px]">
          <div className="font-extralight">업로드할 이모티콘들</div>
          <div className="w-full h-full border-2 p-[10px]">
            {renderUploadedFiles()}
            <input
              className="invisible w-[0px] h-[0px]"
              type="file"
              multiple
              accept=".jpg, .png"
              ref={IconItemsRef}
              onChange={(e) => {
                handleFiles(e.target.files!);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadIconsModal;
