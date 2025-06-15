import Button from "./Button";

function NavBar() {
  return (
    <div className="flex items-center justify-between p-4 bg-white text-black shadow-md rounded-t">
      <span className="text-2xl font-bold">JourneyBoard</span>
      <div className="flex items-center space-x-4">
        <span className=" text-gray-600">tj.emon33@gmail.com</span>
        <button className=" font-semibold border text-sm border-gray-400 text-black px-4 py-2 rounded transition hover:opacity-70 duration-300 ease-in-out">
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default NavBar;
