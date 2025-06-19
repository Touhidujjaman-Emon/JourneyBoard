import Input from "../../ui/Input";
import Button from "../../ui/Button";

function SignUp() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Input placeholder="Username" />
      <Input placeholder="Email" />
      <Input placeholder="Password" />
      <Button>Sign up</Button>
    </div>
  );
}

export default SignUp;
