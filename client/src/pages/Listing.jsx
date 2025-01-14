import React from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  FaBath,
  FaChair,
  FaLocationDot,
  FaSquareParking,
} from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

const Listing = () => {
  const { listingId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [listing, setListing] = React.useState(null);
  const [chat, setChat] = React.useState(false);

  React.useEffect(() => {
    const fetchListing = async (listingId) => {
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      console.log(data.listing);
      setListing(data.listing);
    };
    fetchListing(listingId);
  }, [listingId]);
  console.log(currentUser._id, listing?.user._id);

  return (
    <div className="">
      {listing && (
        <>
          <Swiper navigation modules={[Navigation]}>
            {listing.image.map((image) => {
              return (
                <SwiperSlide key={image}>
                  <div
                    className="h-[550px]"
                    style={{
                      background: `url(${image}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="max-w-4xl mx-auto my-12 px-4">
            <h1 className="text-2xl font-semibold">
              {listing.name} - ${listing.regularPrice.toLocaleString("en-US")}{" "}
              {listing.type == "rent" ? "/month" : ""}
            </h1>
            <div className="flex gap-2 items-center font-semibold mt-6">
              <FaLocationDot className="text-green-700" />
              <p className="text-slate-600 text-sm">{listing.address}</p>
            </div>
            <div className="flex gap-3 my-3 flex-col sm:flex-row items-stretch">
              <p className="text-center p-1 bg-red-700 rounded-lg text-white font-semibold sm:max-w-48 sm:w-full">
                For Sale
              </p>
              <p className="text-center p-1 bg-green-900 rounded-lg text-white font-semibold sm:max-w-48 sm:w-full">
                ${listing.discountPrice.toLocaleString("en-US")} discount
              </p>
            </div>
            <div>
              <p className="mb-3">
                <span className="font-semibold">Description</span> -
                <span className="text-slate-600"> {listing.description}</span>
              </p>
              <div className="flex gap-5 mb-6 flex-wrap">
                <p className="flex items-center text-green-900 font-semibold gap-1">
                  <FaBed></FaBed>
                  <span>{listing.bedroom} Beds</span>
                </p>
                <p className="flex items-center text-green-900 font-semibold gap-1">
                  <FaBath></FaBath>
                  <span>{listing.bathroom} Baths</span>
                </p>
                <p className="flex items-center text-green-900 font-semibold gap-1">
                  <FaSquareParking></FaSquareParking>
                  <span>{listing.parking ? "Parking" : "No Parking"}</span>
                </p>
                <p className="flex items-center text-green-900 font-semibold gap-1">
                  <FaChair></FaChair>
                  <span>
                    {listing.furnished ? "Furnished" : "No Furnished"}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {chat && <Contact listing={listing} />}
                {!chat && (
                  <button
                    onClick={() => {
                      setChat(true);
                    }}
                    className="p-4 text-center text-white bg-slate-800 rounded-lg font-semibold"
                  >
                    CONTACT LANDLORD
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Listing;
