import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "@/components/auth/login-form";

const Login = () => {
  return (
    <div className="container mx-auto pt-24 px-4 pb-12">
      <div className="max-w-md mx-auto pt-8">
        <LoginForm />

        {/* <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Need to sign up as a rescue team? 
            <Link href="/signup">
              <a className="text-secondary font-medium ml-1">
                Register here
              </a>
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
