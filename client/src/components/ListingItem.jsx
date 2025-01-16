import PropTypes from "prop-types";
import React from "react";
import { FaBath, FaBed, FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ListingItem = ({ listing }) => {
  return (
    <div className="flex flex-col rounded-md shadow-md">
      <img
        className="h-56 sm:72 md:56 w-full object-cover rounded-lg"
        src={listing.image[0]}
      ></img>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h2 className="text-xl font-semibold line-clamp-1">{listing.name}</h2>
        <div className="flex gap-2 items-center line-clamp-1 text-green-700">
          <FaLocationDot></FaLocationDot>
          <p className="text-slate-600 text-sm">{listing.address}</p>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-2 items-center text-sm text-slate-600 font-semibold">
            <FaBed />
            <p>{listing.bedroom} bedroom</p>
          </div>
          <div className="flex gap-2 items-center text-sm text-slate-600 font-semibold">
            <FaBath />
            <p>{listing.bedroom} bathroom</p>
          </div>
        </div>
        <p className="text-slate-600 text-sm line-clamp-3">
          {listing.description}
        </p>
        <p className="block font-semibold text-xl mt-auto mb-2">
          {listing.type == "sell"
            ? `$ ${listing.regularPrice.toLocaleString("en-US")}`
            : `$ ${listing.regularPrice.toLocaleString("en-US")}/month`}
        </p>
        <Link
          to={`/listing/${listing._id}`}
          className="bg-slate-700 p-2 text-white rounded-lg font-semibold text-center"
        >
          View Detail
        </Link>
      </div>
    </div>
  );
};

ListingItem.propTypes = {
  listing: PropTypes.object.isRequired,
};

export default ListingItem;
