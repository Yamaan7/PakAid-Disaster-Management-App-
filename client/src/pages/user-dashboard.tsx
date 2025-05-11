
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import AIRescueChat from '@/components/AiRescueChat';




const UserDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-red-600 via-pink-500 to-orange-500 transition-all duration-500 shadow-lg text-white py-12 mb-8">

                <div className="container mx-auto px-4 py-12 text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Welcome to Your Dashboard
                    </h1>
                    <p className="text-lg opacity-90">
                        Share your insights and help others stay informed
                    </p>
                </div>
            </div>

            {/* User Info Card */}
            <div className="container mx-auto px-4">
                <Card className="mb-8 rounded-2xl shadow-xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100">
                    <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-t-2xl">
                        <h2 className="text-2xl font-bold tracking-wide">👤 Profile Information</h2>
                    </CardHeader>
                    <CardContent className="p-6">
                        <p className="text-lg text-gray-700 mb-2">
                            <span className="font-medium text-gray-900">Name:</span> {user?.name}
                        </p>
                        <p className="text-lg text-gray-700">
                            <span className="font-medium text-gray-900">Email:</span> {user?.email}
                        </p>
                    </CardContent>
                </Card>
                <div className="mb-8 rounded-2xl shadow-xl border border-gray-200 bg-white overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-t-2xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-bold tracking-wide">
                                    🤖 AI Emergency Assistant
                                </h2>
                                <p className="text-sm opacity-90 mt-1">
                                    Get immediate guidance for disaster situations
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    {/* Main Content Section */}
                    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        {/* Section Header */}
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                Emergency Assistance at Your Fingertips
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                                Our AI assistant provides immediate guidance for emergency situations including floods, earthquakes, heatwaves, and landslides.
                            </p>
                        </div>

                        {/* Two-column layout for larger screens */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                            {/* Information Panel */}
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-red-100 p-2 rounded-full">
                                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900">When to Use This Assistant</h3>
                                </div>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <svg className="flex-shrink-0 w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>For non-life-threatening emergency guidance</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="flex-shrink-0 w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>To get step-by-step instructions for emergencies</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="flex-shrink-0 w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>For information about disaster preparedness</span>
                                    </li>
                                </ul>

                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-red-100 p-2 rounded-full">
                                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">Immediate Emergency Contacts</h3>
                                    </div>
                                    <div className="space-y-2 text-gray-600">
                                        <p className="flex items-center gap-2">
                                            <span className="font-medium text-gray-900">Pakistan Emergency:</span> 1122
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="font-medium text-gray-900">NDMA Helpline:</span> 051-111-157-157
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="font-medium text-gray-900">Rescue 15:</span> 15
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Interface Panel */}
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-full">
                                <div className="text-center mb-6">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Emergency Assistant</h3>
                                    <p className="text-gray-600">Chat with our specialized assistant for immediate guidance</p>
                                </div>

                                <div className="isolate h-[500px]">
                                    <AIRescueChat />
                                </div>

                                <div className="mt-4 text-xs text-gray-500 text-center">
                                    <p>Note: For life-threatening emergencies, please call emergency services immediately.</p>
                                </div>
                            </div>
                        </div>
                    </section>


                </div>
            </div>
        </div>
    );
};

export default UserDashboard;