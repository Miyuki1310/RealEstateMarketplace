import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(currentUser);

  return (
    <header className="bg-slate-200 shadow-md flex justify-center">
      <div className="flex justify-between items-center max-w-6xl flex-1">
        <Link to={"/"}>
          <h1 className="font-bold text-xl">
            <span className="text-slate-500">Sahand</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            placeholder="Search..."
            className="bg-transparent outline-none w-24 sm:w-64"
          ></input>
          <FaSearch className="text-slate-500" />
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
