import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Swal from 'sweetalert2';
import ForgotPassword from '../ForgotPassword';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth-context";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Replace the separate login logic with this unified approach
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check for admin credentials
    if (formData.email === 'admin@gmail.com' && formData.password === 'admin123') {
      try {
        Swal.fire({
          title: 'Logging in...',
          text: 'Please wait',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        await Swal.fire({
          icon: 'success',
          title: 'Welcome Admin!',
          text: 'Login successful',
          confirmButtonColor: '#3B82F6',
          timer: 1500,
          timerProgressBar: true
        });

        const adminData = {
          role: 'admin',
          email: formData.email,
          name: 'Admin'
        };

        // Store admin data and update auth context
        localStorage.setItem('token', 'admin-token');
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('role', 'admin');
        localStorage.setItem('user', JSON.stringify(adminData));

        // Call login function to update auth context
        login();

        navigate('/admin');
        return;
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error instanceof Error ? error.message : 'Something went wrong',
          confirmButtonColor: '#3B82F6'
        });
        return;
      }
    }

    // Regular user/rescue-team authentication
    try {
      Swal.fire({
        title: 'Logging in...',
        text: 'Please wait',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('role', data.user.role);
        localStorage.setItem('isAdmin', 'false');

        // Call login function to update auth context
        login();

        await Swal.fire({
          icon: 'success',
          title: `Welcome ${data.user.name}!`,
          text: 'Login successful',
          confirmButtonColor: '#3B82F6',
          timer: 1500,
          timerProgressBar: true
        });

        // Redirect based on role
        switch (data.user.role) {
          case 'rescue-team':
            navigate('/rescue-team-dashboard');
            break;
          default:
            navigate('/dashboard');
        }
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error instanceof Error ? error.message : 'Something went wrong',
        confirmButtonColor: '#3B82F6'
      });
      setError('Login failed. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold font-heading text-neutral-dark">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <ForgotPassword currentEmail={formData.email} />
          </div>

          <Button type="submit" variant="destructive" className="w-full">
            Sign In
          </Button>

          {/* Role-specific buttons */}
          <div className="flex flex-col gap-3 mt-8">
            <Link to="/home">
              <Button variant="outline" className="w-full">
                Continue as Guest
              </Button>
            </Link>

            <Link to="/rescue-team-signup">
              <Button variant="outline" className="w-full">
                Continue as Rescue Team
              </Button>
            </Link>

            {/* <Link to="/admin">
              <Button variant="outline" className="w-full">
                Continue as Admin
              </Button>
            </Link> */}
          </div>
        </form>

        {error && (
          <div className="mt-4 text-red-600 text-center">
            {error}
          </div>
        )}

        <div className="relative my-6">
          <Separator />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-secondary hover:text-blue-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;