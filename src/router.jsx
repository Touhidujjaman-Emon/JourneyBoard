import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import UserAuth from "./pages/authPage/UserAuth";
import HomePage from "./pages/homePage/HomePage";
import SignIn from "./pages/authPage/SignIn";
import SignUp from "./pages/authPage/Signup";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/userAuth",
    element: <UserAuth />,
    children: [
      { path: "/userAuth/signIn", element: <SignIn /> },
      { path: "/userAuth/signUp", element: <SignUp /> },
    ],
  },

  { path: "/homePage", element: <HomePage /> },
]);
