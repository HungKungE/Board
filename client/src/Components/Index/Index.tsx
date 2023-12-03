import { useState } from "react";
import SignUp from "../User/SignUp";
import SignIn from "../User/LogIn";

export enum PAGE_TYPE {
  SIGNIN,
  SIGNUP,
}

const Index: React.FunctionComponent = () => {
  const [pageType, setPageType] = useState<PAGE_TYPE>(PAGE_TYPE.SIGNIN);

  const renderSignPage = () => {
    switch (pageType) {
      case PAGE_TYPE.SIGNUP:
        return <SignUp setPageType={setPageType} />;
      case PAGE_TYPE.SIGNIN:
        return <SignIn setPageType={setPageType} />;
    }
  };

  return (
    <div className="w-[600px] h-[600px] flex flex-row rounded-[10px]">
      {renderSignPage()}
    </div>
  );
};

export default Index;
