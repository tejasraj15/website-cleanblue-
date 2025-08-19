import { Button } from "@/components/ui/button";
import { ShoppingCart, Play, CheckCircle, Award } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-mint-green/20 to-white" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-navy-dark">Pure Water.</span><br />
                <span className="text-deep-gray">Advanced Technology.</span><br />
                <span className="text-accent-teal">Healthier Life.</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed" data-testid="text-hero-description">
                Experience India's most advanced water purification technology with CleanBlue. 
                Our innovative nanobubble-infused water delivers enhanced oxygenation and cellular-level hydration for optimal health and performance.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection("products")}
                className="bg-accent-teal text-navy-dark px-8 py-4 rounded-xl font-semibold hover:bg-mint-green transition-colors shadow-lg"
                data-testid="button-shop-now"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Shop Now
              </Button>
              <Button 
                variant="outline"
                onClick={() => scrollToSection("technology")}
                className="border-2 border-accent-teal text-accent-teal px-8 py-4 rounded-xl font-semibold hover:bg-accent-teal hover:text-navy-dark transition-colors"
                data-testid="button-learn-more"
              >
                <Play className="mr-2 h-4 w-4" />
                Learn More
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-500 h-4 w-4" />
                <span>FSSAI Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-500 h-4 w-4" />
                <span>BIS Approved</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-500 h-4 w-4" />
                <span>Lab Tested</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <img 
              src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=800" 
              alt="Premium water bottle with clean design" 
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              data-testid="img-hero-product"
            />
            <div className="absolute -top-4 -right-4 bg-accent-teal text-white p-3 rounded-full shadow-lg">
              <Award className="text-2xl" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg border">
              <div className="text-primary-blue font-bold text-lg" data-testid="text-purity-percentage">99.9%</div>
              <div className="text-sm text-gray-600">Pure Water</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
