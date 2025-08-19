import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { MessageCircle, Star } from "lucide-react";
import type { Testimonial } from "@shared/schema";

export default function TestimonialsSection() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 bg-white" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-deep-gray mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-white" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-deep-gray mb-4" data-testid="text-testimonials-title">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-testimonials-description">
            Real stories from customers who have experienced the CleanBlue difference in their daily hydration and wellness journey.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-light-blue p-6 rounded-2xl shadow-lg"
              data-testid={`card-testimonial-${testimonial.id}`}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic" data-testid={`text-testimonial-content-${testimonial.id}`}>
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={`Professional headshot of ${testimonial.name}`} 
                  className="w-12 h-12 rounded-full mr-3"
                  data-testid={`img-testimonial-${testimonial.id}`}
                />
                <div>
                  <div className="font-semibold text-deep-gray" data-testid={`text-testimonial-name-${testimonial.id}`}>
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600" data-testid={`text-testimonial-location-${testimonial.id}`}>
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-accent-teal text-navy-dark px-8 py-4 rounded-xl font-semibold hover:bg-mint-green transition-colors shadow-lg" data-testid="button-more-reviews">
            <MessageCircle className="mr-2 h-4 w-4" />
            Read More Reviews
          </Button>
        </div>
      </div>
    </section>
  );
}
