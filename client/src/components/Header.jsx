import React from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("search", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/find?${searchQuery}`);
  };

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    setSearchTerm(search);
  }, []);

  return (
    <header className="bg-slate-200 shadow-md flex justify-center">
      <div className="flex justify-between items-center max-w-6xl flex-1 p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-xl">
            <span className="text-slate-500">Sahand</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSearch}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            placeholder="Search..."
            className="bg-transparent outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <button type="submit">
            <FaSearch className="text-slate-500" />
          </button>
        </form>
        <ul className="flex gap-6 font-bold items-center">
          <Link to={"/"}>
            <li className="hidden sm:inline hover:underline">Home</li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline hover:underline">About</li>
          </Link>
          {currentUser ? (
            <img
              src={currentUser.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={() => {
                navigate("/profile");
              }}
            />
          ) : (
            <Link to={"/sign-in"}>
              <li className="hidden sm:inline hover:underline">Sign in</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
