import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useAuth } from "../../features/userAuth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  const { signUpNewUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await signUpNewUser(username, email, password);
      if (error) {
        console.log(error);
        return error;
      } else {
        navigate("/userAuth/signIn");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <Input
        value={username}
        placeholder="user name"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <Button type="submit">Sign up</Button>
    </form>
  );
}

export default SignUp;
