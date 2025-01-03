import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../components/sign-up/Input";
import * as Yup from "yup";
import { signInSuccess } from "../redux/user/userSlice";
import { useState } from "react";

const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [success, setSuccess] = useState(null);
  const dispatch = useDispatch();
  const handleSubmitForm = async (values) => {
    const res = await fetch("/api/user/update-user", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    dispatch(signInSuccess(data.user));
    setSuccess(data.message);
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
      console.log(data);

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
          <FormInput
            name="password"
            placeholder="Enter your new password (optional)"
          />
          <FormInput
            name="confirmPassword"
            placeholder="Confirm your new password"
          />
          <button
            className="bg-slate-700 text-white p-3 rounded-lg font-bold hover:opacity-95"
            type="submit"
          >
            Update profile
          </button>
          {success && <p className="text-green-500 font-semibold">{success}</p>}
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
