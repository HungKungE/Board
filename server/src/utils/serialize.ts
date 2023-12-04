import crypto from "crypto";

export const serializePassword = async (
  nickname: string,
  password: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, nickname, 9999, 64, "sha512", (err, key) => {
      if (err) {
        reject(err);
      }
      resolve(key.toString("base64"));
    });
  });
};
