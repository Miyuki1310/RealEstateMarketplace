import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import FormInput from "../components/sign-up/Input";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleSubmit = async (values) => {
    const res = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (data.message) {
      setError(data.message);
    }
    else {
      navigate("/sign-in");
    }
  };
  return (
    <div className="mx-auto max-w-lg p-4">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-4">
          <FormInput name="username" placeholder="Enter your username" />
          <FormInput name="email" placeholder="Enter your email" />
          <FormInput name="password" placeholder="Enter your password" />
          <FormInput
            name="confirmPassword"
            placeholder="Confirm your password"
          />
          <button className="bg-slate-700 text-white p-3 rounded-lg font-bold hover:opacity-95">
            Sign Up
          </button>
          {error && <div className="text-red-500">{error}</div>}
        </Form>
      </Formik>
      <div className="py-4">
        <Link
          to="/sign-in"
          className="text-slate-700 opacity-80 hover:underline"
        >
          Have an account? Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
