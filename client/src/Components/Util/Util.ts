const ID_REG = new RegExp("^[a-zA-Z\\d가-힣]{3,20}$");
const PSWORD_REG = new RegExp("^[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,24}$");

export const checkId = (id: string) => {
  return ID_REG.test(id) && typeof id !== "undefined";
};

export const checkPassword = (psword: string) => {
  return PSWORD_REG.test(psword) && typeof psword !== "undefined";
};
