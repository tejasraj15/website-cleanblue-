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
    { label: "Our Water", id: "technology" },
    { label: "Shop Products", id: "products" },
    { label: "About Us", id: "about" },
  ];

  return (
    <nav className="fixed w-full top-0 bg-navy-dark backdrop-blur-md border-b border-gray-700 z-50" data-testid="navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3" data-testid="logo">
            <div className="bg-white px-3 py-1 rounded-lg">
              <span className="text-navy-dark font-bold text-lg">CLEAN</span>
              <span className="text-accent-teal font-bold text-lg">BLUE</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-300 hover:text-accent-teal transition-colors font-medium"
                data-testid={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={() => scrollToSection("contact")} 
              className="bg-accent-teal text-navy-dark hover:bg-mint-green font-semibold"
              data-testid="button-contact"
            >
              Contact
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-gray-300 hover:text-accent-teal" data-testid="button-mobile-menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-navy-dark border-gray-700">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-lg text-gray-300 hover:text-accent-teal transition-colors py-2"
                    data-testid={`mobile-nav-${item.id}`}
                  >
                    {item.label}
                  </button>
                ))}
                <Button 
                  onClick={() => scrollToSection("contact")} 
                  className="bg-accent-teal text-navy-dark hover:bg-mint-green mt-4 font-semibold"
                  data-testid="mobile-button-contact"
                >
                  Contact
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
