import { Form, Formik } from "formik";
import React from "react";
import FormInput from "../components/sign-up/Input";
import TextArea from "../components/TextArea";

const CreateListing = () => {
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
          discountPrice: 1,
        }}
        onSubmit={(values) => console.log(values)}
      >
        <Form className="flex gap-3 flex-col sm:flex-row">
          <div className="flex-1 flex flex-col gap-3">
            <FormInput name="name" placeholder="Name" type="text" />
            <TextArea name="description" placeholder="Description" />
            <FormInput name="address" placeholder="Address" type="text" />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2 text-lg">
                <FormInput name="type" type="radio" values="sell" />
                Sell
              </div>
              <div className="flex gap-2 text-lg">
                <FormInput name="type" type="radio" values="rent" />
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
                <FormInput name="offer" placeholder="Price" type="checkbox" />
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
              <div className="flex items-center gap-3">
                <FormInput name="discountPrice" type="number" />
                <div className="flex flex-col items-center">
                  <p>Discount Price</p>
                  <p className="text-sm">($ / month)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <p>
              <span className="font-semibold">Image: </span>The first image will
              be the cover (max 6)
            </p>
            <div className="flex gap-3 flex-row sm:flex-col md:flex-row">
              <label className="flex-1 flex p-3 gap-2 border items-center">
                <input type="file" hidden />
                <button className="bg-gray-300 p-2 border rounded-md">
                  Choose file
                </button>
                <p>Choose your file</p>
              </label>
              <button className="bg-slate-700 text-white py-1 px-3 rounded-lg font-bold hover:opacity-95">
                Upload
              </button>
            </div>

            <button
              className="p-3 bg-slate-700 text-white rounded-lg font-bold hover:opacity-95"
              type="submit"
            >
              Create List
            </button>
          </div>
        </Form>
      </Formik>
    </main>
  );
};

export default CreateListing;
