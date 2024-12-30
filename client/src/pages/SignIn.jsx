import { Form, Formik } from "formik";
import React from "react";
import FormInput from "../components/sign-up/Input";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

const schema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
});

const SignIn = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const handleSubmitForm = async (values) => {
    console.log(values);
    const res = await fetch("api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    if (data) {
      dispatch(signInSuccess(data.user));
    }

  };
  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-center text-3xl font-bold my-8">Sign In</h1>
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmitForm}
      >
        <Form className="flex flex-col gap-4 pt-4">
          <FormInput name="email" placeholder="Enter your email" />
          <FormInput name="password" placeholder="Enter your password" />
          <button className="bg-slate-700 text-white p-3 rounded-lg font-bold hover:opacity-95">
            Sign In
          </button>
        </Form>
      </Formik>
      <Link
        to="/sign-up"
        className="block text-slate-700 opacity-80 hover:underline my-4"
      >
        Do not have an account? Sign up
      </Link>
    </div>
  );
};

export default SignIn;
