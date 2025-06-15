import Button from "../../ui/Button";
import Input from "../../ui/Input";

function Login() {
  return (
    <form className="flex flex-col items-center justify-center h-screen bg-gray-100 ">
      <div className="bg-white shadow-md   rounded p-8 w-full max-w-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold mb-2 ">Welcome to JourneyBoard</h1>
          <p className="text-gray-600 ">
            Join the community and help shape our product roadmap
          </p>
        </div>

        <div>
          <div className="flex items-center mb-4 rounded px-2 py-2 bg-gray-200 space-x-4">
            <Button color="white" text="black">
              Sign In
            </Button>
            <Button color="bg-gray-200">Sign Up</Button>
          </div>
          <div className="w-full max-w-md space-y-4">
            <Input placeholder="Email" />
            <Input placeholder="Password" />
            <Button>Sign In</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
