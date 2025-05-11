import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, Shield, Heart, HandHelping, MapPin, Phone, Mail, AlertTriangle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 text-white py-12">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        {/* Emergency Banner */}
        {/* <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-full max-w-md">
          <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 p-3 rounded-lg shadow-lg flex items-center justify-center space-x-2">
            <AlertTriangle className="animate-pulse" size={20} />
            <span className="font-bold">Emergency Hotline: 1122</span>
          </div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          {/* Brand Section */}
          <div className="relative">
            <div className="p-6 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/30">
              <h3 className="text-xl font-bold mb-4 font-heading flex items-center text-red-500">
                <Shield className="mr-2" size={24} />
                Disaster Management
              </h3>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                Your trusted partner in disaster management and emergency response across Pakistan.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: "#facebook" },
                  { icon: Twitter, href: "#twitter" },
                  { icon: Instagram, href: "#instagram" },
                  { icon: Linkedin, href: "#linkedin" },
                ].map(({ icon: Icon, href }) => (
                  <a
                    key={href}
                    href={href}
                    className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-500 transition-all duration-300 flex items-center justify-center group"
                  >
                    <Icon
                      size={16}
                      className="text-gray-400 group-hover:text-white transition-colors"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-heading flex items-center">
              <Heart className="mr-2 text-red-500" size={20} />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/home", label: "Home" },
                { href: "/map", label: "Disaster Map" },
                { href: "/about", label: "About Us" },
                { href: "/login", label: "Donate" },
                { href: "/login", label: "Volunteer" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-gray-400 hover:text-red-400 transition-colors duration-300 flex items-center">
                      <span className="mr-2">→</span>
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-heading flex items-center">
              <HandHelping className="mr-2 text-red-500" size={20} />
              Resources
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "Disaster Preparedness" },
                { href: "/about", label: "Emergency Contacts" },
                { href: "/rescue-dashboard", label: "Rescue Team Portal" },
                { href: "/about", label: "Donation Guidelines" },
                { href: "/about", label: "Reports & Data" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-gray-400 hover:text-red-400 transition-colors duration-300 flex items-center">
                      <span className="mr-2">→</span>
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-heading flex items-center">
              <Phone className="mr-2 text-red-500" size={20} />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <MapPin className="mt-1 mr-3 text-red-500 group-hover:animate-bounce" size={18} />
                <span className="text-gray-400">123 Relief Center, Islamabad, Pakistan</span>
              </li>
              <li className="flex items-center group">
                <Phone className="mr-3 text-red-500 group-hover:animate-pulse" size={18} />
                <span className="text-gray-400">+92-51-1234567</span>
              </li>
              <li className="flex items-center group">
                <Mail className="mr-3 text-red-500 group-hover:animate-bounce" size={18} />
                <span className="text-gray-400">info@disastermanagement.org</span>
              </li>
            </ul>
            <Button
              variant="destructive"
              size="lg"
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg"
            >
              Emergency Hotline
            </Button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-sm text-gray-500 text-center relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
          <p>&copy; {new Date().getFullYear()} Disaster Management. All rights reserved.</p>
        </div>
      </div>



    </footer>
  );
};

export default Footer;