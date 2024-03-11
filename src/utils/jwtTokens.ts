import Cookies from "js-cookie";

export const setJWTToken = (access: string) => {
  Cookies.set("access_token", access);
};

export const getAccessToken = () => {
  return Cookies.get("access_token");
};

export const handleLogout = () => {
  Cookies.remove("access_token");
};
