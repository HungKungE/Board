export const isLoginSessionExpired = (loginTime: Date): boolean => {
  const newLoginTime = new Date(loginTime);
  const currentTime = new Date();
  const oneHour = 60 * 60 * 1000;

  const timeDifference = currentTime.getTime() - newLoginTime.getTime();

  return timeDifference >= oneHour;
};
