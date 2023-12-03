import { StateCreator, create } from "zustand";
import { PersistOptions, persist } from "zustand/middleware";

interface LoginState {
  id: string;
  email: string;
  isLogin: boolean;
  loginTime: Date;
}

interface LoginAction {
  setEmail: (email: string) => void;
  setIsLogin: (isLoggined: boolean) => void;
  setId: (id: string) => void;
  setLoginTime: (login_time: Date) => void;
  setInitialize: () => void;
}

export interface LoginStore extends LoginState, LoginAction {}

export type LoginStatePersist = (
  config: StateCreator<LoginStore>,
  options: PersistOptions<LoginState>
) => StateCreator<LoginStore>;

export const useLogin = create<LoginStore>(
  (persist as LoginStatePersist)(
    (set) => ({
      email: "",
      isLogin: false,
      id: "",
      loginTime: new Date(),
      setEmail: (email) => set((state) => ({ ...state, email: email })),
      setId: (id) => set((state) => ({ ...state, id: id })),
      setIsLogin: (isLogin) => set((state) => ({ ...state, isLogin: isLogin })),
      setLoginTime: (login_time) => {
        set((state) => ({ ...state, loginTime: login_time }));
      },
      setInitialize: () =>
        set((state) => ({
          ...state,
          email: "",
          id: "",
          isLogin: false,
          loginTime: new Date(),
        })),
    }),
    { name: "loginStore" }
  )
);
