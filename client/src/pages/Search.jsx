// import React from "react";

const Search = () => {
  return (
    <div className="flex">
      <div className="border-r flex flex-col gap-8  p-7 h-auto min-h-screen">
        <div className="flex gap-3 items-center">
          <p>Search term:</p>
          <input
            className="p-3 rounded-lg flex-1"
            type="text"
            placeholder="Search..."
          />
        </div>
        <div className="flex gap-3 items-center">
          <p>Type: </p>
          <div className="flex gap-2">
            <input
              className="w-5"
              type="radio"
              id="rent"
              name="type"
              value="all"
            />
            <p>Rent & Sell</p>
          </div>
          <div className="flex gap-2">
            <input
              className="w-5"
              type="radio"
              id="rent"
              name="type"
              value="rent"
            />
            <p>Rent</p>
          </div>
          <div className="flex gap-2">
            <input
              className="w-5"
              type="radio"
              id="rent"
              name="type"
              value="sell"
            />
            <p>Sell</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <p>Amenities: </p>
          <div className="flex gap-2">
            <input
              className="w-5"
              type="checkbox"
              id="parking"
              name="parking"
            />
            <p>Parking</p>
          </div>
          <div className="flex gap-2">
            <input
              className="w-5"
              type="checkbox"
              id="furnished"
              name="furnished"
            />
            <p>Furnished</p>
          </div>
          <div className="flex gap-2">
            <input
              className="w-5"
              type="checkbox"
              id="offer"
              name="offer"
              width={5}
            />
            <p>Offer</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <p>Sort: </p>
          <select className="outline-none p-3 rounded-lg">
            <option value="regularPrice_desc">Descendent price</option>
            <option value="regularPrice_asc">Ascendent price</option>
            <option value="Day_desc">Descendent day</option>
            <option value="Day_desc">Ascendent day</option>
          </select>
        </div>

        <button className="bg-slate-800 text-white p-3 rounded-lg">
          Search
        </button>
      </div>
      <div className="flex-1"></div>
    </div>
  );
};

export default Search;
