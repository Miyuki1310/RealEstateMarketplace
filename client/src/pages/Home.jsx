import React from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";

const Home = () => {
  const [offerListings, setOfferListings] = React.useState([]);
  const [rentListings, setRentListings] = React.useState([]);
  const [sellListings, setSellListings] = React.useState([]);
  React.useEffect(() => {
    const fetchOfferListings = async () => {
      const res = await fetch("/api/listing/get?offer=true");
      const data = await res.json();
      console.log(data);

      if (data.message) {
        return;
      }
      setOfferListings(data.listings);
    };
    const fetchRentListings = async () => {
      const res = await fetch("/api/listing/get?type=rent");
      const data = await res.json();
      console.log(data);

      if (data.message) {
        return;
      }
      setRentListings(data.listings);
    };
    const fetchSellListings = async () => {
      const res = await fetch("/api/listing/get?type=sell");
      const data = await res.json();
      console.log(data);

      if (data.message) {
        return;
      }
      setSellListings(data.listings);
    };
    fetchSellListings();
    fetchOfferListings();
    fetchRentListings();
  }, []);
  return (
    <div>
      <div className="max-w-6xl mx-auto py-28 px-3 flex flex-col gap-6">
        <h1 className="text-slate-700 text-6xl font-bold">
          Find your next <span className="text-slate-500">perfect</span>{" "}
          <br></br>
          place with ease
        </h1>
        <p className="text-slate-400 text-sm">
          Sahand Estate will help you find your home fast, easy and comfortable.{" "}
          <br></br>
          Our expert support are always available.
        </p>
        <Link to={"/search"} className="text-blue-800 text-sm font-bold">
          Lets start now...
        </Link>
      </div>
      <div
        className="h-[500px] mb-28"
        style={{
          background: `url(https://firebasestorage.googleapis.com/v0/b/real-estate-1078b.firebasestorage.app/o/1736792362077avtcp2.jpg?alt=media&token=46d81cd1-3ee2-4c41-a26b-87d52badcd46) center no-repeat`,
          backgroundSize: "cover",
        }}
      ></div>
      <div className="flex flex-col gap-4 max-w-6xl mx-auto px-3">
        <div>
          <h1 className="text-slate-500 text-xl font-bold">Recent offers</h1>
          <Link
            to="/search?offer=true"
            className="text-blue-800 text-sm font-bold"
          >
            Show more offers
          </Link>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
            {offerListings && offerListings.length > 0 ? (
              offerListings.map((listing) => {
                return <ListingItem key={listing._id} listing={listing} />;
              })
            ) : (
              <p>No listings found</p>
            )}
          </div>
        </div>
        <div>
          <h1 className="text-slate-500 text-xl font-bold">
            Recent places for rent
          </h1>
          <Link
            to="/search?type=rent"
            className="text-blue-800 text-sm font-bold"
          >
            Show more rent listing
          </Link>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
            {rentListings && rentListings.length > 0 ? (
              rentListings.map((listing) => {
                return <ListingItem key={listing._id} listing={listing} />;
              })
            ) : (
              <p>No listings found</p>
            )}
          </div>
        </div>
        <div>
          <h1 className="text-slate-500 text-xl font-bold">
            Recent places for sale
          </h1>
          <Link
            to="/search?type=sell"
            className="text-blue-800 text-sm font-bold"
          >
            Show more sell listing
          </Link>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
            {sellListings && sellListings.length > 0 ? (
              sellListings.map((listing) => {
                return <ListingItem key={listing._id} listing={listing} />;
              })
            ) : (
              <p>No listings found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
