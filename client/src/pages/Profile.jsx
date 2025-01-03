import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../components/sign-up/Input";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { signInSuccess } from "../redux/user/userSlice";

const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSubmitForm = async (values) => {
    console.log(values);
  };
  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/user/change-avatar", {
        method: "post",
        body: formData,
        credentials: "same-origin",
      });
      const data = await res.json();
      dispatch(signInSuccess(data.user));
    }
    return;
  };
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-center font-semibold text-3xl my-7">Profile</h1>
      <div className="flex justify-center mb-7 relative w-32 h-32 rounded-lg mx-auto group">
        <img
          className="rounded-full absolute w-full h-full object-cover"
          alt="avatar"
          src={currentUser.avatar}
        />
        <div className="w-full h-full rounded-full bg-black opacity-30 z-10 hidden group-hover:flex items-center justify-center">
          <p className="font-bold text-4xl text-white">+</p>
        </div>
        <input
          type="file"
          className="absolute inset-0 z-20 opacity-0 group-hover:cursor-pointer"
          accept="image/*"
          name="image"
          onChange={handleChangeImage}
        ></input>
      </div>
      <Formik
        initialValues={{
          username: currentUser.username,
          email: currentUser.email,
        }}
        validationSchema={schema}
        onSubmit={handleSubmitForm}
      >
        <Form className="flex flex-col gap-4">
          <FormInput name="username" placeholder="Username" />
          <FormInput name="email" placeholder="Email" />
          <button
            className="bg-slate-700 text-white p-3 rounded-lg font-bold hover:opacity-95"
            type="submit"
          >
            Update profile
          </button>
        </Form>
      </Formik>
      <div className="flex justify-between mt-3">
        <p className="text-red-500 font-semibold">Delete account</p>
        <p className="text-red-500 font-semibold">Log out</p>
      </div>
    </div>
  );
};

export default Profile;
