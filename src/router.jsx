import { createBrowserRouter } from "react-router-dom";

import UserAuth from "./pages/authPage/UserAuth";
import HomePage from "./pages/homePage/HomePage";
import SignIn from "./pages/authPage/SignIn";
import SignUp from "./pages/authPage/SignUp";
import ProtectedRoute from "./ui/ProtectedRoute";

export const router = createBrowserRouter([
  { path: "/", element: <UserAuth /> },
  {
    path: "/userAuth",
    element: <UserAuth />,
    children: [
      { path: "/userAuth/signIn", element: <SignIn /> },
      { path: "/userAuth/signUp", element: <SignUp /> },
    ],
  },

  {
    path: "/homePage",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
]);
