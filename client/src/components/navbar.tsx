import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, HandHelping, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [location] = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [avatarColor, setAvatarColor] = useState("");
  const [, setLocation] = useLocation();

  // Add ref for dropdown container
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Add function to handle navigation clicks
  const handleNavClick = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Generate random color on mount for avatar background
  useEffect(() => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setAvatarColor(randomColor);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setLocation('/login'); // Add this line to redirect
  };

  const getDashboardPath = () => {
    const role = user?.role || '';
    switch (role) {
      case 'admin':
        return '/admin';
      case 'rescue-team':
        return '/rescue-team-dashboard';
      default:
        return '/dashboard';
    }
  };

  const navLinks = [
    { title: "Home", path: "/home" },
    { title: "Disaster Map", path: "/map" },
    { title: "About Us", path: "/about" },
  ];

  // Update the renderAuthButton function
  const renderAuthButton = () => {
    if (!isAuthenticated) {
      return (
        <Button
          asChild
          className="bg-gradient-to-r from-red-600 to-red-500 text-white border-none 
          shadow-lg relative z-10 backdrop-blur-sm"
          onClick={handleNavClick}
        >
          <Link href="/login">Login</Link>
        </Button>
      );
    }

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 
          text-white font-semibold flex items-center justify-center shadow-lg relative z-10"
        >
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 py-1 z-50 rounded-lg
          bg-slate-900/95 backdrop-blur-sm border border-white/10 shadow-xl">
            <Link href={getDashboardPath()} onClick={handleNavClick}>
              <a className="flex items-center px-4 py-2 text-gray-300 hover:text-red-400 transition-colors">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </a>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-gray-300 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="fixed top-0 w-full z-[1000] bg-white shadow-md">
      {/* Main navbar with shine effects */}
      <div className="relative bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 shadow-lg">
        {/* Circular shine effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-slate-400/10 rounded-full blur-3xl" />
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="flex justify-between items-center py-4">
            {/* Logo section with glass effect */}
            <div className="flex items-center relative z-10">
              <Link
                href="/home"
                className="text-2xl font-bold flex items-center group"
              >
                <div className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg">
                  <HandHelping className="text-red-500" size={24} />
                </div>
                <span className="ml-2 bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">
                  Disaster Management
                </span>
              </Link>
            </div>

            {/* Navigation links with glass effect */}
            <div className="hidden md:flex space-x-8 items-center relative z-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-2 rounded-md transition-colors duration-200
            ${location === link.path
                      ? 'text-white bg-white/5 backdrop-blur-sm border border-white/10'
                      : 'text-gray-300'}`}
                >
                  {link.title}
                </Link>
              ))}
              <div className="pl-4 border-l border-white/10">
                {renderAuthButton()}
              </div>
            </div>

            {/* Mobile menu button with glass effect */}
            <div className="md:hidden relative z-10">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="text-white" size={24} /> : <Menu className="text-white" size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu with glass effect */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10">
          <div className="bg-slate-900/95 backdrop-blur-sm">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block px-4 py-3 transition-colors duration-200
      ${location === link.path
                    ? 'text-white bg-white/5'
                    : 'text-gray-300'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <div className="p-4 border-t border-white/10">
              {renderAuthButton()}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
