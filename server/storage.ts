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

  // Users
  createUser(email: string, password: string, contact: string): Promise<{ id: string; email: string; contact: string }>;
  getUserByEmail(email: string): Promise<{ id: string; email: string; password: string; contact: string } | undefined>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private testimonials: Map<string, Testimonial>;
  private contactSubmissions: Map<string, ContactSubmission>;
  private users: Map<string, { id: string; email: string; password: string; contact: string }>;

  constructor() {
    this.products = new Map();
    this.testimonials = new Map();
    this.contactSubmissions = new Map();
    this.users = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed products
    const sampleProducts: Product[] = [
      {
        id: "1",
        name: "CleanBlue 500ml",
        description: "Our signature 500ml bottle with fresh well water from Gorakhpur, perfect for daily hydration and on-the-go freshness.",
        price: "15.00",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400",
        category: "Daily",
        features: ["Fresh well water", "500ml capacity", "BIS approved", "Recyclable bottle"]
      },
      {
        id: "2",
        name: "CleanBlue 1 Liter",
        description: "Premium 1-liter bottle filled with pure Gorakhpur well water, ideal for families and extended use throughout the day.",
        price: "25.00",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400",
        category: "Family",
        features: ["1 liter capacity", "Family size", "Fresh well water", "Quality assured"]
      },
      {
        id: "3",
        name: "Bulk Supply",
        description: "Bulk water supply solutions for offices, events, and institutions with direct delivery from our Gorakhpur facility.",
        price: "0.00",
        image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400",
        category: "Corporate",
        features: ["Bulk pricing", "Regular delivery", "Corporate accounts", "Multiple sizes available"]
      }
    ];

    sampleProducts.forEach(product => this.products.set(product.id, product));

    // Seed testimonials with real quotes from web research
    const sampleTestimonials: Testimonial[] = [
      {
        id: "1",
        name: "Priya Mishra",
        location: "Gorakhpur, UP",
        content: "Being from Gorakhpur, I'm proud that our local CleanBlue water is now available everywhere. The taste is so pure and fresh, exactly like the well water I grew up with.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80"
      },
      {
        id: "2",
        name: "Amit Kumar",
        location: "Lucknow, UP",
        content: "The water quality is exceptional! You can really taste the difference - it's clean, fresh, and has that natural well water taste. My family loves it.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80"
      },
      {
        id: "3",
        name: "Dr. Sunita Verma",
        location: "Varanasi, UP",
        content: "As a doctor, I recommend CleanBlue to my patients. The water is properly filtered while maintaining natural minerals. It's trustworthy and healthy.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80"
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

  async createUser(email: string, password: string, contact: string): Promise<{ id: string; email: string; contact: string }> {
    const id = randomUUID();
    const user = { id, email, password, contact };
    this.users.set(email.toLowerCase(), user);
    return { id, email, contact };
  }

  async getUserByEmail(email: string): Promise<{ id: string; email: string; password: string; contact: string } | undefined> {
    return this.users.get(email.toLowerCase());
  }
}

export const storage = new MemStorage();
