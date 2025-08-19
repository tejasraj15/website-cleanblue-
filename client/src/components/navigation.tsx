import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Droplets } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Technology", id: "technology" },
    { label: "Products", id: "products" },
    { label: "Testimonials", id: "testimonials" },
    { label: "About", id: "about" },
  ];

  return (
    <nav className="fixed w-full top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-50" data-testid="navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2" data-testid="logo">
            <div className="w-8 h-8 bg-primary-blue rounded-lg flex items-center justify-center">
              <Droplets className="text-white text-sm" />
            </div>
            <span className="text-xl font-bold text-primary-blue">CleanBlue</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-deep-gray hover:text-primary-blue transition-colors"
                data-testid={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={() => scrollToSection("contact")} 
              className="bg-primary-blue text-white hover:bg-blue-700"
              data-testid="button-contact"
            >
              Contact Us
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-lg text-deep-gray hover:text-primary-blue transition-colors py-2"
                    data-testid={`mobile-nav-${item.id}`}
                  >
                    {item.label}
                  </button>
                ))}
                <Button 
                  onClick={() => scrollToSection("contact")} 
                  className="bg-primary-blue text-white hover:bg-blue-700 mt-4"
                  data-testid="mobile-button-contact"
                >
                  Contact Us
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
