import { useState } from "react";
import {
  sendPasswordCheckRequest,
  sendUpdatePasswordRequest,
} from "../../API/user";
import { checkPassword } from "../Util/Util";
import { useNavigate } from "react-router-dom";

const UpdatePassword: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    current_password: "",
    new_password: {
      value: "",
      check: "",
    },
  });

  const [passwordChecked, setPasswordChecked] = useState<boolean>(false);

  const btnStyle =
    "border border-white border-opacity-20 font-pretendardBold w-full m-[30px] px-4 py-2 rounded-[15px] text-white";
  const inputStyle =
    "rounded-xl border p-4 w-full my-[10px] bg-transparent  border-white text-white  placeholder-white hover:cursor-pointer";

  const Update = () => {
    if (userData.new_password.value !== userData.new_password.check) {
      console.log("비밀번호가 다름!");
      return;
    }

    if (!checkPassword(userData.new_password.value)) {
      console.log("비밀번호 정책 위반!");
      return;
    }

    sendUpdatePasswordRequest(userData.new_password.value).then((res) => {
      if (!res.success) {
        console.log(res.error);
        return;
      }
      console.log("변경 완료!");
      navigate("/home");
    });
  };

  return (
    <div
      className="relative w-full h-full flex flex-row bg-transparent rounded-[20px] border-solid border-2 border-white border-opacity-20"
      style={{ backdropFilter: "blur(8px)" }}
    >
      <div
        className="absolute top-0 left-[50%] -translate-x-[50%] text-[3em] font-pretendardBold justify-center text-white my-[30px] text-start"
        style={{ fontWeight: "bold" }}
      >
        비밀번호 수정
      </div>
      <div className="flex flex-col w-full justify-center items-center px-[30px]">
        <div className="flex flex-row w-full gap-4">
          <input
            className={inputStyle}
            value={userData.current_password}
            type="password"
            placeholder="현재 비밀번호"
            onChange={(e) => {
              setUserData({ ...userData, current_password: e.target.value });
            }}
          />
          <button
            className="w-[100px] px-[10px] my-[10px] rounded-[15px] bg-slate-500 text-white"
            onClick={() => {
              if (!checkPassword(userData.current_password)) {
                console.log("비밀번호 정책 위반!");
                return;
              }

              sendPasswordCheckRequest(userData.current_password).then(
                (res) => {
                  if (!res.success) {
                    console.log(res.error);
                    return;
                  }
                  setPasswordChecked(res.success);
                }
              );
            }}
          >
            중복확인
          </button>
        </div>
        <input
          className={inputStyle}
          type="password"
          value={userData.new_password.value}
          placeholder="새 비밀번호"
          onChange={(e) => {
            setUserData({
              ...userData,
              new_password: { ...userData.new_password, value: e.target.value },
            });
          }}
        />
        <input
          className={inputStyle}
          type="password"
          value={userData.new_password.check}
          placeholder="새 비밀번호 확인"
          onChange={(e) => {
            setUserData({
              ...userData,
              new_password: { ...userData.new_password, check: e.target.value },
            });
          }}
        />
      </div>
      <div className="absolute bottom-0 w-full h-fit flex flex-row">
        <button
          className={btnStyle}
          disabled={!passwordChecked}
          onClick={() => {
            Update();
          }}
        >
          수정하기
        </button>
      </div>
    </div>
  );
};

export default UpdatePassword;
