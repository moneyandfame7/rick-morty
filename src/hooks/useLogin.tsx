import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginValidationSchema } from "../utils/auth";
import { AuthCredentials } from "../interfaces/auth";
import { useLoginMutation } from "../redux/services/auth";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/slices/user.slice";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { isSuccess, isLoading }] = useLoginMutation();

  const handleLogin = async (values: AuthCredentials) => {
    const info = await login(values);
    if ("data" in info) {
      dispatch(setUser(info.data.user));

      return;
    }
    console.log(info.error);
  };
  const onSubmit = async (values: AuthCredentials) => {
    await handleLogin(values);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: true,
    validationSchema: loginValidationSchema,
    onSubmit,
  });
  useEffect(() => {
    console.log("useLogin Hook");
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  return { formik, isLoading, isSuccess };
};
