import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Phone, Mail, MapPin, Clock, Headphones } from "lucide-react";
import type { InsertContactSubmission } from "@shared/schema";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  
  const { toast } = useToast();

  const submitMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    submitMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Facility",
      content: "Industrial Area, Gurgaon\nHaryana, India"
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon-Fri: 9AM-6PM\nSat: 9AM-4PM"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      content: "support@cleanblue.in\nEmergency: +91-8888-123456"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-navy-dark" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white mb-12">
          <h2 className="text-4xl font-bold mb-4" data-testid="text-contact-title">
            Ready to Experience CleanBlue?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto" data-testid="text-contact-description">
            Join thousands of satisfied customers who have made the switch to advanced water technology. 
            Start your journey to better hydration today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold text-deep-gray mb-6" data-testid="text-contact-form-title">
              Send us a message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  data-testid="input-contact-name"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  data-testid="input-contact-email"
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  data-testid="input-contact-phone"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message *"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                  rows={4}
                  data-testid="textarea-contact-message"
                />
              </div>
              <Button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full bg-accent-teal text-navy-dark hover:bg-mint-green"
                data-testid="button-submit-contact"
              >
                {submitMutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Quick Contact */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-accent-teal text-navy-dark px-8 py-4 rounded-xl font-semibold hover:bg-mint-green transition-colors shadow-lg flex-1"
                data-testid="button-call-now"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Now: +91-9999-123456
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-navy-dark transition-colors flex-1"
                data-testid="button-free-sample"
              >
                <Mail className="mr-2 h-4 w-4" />
                Get Free Sample
              </Button>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="bg-white/10 p-6 rounded-xl" data-testid={`contact-info-${index}`}>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <IconComponent className="text-xl text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-2" data-testid={`text-contact-info-title-${index}`}>
                          {info.title}
                        </h3>
                        <p className="text-blue-100 whitespace-pre-line" data-testid={`text-contact-info-content-${index}`}>
                          {info.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
