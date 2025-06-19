import Input from "../../ui/Input";
import Button from "../../ui/Button";

function SignUp() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Input placeholder="user name" />
      <Input placeholder="email" />
      <Input placeholder="password" />
      <Button>Sign up</Button>
    </div>
  );
}

export default SignUp;
