const checkNicknameChars = new RegExp("^[a-zA-Z\\d가-힣]{3,20}$");
const checkPasswordChars = new RegExp("^[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,24}$");

export const isValidNickname = (nickname: string): boolean => {
  return checkNicknameChars.test(nickname) && typeof nickname !== "undefined";
};

export const isValidPassword = (password: string): boolean => {
  return checkPasswordChars.test(password) && typeof password !== "undefined";
};
