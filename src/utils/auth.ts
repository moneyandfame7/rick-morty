import * as yup from "yup";

export const signupValidationSchema = yup.object({
  email: yup.string().email("Please enter a valid email address").required("Please enter a email address"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be no more than 20 characters long")
    .required("Please enter a password"),
});

export const loginValidationSchema = yup.object({
  email: yup.string().email("Please enter a valid email address").required("Please enter a email address"),
  password: yup.string().required("Please enter a password"),
});
