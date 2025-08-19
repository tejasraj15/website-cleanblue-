import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  const stats = [
    { value: "10M+", label: "Bottles Sold" },
    { value: "50K+", label: "Happy Customers" },
    { value: "15+", label: "Cities Served" },
    { value: "99.9%", label: "Purity Level" }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-deep-gray mb-4" data-testid="text-about-title">
                Our Story
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed" data-testid="text-about-description">
                Founded with a vision to revolutionize water quality in India, CleanBlue combines cutting-edge technology 
                with a commitment to health and sustainability. Our journey began with the simple belief that everyone 
                deserves access to the purest, most beneficial water possible.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center" data-testid={`stat-${index}`}>
                  <div className="text-3xl font-bold text-primary-blue" data-testid={`text-stat-value-${index}`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600" data-testid={`text-stat-label-${index}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="bg-accent-teal text-white px-8 py-4 rounded-xl font-semibold hover:bg-teal-700 transition-colors shadow-lg" data-testid="button-learn-about-us">
              <ArrowRight className="mr-2 h-4 w-4" />
              Learn More About Us
            </Button>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Healthy active lifestyle with person drinking clean water during workout" 
              className="rounded-2xl shadow-2xl w-full"
              data-testid="img-about-lifestyle"
            />
            <div className="absolute top-6 right-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-deep-gray">Live Quality Monitor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
