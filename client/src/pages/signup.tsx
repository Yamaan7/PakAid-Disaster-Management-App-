import { Card, CardContent } from "@/components/ui/card";
import SignupForm from "@/components/auth/signup-form";

const Signup = () => {
  return (
    <div className="container mx-auto pt-24 px-4 pb-12">
      <div className="max-w-md mx-auto pt-8">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
