import Button from "./Button";
import { useAuth } from "../features/userAuth/AuthContext";
import { useNavigate } from "react-router-dom";
function NavBar() {
  const { session, signOutUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async function () {
    const { error } = await signOutUser();
    if (error) {
      console.log(error);
      return;
    }
    navigate("/userAuth/signIn");
  };
  return (
    <div className="flex items-center justify-between p-4 bg-white text-black shadow-md rounded-t">
      <span className="text-2xl font-bold">JourneyBoard</span>
      <div className="flex items-center space-x-4">
        <span className=" text-gray-600">
          {session.user.user_metadata.username}
        </span>
        <button
          onClick={handleSignOut}
          className=" font-semibold border text-sm border-gray-400 text-black px-4 py-2 rounded transition hover:opacity-70 duration-300 ease-in-out cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default NavBar;
