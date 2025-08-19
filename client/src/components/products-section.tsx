import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Phone } from "lucide-react";
import type { Product } from "@shared/schema";

export default function ProductsSection() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  if (isLoading) {
    return (
      <section id="products" className="py-20 bg-gray-50" data-testid="products-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-deep-gray mb-4">Our Product Range</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20 bg-gray-50" data-testid="products-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-deep-gray mb-4" data-testid="text-products-title">
            Our Product Range
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-products-description">
            Discover our complete collection of premium water products designed for every lifestyle and need.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              data-testid={`card-product-${product.id}`}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover"
                data-testid={`img-product-${product.id}`}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-deep-gray mb-2" data-testid={`text-product-name-${product.id}`}>
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4" data-testid={`text-product-description-${product.id}`}>
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary-blue" data-testid={`text-product-price-${product.id}`}>
                    {product.price === "0.00" ? "Custom" : `₹${product.price}`}
                  </span>
                  {product.category === "Corporate" ? (
                    <Button 
                      className="bg-accent-teal text-white hover:bg-teal-700"
                      data-testid={`button-quote-${product.id}`}
                    >
                      <Phone className="mr-1 h-4 w-4" />
                      Get Quote
                    </Button>
                  ) : (
                    <Button 
                      className="bg-primary-blue text-white hover:bg-blue-700"
                      data-testid={`button-add-cart-${product.id}`}
                    >
                      <ShoppingCart className="mr-1 h-4 w-4" />
                      Add to Cart
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
