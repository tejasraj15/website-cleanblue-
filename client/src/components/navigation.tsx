import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();
  const [, navigate] = useLocation();

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

            {/* Cart Icon */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-accent-teal relative"
                onClick={() => setCartOpen(!cartOpen)}
                data-testid="button-cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-teal text-navy-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* Cart Dropdown */}
              {cartOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-bold text-deep-gray text-lg">Your Cart</h3>
                  </div>

                  {items.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      <ShoppingCart className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                      <p>Your cart is empty</p>
                    </div>
                  ) : (
                    <>
                      <div className="max-h-64 overflow-y-auto">
                        {items.map((item) => (
                          <div key={item.product.id} className="flex items-center gap-3 p-3 border-b border-gray-50 hover:bg-gray-50">
                            <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-deep-gray truncate">{item.product.name}</p>
                              <p className="text-sm text-accent-teal font-bold">₹{item.product.price}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 rounded-md hover:bg-gray-200 text-gray-600"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-sm font-semibold w-6 text-center text-deep-gray">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 rounded-md hover:bg-gray-200 text-gray-600"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="p-1 rounded-md hover:bg-red-100 text-red-500 ml-1"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 border-t border-gray-100 bg-gray-50">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-medium text-gray-600">Total</span>
                          <span className="text-lg font-bold text-deep-gray">₹{totalPrice.toFixed(2)}</span>
                        </div>
                        <Button
                          className="w-full bg-accent-teal text-navy-dark hover:bg-mint-green font-semibold"
                          onClick={() => {
                            setCartOpen(false);
                            navigate("/checkout");
                          }}
                        >
                          Go to Checkout
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
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

                {/* Mobile Cart */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setCartOpen(true);
                  }}
                  className="flex items-center gap-2 text-left text-lg text-gray-300 hover:text-accent-teal transition-colors py-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Cart {totalItems > 0 && `(${totalItems})`}
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
