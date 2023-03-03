import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signupValidationSchema } from "../utils/auth";
import { AuthCredentials, AuthResponse } from "../interfaces/auth";
import { useSignupMutation } from "../redux/services/auth";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/slices/user.slice";

export const useSignup = () => {
  const navigate = useNavigate();
  const [signupCredentials, setSignupCredentials] = useState<AuthResponse>();
  const [error, setError] = useState<FetchBaseQueryError | SerializedError>();
  const dispatch = useAppDispatch();

  const [signup, { isSuccess, isLoading }] = useSignupMutation();

  const handleSignup = async (values: AuthCredentials) => {
    const info = await signup(values);
    if ("data" in info) {
      setSignupCredentials(info.data);
      return;
    }
    setError(info.error);
  };
  const onSubmit = async (values: AuthCredentials) => {
    await handleSignup(values);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: true,
    validationSchema: signupValidationSchema,
    onSubmit,
  });
  useEffect(() => {
    if (isSuccess) {
      navigate("/welcome");
      if (signupCredentials) {
        dispatch(setUser(signupCredentials.user));
      }
    }
  }, [isSuccess, signupCredentials]);

  return { signupCredentials, error, formik, isLoading, isSuccess };
};
