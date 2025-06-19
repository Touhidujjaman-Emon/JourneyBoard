import Input from "../../ui/Input";
import Button from "../../ui/Button";
function SignIn() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Input placeholder="Email" />
      <Input placeholder="Password" />
      <Button>Sign In</Button>
    </div>
  );
}

export default SignIn;
