import { Link, Outlet, useLocation } from "react-router-dom";
import SignIn from "./SignIn";

function UserAuth() {
  const location = useLocation();
  return (
    <form className="flex flex-col items-center justify-center h-screen bg-gray-100 ">
      <div className="bg-white shadow-md rounded p-8 w-full max-w-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold mb-2 ">Welcome to JourneyBoard</h1>
          <p className="text-gray-600 ">
            Join the community and help shape our product roadmap
          </p>
        </div>

        <div>
          <div className="flex items-center justify-around mb-4 rounded px-2 py-2 bg-gray-200 space-x-4">
            <Link
              className={`text-center font-semibold w-full px-4 py-2 rounded transition duration-200 ${
                location.pathname === "/userAuth/signIn"
                  ? "bg-white text-black"
                  : "bg-gray-200 text-gray-400"
              }`}
              to="/userAuth/signIn"
            >
              Sign In
            </Link>
            <Link
              className={`text-center font-semibold w-full px-4 py-2 rounded transition duration-200 ${
                location.pathname === "/userAuth/signUp"
                  ? "bg-white text-black"
                  : "bg-gray-200 text-gray-400"
              }`}
              to="/userAuth/signUp"
            >
              Sign Up
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </form>
  );
}

export default UserAuth;
