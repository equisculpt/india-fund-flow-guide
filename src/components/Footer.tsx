
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import ComplianceFooter from './ComplianceFooter';
import TrademarkNotice from './TrademarkNotice';
import ContactFormModal from './ContactFormModal';

const Footer = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">SIP Brewery</h3>
            <p className="text-gray-300 mb-4">
              India's trusted AMFI registered mutual fund distributor offering regular mutual funds with professional advisory.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/public-funds" className="text-gray-300 hover:text-white transition-colors">Mutual Funds</Link></li>
              <li><Link to="/community" className="text-gray-300 hover:text-white transition-colors">Community</Link></li>
              <li><Link to="/fund-comparison" className="text-gray-300 hover:text-white transition-colors">Fund Comparison</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/risk-disclosure" className="text-gray-300 hover:text-white transition-colors">Risk Disclosure</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Grievance Redressal</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">hello@equisculpt.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">+91 7760997030</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">Hyderabad, India</span>
              </div>
            </div>
            <Link 
              to="/contact"
              className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Compliance Footer */}
      <ComplianceFooter />

      {/* Trademark Notice */}
      <TrademarkNotice />

      {/* Copyright */}
      <div className="bg-gray-800 py-4 text-center border-t border-gray-700">
        <div className="container mx-auto px-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} SIP Brewery. All rights reserved. | 
            Powered by Equisculpt Ventures Pvt. Ltd.
          </p>
        </div>
      </div>

      <ContactFormModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </footer>
  );
};

export default Footer;
