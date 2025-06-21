import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useAuth } from "../../features/userAuth/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function SignIn() {
  const { signInUser, session } = useAuth();
  const navigate = useNavigate();

  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError(null);
    // setLoading(true);
    try {
      const { error } = await signInUser(email, password);
      if (error) {
        console.log(error);
        return;
      }
      if (session) {
        navigate("/HomePage");
      }
    } catch (error) {
      console.log(error);
    }
    // setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <Input
        value={email}
        placeholder="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        value={password}
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button>Sign In</Button>
    </form>
  );
}

export default SignIn;
