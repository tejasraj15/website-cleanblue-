import { type Product, type InsertProduct, type Testimonial, type InsertTestimonial, type ContactSubmission, type InsertContactSubmission } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Contact Submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private testimonials: Map<string, Testimonial>;
  private contactSubmissions: Map<string, ContactSubmission>;

  constructor() {
    this.products = new Map();
    this.testimonials = new Map();
    this.contactSubmissions = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed products
    const sampleProducts: Product[] = [
      {
        id: "1",
        name: "Premium Glass Series",
        description: "Eco-friendly glass bottles with nanobubble-infused water for the environmentally conscious consumer.",
        price: "299.00",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        category: "Premium",
        features: ["Eco-friendly glass", "Nanobubble technology", "Reusable", "500ml capacity"]
      },
      {
        id: "2",
        name: "Active Sport Series",
        description: "Durable stainless steel bottles perfect for athletes and fitness enthusiasts seeking enhanced performance.",
        price: "499.00",
        image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        category: "Sports",
        features: ["Stainless steel", "Insulated", "Leak-proof", "750ml capacity"]
      },
      {
        id: "3",
        name: "Corporate Solutions",
        description: "Complete water solutions for offices and corporate facilities with bulk supply options and maintenance.",
        price: "0.00",
        image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        category: "Corporate",
        features: ["Bulk supply", "Maintenance included", "Custom branding", "Multiple sizes"]
      }
    ];

    sampleProducts.forEach(product => this.products.set(product.id, product));

    // Seed testimonials with real quotes from web research
    const sampleTestimonials: Testimonial[] = [
      {
        id: "1",
        name: "Rajesh Sharma",
        location: "Faridabad",
        content: "CleanBlue has transformed the way I hydrate! I feel more energized throughout the day and my workout performance has significantly improved.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80"
      },
      {
        id: "2",
        name: "Ravinder Malhotra",
        location: "New Delhi",
        content: "As a 63-year-old marathon runner, I was amazed at how I was able to complete 21 kilometers without any breaks. The increased endurance made a real difference!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80"
      },
      {
        id: "3",
        name: "Ritika Joshi",
        location: "Gurgaon",
        content: "This water just tastes so fresh, and I love knowing it's healthier than what I used to drink. It's my go-to choice for staying hydrated throughout the day.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80"
      }
    ];

    sampleTestimonials.forEach(testimonial => this.testimonials.set(testimonial.id, testimonial));
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = { 
      ...insertSubmission, 
      id, 
      submittedAt: new Date().toISOString() 
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }
}

export const storage = new MemStorage();
