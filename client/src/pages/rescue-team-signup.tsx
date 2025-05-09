import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, Building, User, Phone, Eye, EyeOff, FileText, Calendar, Users, Image } from 'lucide-react';
import Swal from 'sweetalert2';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface FormData {
    teamName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    certificate: File | null;
    profilePicture: File | null;
    description: string;
    teamSize: number;
    deployedDate: string;
    role: string;
}

const RescueTeamSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        teamName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        certificate: null,
        profilePicture: null,
        description: '',
        teamSize: 0,
        deployedDate: '',
        role: 'rescue-team',
    });

    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Password Mismatch',
                text: 'Passwords do not match',
                confirmButtonColor: '#3B82F6'
            });
            return;
        }

        // Check file sizes
        const maxSize = 5 * 1024 * 1024; // 5MB
        if ((formData.certificate && formData.certificate.size > maxSize) ||
            (formData.profilePicture && formData.profilePicture.size > maxSize)) {
            Swal.fire({
                icon: 'error',
                title: 'File Too Large',
                text: 'Certificate and profile picture must be less than 5MB',
                confirmButtonColor: '#3B82F6'
            });
            return;
        }

        try {
            Swal.fire({
                title: 'Registering...',
                text: 'Please wait',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const formDataToSend = new FormData();

            // Explicitly append role field
            formDataToSend.append('role', 'rescue-team');

            // Append other fields
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'confirmPassword' && value !== null) {
                    formDataToSend.append(key, value);
                }
            });

            const response = await fetch('http://localhost:8080/api/auth/rescue-team/register', {
                method: 'POST',
                credentials: 'include',
                body: formDataToSend,
            });

            const data = await response.json();

            if (response.ok) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful!',
                    text: 'You can now login to your rescue team account',
                    confirmButtonColor: '#3B82F6'
                });
                navigate('/login');
            } else {
                throw new Error(data.message || 'Registration failed');
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: err instanceof Error ? err.message : 'Something went wrong',
                confirmButtonColor: '#3B82F6'
            });
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="container mx-auto pt-24 px-4 pb-12">
            <div className="max-w-md mx-auto pt-8">
                <Card className="w-full max-w-md mx-auto ">
                    <CardContent className="pt-6">
                        <div className="text-center mb-6">
                            <UserPlus className="w-12 h-12 text-primary mx-auto mb-4" />
                            <h2 className="text-2xl font-bold font-heading text-neutral-dark">Register Your Rescue Team</h2>
                            <p className="text-gray-600">Join us in making a difference</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="teamName">Rescue Team Name</Label>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        id="teamName"
                                        value={formData.teamName}
                                        onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                                        placeholder="Enter team name"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="Enter email address"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <div className="relative">
                                    <Input
                                        type="tel"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="Enter phone number"
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
                                        placeholder="Enter password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative">
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        placeholder="Confirm password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="description">Team Description</Label>
                                <textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full p-3 rounded-md border border-input bg-background"
                                    placeholder="Describe your team's expertise and experience"
                                    rows={4}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="teamSize">Team Size</Label>
                                <div className="relative">
                                    <Input
                                        type="number"
                                        id="teamSize"
                                        value={formData.teamSize}
                                        onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value) })}
                                        placeholder="Number of team members"
                                        min="1"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="deployedDate">Team Deployment Date</Label>
                                <div className="relative">
                                    <Input
                                        type="date"
                                        id="deployedDate"
                                        value={formData.deployedDate}
                                        onChange={(e) => setFormData({ ...formData, deployedDate: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="profilePicture">Team Profile Picture</Label>
                                <Input
                                    type="file"
                                    id="profilePicture"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        setFormData({ ...formData, profilePicture: file || null });
                                    }}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="certificate">Team Certificate</Label>
                                <Input
                                    type="file"
                                    id="certificate"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        setFormData({ ...formData, certificate: file || null });
                                    }}
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full" variant="destructive">
                                Register Rescue Team
                            </Button>
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
                                Already registered?{' '}
                                <Link to="/login" className="text-primary hover:text-primary/90 font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default RescueTeamSignup;