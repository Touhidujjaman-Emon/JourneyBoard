import { Navigate } from "react-router-dom";
import { useAuth } from "../features/userAuth/AuthContext";

function ProtectedRoute({ children }) {
  const { session } = useAuth();
  return <>{session ? children : <Navigate to="/userAuth/signIn" />}</>;
}

export default ProtectedRoute;
