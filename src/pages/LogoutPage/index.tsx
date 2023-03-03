import { FC, useEffect } from "react";
import { useLogoutMutation } from "../../redux/services/auth";
import { useNavigate } from "react-router-dom";

export const LogoutPage: FC = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const data = await logout();
      navigate("/login");
    })();
  }, []);
  return <></>;
};
