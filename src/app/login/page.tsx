
import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";
import Button from "@/components/Button";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-6">
        <p className="text-center text-gray-500 text-sm">© Mandy Lí 2025</p>

        <div>
          <Input id="email" label="Email" type="email" placeholder="Enter your email" />
        </div>

        <div>
          <Input id="password" label="Password" type="password" placeholder="Enter your password" />
        </div>

        <div className="flex justify-between items-center text-sm">
          <Checkbox label="Remember me" />
          <a href="#" className="text-pink-700 hover:underline">¿Forgot your password?</a>
        </div>

        <Button type="submit">Login</Button>

        <div className="text-center text-sm text-gray-600">
          I’m not a robot <br />
          <span className="text-xs text-gray-400">Privacy - Terms</span>
        </div>
      </form>
    </div>
  );
}