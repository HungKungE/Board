import React, { useEffect, useState } from "react";
import { useLogin } from "../../State/userinfo";
import { useNavigate } from "react-router-dom";
import Board from "../Board/Board";
import Profile from "../Profile/Profile";
import UpdatePassword from "../User/UpdatePassword";

enum MENU {
  BOARD,
  PROFILE,
  UPDATE_PASSWORD,
}

const Home: React.FunctionComponent = () => {
  const loginState = useLogin();
  const navigate = useNavigate();
  const [currentMenu, setMenu] = useState<MENU>(MENU.BOARD);

  useEffect(() => {
    if (!loginState.isLogin) {
      navigate("/");
    }
  });

  const renderSelectedMenu = () => {
    switch (currentMenu) {
      case MENU.BOARD:
        return <Board />;
      case MENU.PROFILE:
        return (
          <Profile
            setCurrentMenu={() => {
              setMenu(MENU.UPDATE_PASSWORD);
            }}
          ></Profile>
        );
      case MENU.UPDATE_PASSWORD:
        return <UpdatePassword></UpdatePassword>;
      default:
        return <React.Fragment></React.Fragment>;
    }
  };

  const myIconMenuColor = () => {
    switch (currentMenu) {
      case MENU.BOARD:
        return "";
      default:
        return "#FFFFFF";
    }
  };

  const profileMenuColor = () => {
    switch (currentMenu) {
      case MENU.PROFILE:
        return "";
      default:
        return "#FFFFFF";
    }
  };

  const menuStyle =
    "w-full border-solid border-t-2 border-l-2 border-r-2 border-white border-opacity-20 rounded-t-[10px] text-center py-[10px] hover:cursor-pointer";

  return (
    <div className="relative flex flex-col w-[1200px] h-[1200px] bg-transparent">
      <div className="flex flex-row w-full">
        <div
          className={menuStyle}
          style={{ backgroundColor: myIconMenuColor() }}
          onClick={() => {
            setMenu(MENU.BOARD);
          }}
        >
          게시글 목록
        </div>
        <div
          className={menuStyle}
          style={{ backgroundColor: profileMenuColor() }}
          onClick={() => {
            setMenu(MENU.PROFILE);
          }}
        >
          내 정보
        </div>
      </div>
      <div
        className="flex flex-row w-full h-full justify-center items-center rounded-b-[20px] border-solid border-b-2 border-l-2 border-r-2 border-white border-opacity-20"
        style={{ backdropFilter: "blur(8px)" }}
      >
        {renderSelectedMenu()}
      </div>
    </div>
  );
};

export default Home;
