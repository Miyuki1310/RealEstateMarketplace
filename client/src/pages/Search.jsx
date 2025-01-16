import React from "react";
import ListingItem from "../components/ListingItem";

const Search = () => {
  const [error, setError] = React.useState("");
  const [sideBar, setSideBar] = React.useState({
    search: "",
    type: "",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  const [listings, setListings] = React.useState([]);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    setSideBar({
      ...sideBar,
      search,
    });
    const fetchListings = async () => {
      const res = await fetch(`/api/listing/get?search=${search}`);
      const data = await res.json();
      console.log(data);
      if (data.message) {
        setError(data.message);
        return;
      }
      setListings(data.listings);
    };
    fetchListings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    console.log(name, value, type);
    if (name === "sort_order") {
      const [sort, order] = value.split("_");
      setSideBar({
        ...sideBar,
        sort,
        order,
      });
      return;
    }

    setSideBar({
      ...sideBar,
      [name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleSearch = async () => {
    console.log(sideBar);

    const query = Object.entries(sideBar)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    const url = `/listing/get?${query}`;
    const res = await fetch(`/api${url}`);
    const data = await res.json();
    console.log(data);

    if (data.message) {
      setError(data.message);
      return;
    }
    setListings(data.listings);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="border-r flex flex-col gap-8  p-7 h-auto md:min-h-screen">
        <div className="flex gap-3 items-center">
          <p>Search term:</p>
          <input
            className="p-3 rounded-lg flex-1"
            type="text"
            name="search"
            placeholder="Search..."
            value={sideBar.search}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-3 items-center flex-wrap">
          <p>Type: </p>
          <div className="flex gap-2">
            <input
              className="w-5"
              type="radio"
              id="type"
              name="type"
              value="all"
              checked={sideBar.type === "all"}
              onChange={handleChange}
            />
            <p>Rent & Sell</p>
          </div>
          <div className="flex gap-2">
            <input
              className="w-5"
              type="radio"
              id="type"
              name="type"
              value="rent"
              checked={sideBar.type === "rent"}
              onChange={handleChange}
            />
            <p>Rent</p>
          </div>
          <div className="flex gap-2">
            <input
              className="w-5"
              type="radio"
              id="type"
              name="type"
              value="sell"
              checked={sideBar.type === "sell"}
              onChange={handleChange}
            />
            <p>Sell</p>
          </div>
        </div>
        <div className="flex gap-3 items-center  flex-wrap">
          <p>Amenities: </p>
          <div className="flex gap-2">
            <input
              className="w-5"
              type="checkbox"
              id="parking"
              name="parking"
              checked={sideBar.parking}
              onChange={handleChange}
            />
            <p>Parking</p>
          </div>
          <div className="flex gap-2">
            <input
              className="w-5"
              type="checkbox"
              id="furnished"
              name="furnished"
              checked={sideBar.furnished}
              onChange={handleChange}
            />
            <p>Furnished</p>
          </div>
          <div className="flex gap-2">
            <input
              className="w-5"
              type="checkbox"
              id="offer"
              name="offer"
              checked={sideBar.offer}
              onChange={handleChange}
            />
            <p>Offer</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <p>Sort: </p>
          <select
            name="sort_order"
            onChange={handleChange}
            defaultValue={"createdAt_desc"}
            className="outline-none p-3 rounded-lg"
          >
            <option value="regularPrice_desc">Descendent price</option>
            <option value="regularPrice_asc">Ascendent price</option>
            <option value="createdAt_desc">Descendent day</option>
            <option value="createdAt_asc">Ascendent day</option>
          </select>
        </div>

        <button
          type="button"
          className="bg-slate-800 text-white p-3 rounded-lg"
          onClick={handleSearch}
        >
          Search
        </button>
        <p className="text-red-500">{error}</p>
      </div>
      <div className="flex-1 p-7">
        <h1 className="text-2xl font-bold border-b pb-5">
          The results of search:{" "}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 my-5">
          {listings && listings.length > 0 ? (
            listings.map((listing) => {
              return <ListingItem key={listing._id} listing={listing} />;
            })
          ) : (
            <p>No listings found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
