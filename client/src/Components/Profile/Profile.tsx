import { useNavigate } from "react-router-dom";
import { sendLogOutRequest } from "../../API/auth";
import { useLogin } from "../../State/userinfo";
import Mococo from "../../Icons/Imgs/mococo.jpg";
import { isDevMode } from "../../Utils/detectMode";

interface ProfileProps {
  setCurrentMenu: () => void;
}

const Profile: React.FunctionComponent<ProfileProps> = ({ setCurrentMenu }) => {
  const loginState = useLogin();
  const navigate = useNavigate();

  const LogOut = () => {
    if (isDevMode()) {
      loginState.setInitialize();
      navigate("/");
    } else {
      sendLogOutRequest().then(() => {
        loginState.setInitialize();
        navigate("/");
      });
    }
  };

  return (
    <div className="flex flex-col w-full h-full px-[10px] py-[20px] justify-center items-center gap-4">
      <div className="w-[500px] h-fit flex flex-row border-2 rounded-xl border-white p-[10px]">
        <div className="w-full h-full flex flex-col justify-center items-center gap-10">
          <div className="flex flex-row justify-center items-center">
            <p>Username:</p>
            <p>{loginState.id}</p>
          </div>
          <div className="flex flex-row justify-center items-center">
            <p>email:</p>
            <p>{loginState.email}</p>
          </div>
        </div>
        <div className="w-[200px] h-[150px]">
          <img
            className="w-full h-full rounded-xl"
            alt="profile_image"
            src={Mococo}
          ></img>
        </div>
      </div>
      <button
        className="w-[500px] h-fit border border-white font-pretendardBold py-2 rounded-[15px] text-white"
        onClick={() => {
          LogOut();
        }}
      >
        로그아웃
      </button>
      <button
        className="w-[500px] h-fit border border-white font-pretendardBold py-2 rounded-[15px] text-white"
        onClick={() => {
          setCurrentMenu();
        }}
      >
        비밀번호 수정
      </button>
    </div>
  );
};

export default Profile;
