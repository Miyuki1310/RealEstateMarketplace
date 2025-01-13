import { Form, Formik } from "formik";
import React from "react";
import FormInput from "../components/sign-up/Input";
import TextArea from "../components/TextArea";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import RadioInput from "../components/RadioInput";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  address: Yup.string().required("Address is required"),
  type: Yup.string().required("Type is required"),
  regularPrice: Yup.number()
    .required("Regular price is required")
    .min(1, "Regular price must be a positive number"),
  discountPrice: Yup.number().min(
    0,
    "Discount price must be a positive number"
  ),
});

const CreateListing = () => {
  const [files, setFiles] = React.useState([]);
  const [formData, setFormData] = React.useState({
    imageUrls: [],
  });
  const [error, setError] = React.useState("");
  const [uploading, setUploading] = React.useState(false);
  const [success, setSuccess] = React.useState("");
  const [offer, setOffer] = React.useState(false);
  const navigate = useNavigate();
  const handleImageSubmit = () => {
    setUploading(true);
    if (files.length > 0 && files.length <= 6) {
      const promise = [];
      for (let i = 0; i < files.length; i++) {
        promise.push(storeImage(files[i]));
      }
      Promise.all(promise)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setUploading(false);
        })
        .catch((error) => {
          setError("Image upload failed");
          console.log(error);

          setUploading(false);
        });
    } else {
      setError("Please upload between 1 and 6 images");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleSubmitForm = async (values) => {
    if (formData.imageUrls.length === 0)
      return setError("Please upload at least 1 image");
    const data = { ...formData, ...values };
    console.log(data);

    const response = await fetch("/api/listing/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    if (response.status !== 201) {
      setError(resData.message);
      return;
    }
    setError("");
    setSuccess("Create listing successfully");
    setTimeout(() => {
      navigate("/listing/" + resData.listing._id);
    }, 2000);
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  console.log(offer);

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-center font-semibold text-3xl my-7">
        Create Listing
      </h1>
      <Formik
        initialValues={{
          name: "",
          description: "",
          address: "",
          type: "sell",
          parking: false,
          furnished: false,
          offer: false,
          bedroom: 1,
          baths: 1,
          regularPrice: 1,
          discountPrice: offer ? 1 : 0,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
      >
        <Form className="flex gap-3 flex-col sm:flex-row">
          <div className="flex-1 flex flex-col gap-3">
            <FormInput name="name" placeholder="Name" type="text" />
            <TextArea name="description" placeholder="Description" />
            <FormInput name="address" placeholder="Address" type="text" />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2 text-lg">
                <RadioInput name="type" values="sell" />
                Sell
              </div>
              <div className="flex gap-2 text-lg">
                <RadioInput name="type" values="rent" />
                Rent
              </div>
              <div className="flex gap-2 text-lg">
                <FormInput name="parking" placeholder="Price" type="checkbox" />
                Parking spot
              </div>
              <div className="flex gap-2 text-lg">
                <FormInput
                  name="furnished"
                  placeholder="Price"
                  type="checkbox"
                />
                Furnished
              </div>
              <div className="flex gap-2 text-lg">
                <FormInput
                  name="offer"
                  placeholder="Price"
                  type="checkbox"
                  onClick={() => {
                    setOffer(!offer);
                  }}
                />
                Offer
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex gap-3 items-center">
                <FormInput name="bedroom" type="number" />
                <p>Beds</p>
              </div>
              <div className="flex gap-3 items-center">
                <FormInput name="baths" type="number" />
                <p>Baths</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <FormInput name="regularPrice" type="number" />
                <div className="flex flex-col items-center">
                  <p>Regular Price</p>
                  <p className="text-sm">($ / month)</p>
                </div>
              </div>
              {offer && (
                <div className="flex items-center gap-3">
                  <FormInput name="discountPrice" type="number" />
                  <div className="flex flex-col items-center">
                    <p>Discount Price</p>
                    <p className="text-sm">($ / month)</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <p>
              <span className="font-semibold">Image: </span>The first image will
              be the cover (max 6)
            </p>
            <div className="flex gap-3 flex-row sm:flex-col md:flex-row">
              <label
                htmlFor="uploadImages"
                className="flex-1 flex p-3 gap-2 border items-center"
              >
                <input
                  id="uploadImages"
                  type="file"
                  onChange={(e) => {
                    setFiles(e.target.files);
                  }}
                  multiple
                  hidden
                  accept="image/*"
                />
                <p className="bg-gray-300 p-2 border rounded-md">Choose file</p>
                <p>
                  {files.length > 0
                    ? files.length + " image are ready"
                    : "Empty"}
                </p>
              </label>
              <button
                type="button"
                className={`bg-slate-700 text-white py-1 px-3 rounded-lg font-bold hover:opacity-95 ${
                  uploading && "opacity-50 hover:opacity-50 cursor-not-allowed"
                }`}
                disabled={uploading}
                onClick={handleImageSubmit}
              >
                Upload
              </button>
            </div>

            <button
              className="p-3 bg-slate-700 text-white rounded-lg font-bold hover:opacity-95"
              type="submit"
            >
              Create List
            </button>
            {success && <p className="text-green-600">{success}</p>}
            {error && <p className="text-red-600">{error}</p>}
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => {
                return (
                  <div
                    key={url}
                    className="flex justify-between p-3 border mb-2 rounded-lg items-center"
                  >
                    <img
                      src={url}
                      alt=""
                      className="w-20 h-20 object-contain rounded-lg"
                    />
                    <button
                      className="p-3 bg-red-600 text-white font-bold rounded-lg hover:opacity-95"
                      onClick={() => handleRemoveImage(index)}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
          </div>
        </Form>
      </Formik>
    </main>
  );
};

export default CreateListing;
