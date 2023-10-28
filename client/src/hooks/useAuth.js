import { useEffect, useState } from "react";

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, [token]);

  return {
    token: token,
    isLogin: isLogin,
    setIsLogin,
  };
};

export default useAuth;
