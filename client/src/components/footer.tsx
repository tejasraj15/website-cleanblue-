import { Droplets } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const footerSections = [
    {
      title: "Products",
      links: [
        "Premium Glass Series",
        "Active Sport Series", 
        "Corporate Solutions",
        "Bulk Orders"
      ]
    },
    {
      title: "Company",
      links: [
        "About Us",
        "Our Technology",
        "Quality Standards",
        "Careers"
      ]
    },
    {
      title: "Support",
      links: [
        "Contact Us",
        "Customer Care",
        "FAQ",
        "Returns & Refunds"
      ]
    }
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaLinkedinIn, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-deep-gray text-white py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3" data-testid="footer-logo">
              <div className="bg-white px-3 py-1 rounded-lg">
                <span className="text-navy-dark font-bold text-lg">CLEAN</span>
                <span className="text-accent-teal font-bold text-lg">BLUE</span>
              </div>
            </div>
            <p className="text-gray-400" data-testid="text-footer-description">
              Fresh well water from Gorakhpur, UP - bringing nature's purest hydration to families across India.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a 
                    key={index}
                    href={social.href} 
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.label}
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>
          
          {footerSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="font-semibold mb-4" data-testid={`text-footer-section-title-${sectionIndex}`}>
                {section.title}
              </h3>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="hover:text-white transition-colors"
                      data-testid={`link-footer-${sectionIndex}-${linkIndex}`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p data-testid="text-footer-copyright">
            &copy; 2024 CleanBlue. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
