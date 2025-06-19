import HomePage from "./pages/homePage/HomePage";
import UserAuth from "./pages/authPage/UserAuth";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen px-4 flex flex-col items-center justify-center">
      <UserAuth />
      <HomePage />
    </div>
  );
}

export default App;
