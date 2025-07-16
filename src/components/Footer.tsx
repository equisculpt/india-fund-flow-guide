
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import ComplianceFooter from './ComplianceFooter';
import TrademarkNotice from './TrademarkNotice';
import ContactFormModal from './ContactFormModal';

const Footer = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleLinkClick = () => {
    // Scroll to top when clicking footer links
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  return (
    <footer className="bg-gradient-to-b from-background to-muted border-t border-primary/20">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 relative">
        {/* Luxury background effects */}
        <div className="absolute inset-0 bg-gradient-glass opacity-30"></div>
        <div className="grid md:grid-cols-4 gap-8 relative z-10">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-secondary bg-clip-text text-transparent">SIP Brewery</h3>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              India&apos;s trusted AMFI registered mutual fund distributor offering regular mutual funds with professional advisory.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-secondary transition-all duration-300 hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-all duration-300 hover:scale-110">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-all duration-300 hover:scale-110">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-all duration-300 hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" onClick={handleLinkClick} className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/public-funds" onClick={handleLinkClick} className="text-muted-foreground hover:text-primary transition-colors">Mutual Funds</Link></li>
              <li><Link to="/community" onClick={handleLinkClick} className="text-muted-foreground hover:text-primary transition-colors">Community</Link></li>
              <li><Link to="/fund-comparison" onClick={handleLinkClick} className="text-muted-foreground hover:text-primary transition-colors">Fund Comparison</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" onClick={handleLinkClick} className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" onClick={handleLinkClick} className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/risk-disclosure" onClick={handleLinkClick} className="text-muted-foreground hover:text-primary transition-colors">Risk Disclosure</Link></li>
              <li><Link to="/contact" onClick={handleLinkClick} className="text-muted-foreground hover:text-primary transition-colors">Grievance Redressal</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-muted-foreground">hello@equisculpt.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-muted-foreground">+91 7760997030</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-muted-foreground">Hyderabad, India</span>
              </div>
            </div>
            <Link 
              to="/contact"
              onClick={handleLinkClick}
              className="inline-block mt-4 bg-gradient-secondary hover:bg-secondary-glow text-secondary-foreground px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-glass"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Compliance Footer - Only appears once */}
      <ComplianceFooter />

      {/* Trademark Notice */}
      <TrademarkNotice />

      {/* Copyright */}
      <div className="bg-gradient-to-r from-muted/50 to-muted/30 py-4 text-center border-t border-primary/20">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SIP Brewery. All rights reserved. | 
            Powered by <span className="text-accent font-semibold">Equisculpt Ventures Pvt. Ltd.</span>
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
