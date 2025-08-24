import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface ContactForm {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  timeline: string;
  budget: string;
  message: string;
}

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    timeline: "",
    budget: "",
    message: "",
  });

  const submitContactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for your inquiry. I'll get back to you soon!",
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "",
        timeline: "",
        budget: "",
        message: "",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error Sending Message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.projectType ||
      !formData.timeline ||
      !formData.budget ||
      !formData.message
    ) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    submitContactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-3xl font-bold text-gray-900 mb-4"
            data-testid="contact-title"
          >
            Let's Discuss Your Project
          </h2>
          <p
            className="text-xl text-neutral max-w-3xl mx-auto"
            data-testid="contact-description"
          >
            Ready to transform your project management approach? Get in touch to
            explore how I can help drive your next initiative to success.
          </p>
        </div>

        {/* Why Contact Me Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why Partner With Me?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              I bring proven expertise and a track record of delivering
              measurable results across diverse industries
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-chart-line text-white text-xl"></i>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Proven Results
              </h4>
              <p className="text-gray-700 text-sm">
                92% of projects delivered within budget and timeline. Over $5M
                in cost savings generated through process optimization.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-users text-white text-xl"></i>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Cross-Industry Expertise
              </h4>
              <p className="text-gray-700 text-sm">
                Successfully managed projects across retail, technology,
                financial services, and digital media sectors.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-rocket text-white text-xl"></i>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Rapid Implementation
              </h4>
              <p className="text-gray-700 text-sm">
                Agile approach with 24-48 hour response time. Get your project
                moving forward quickly with clear milestones.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-xl shadow-lg text-white">
            <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-4">
                  Contact Information
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="bg-white/20 p-2 rounded-lg mr-4">
                      <i className="fas fa-envelope text-white"></i>
                    </div>
                    <div>
                      <p className="text-sm text-blue-100">Email</p>
                      <a
                        href="mailto:nicholascents77@gmail.com"
                        className="hover:text-blue-200 transition-colors"
                      >
                        nicholascents77@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="bg-white/20 p-2 rounded-lg mr-4">
                      <i className="fas fa-phone text-white"></i>
                    </div>
                    <div>
                      <p className="text-sm text-blue-100">Phone (US)</p>
                      <span>+1 (786) 708-7622</span>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="bg-white/20 p-2 rounded-lg mr-4">
                      <i className="fas fa-phone text-white"></i>
                    </div>
                    <div>
                      <p className="text-sm text-blue-100">Phone (Nigeria)</p>
                      <span>+234 807 884 8896</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-4">Connect With Me</h4>
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href="https://linkedin.com/in/nicholas-njoku"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 p-4 rounded-lg text-center hover:bg-white/20 transition-all hover:scale-105"
                  >
                    <i className="fab fa-linkedin text-2xl mb-2 block"></i>
                    <span className="text-xs">LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/nicholas-njoku"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 p-4 rounded-lg text-center hover:bg-white/20 transition-all hover:scale-105"
                  >
                    <i className="fab fa-github text-2xl mb-2 block"></i>
                    <span className="text-xs">GitHub</span>
                  </a>
                  <a
                    href="https://twitter.com/nicholas_njoku"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 p-4 rounded-lg text-center hover:bg-white/20 transition-all hover:scale-105"
                  >
                    <i className="fab fa-twitter text-2xl mb-2 block"></i>
                    <span className="text-xs">Twitter</span>
                  </a>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                <div className="flex items-center mb-2">
                  <i className="fas fa-clock mr-2"></i>
                  <h4 className="font-medium">Response Time</h4>
                </div>
                <p className="text-blue-100 text-sm">
                  24-48 hours guaranteed response • Urgent projects prioritized
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Start a Conversation
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your full name"
                    className="focus:ring-blue-500 focus:border-blue-500"
                    data-testid="input-name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your@email.com"
                    className="focus:ring-blue-500 focus:border-blue-500"
                    data-testid="input-email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company/Organization
                </label>
                <Input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Your company name (optional)"
                  className="focus:ring-blue-500 focus:border-blue-500"
                  data-testid="input-company"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type *
                  </label>
                  <Select
                    value={formData.projectType}
                    onValueChange={(value) =>
                      handleInputChange("projectType", value)
                    }
                  >
                    <SelectTrigger
                      className="focus:ring-blue-500 focus:border-blue-500"
                      data-testid="select-project-type"
                    >
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital-transformation">
                        Digital Transformation
                      </SelectItem>
                      <SelectItem value="process-improvement">
                        Process Improvement
                      </SelectItem>
                      <SelectItem value="system-implementation">
                        System Implementation
                      </SelectItem>
                      <SelectItem value="change-management">
                        Change Management
                      </SelectItem>
                      <SelectItem value="consulting">PM Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline *
                  </label>
                  <Select
                    value={formData.timeline}
                    onValueChange={(value) =>
                      handleInputChange("timeline", value)
                    }
                  >
                    <SelectTrigger
                      className="focus:ring-blue-500 focus:border-blue-500"
                      data-testid="select-timeline"
                    >
                      <SelectValue placeholder="Timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">
                        Immediate (&lt; 1 month)
                      </SelectItem>
                      <SelectItem value="short-term">
                        Short-term (1-3 months)
                      </SelectItem>
                      <SelectItem value="medium-term">
                        Medium-term (3-6 months)
                      </SelectItem>
                      <SelectItem value="long-term">
                        Long-term (6+ months)
                      </SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range *
                  </label>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) =>
                      handleInputChange("budget", value)
                    }
                  >
                    <SelectTrigger
                      className="focus:ring-blue-500 focus:border-blue-500"
                      data-testid="select-budget"
                    >
                      <SelectValue placeholder="Budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-10k">Under $10k</SelectItem>
                      <SelectItem value="10k-25k">$10k - $25k</SelectItem>
                      <SelectItem value="25k-50k">$25k - $50k</SelectItem>
                      <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                      <SelectItem value="over-100k">$100k+</SelectItem>
                      <SelectItem value="discussion">
                        Open to Discussion
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Details *
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell me about your project, challenges, goals, and how I can help..."
                  rows={5}
                  className="focus:ring-blue-500 focus:border-blue-500"
                  data-testid="textarea-message"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={submitContactMutation.isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                data-testid="button-submit"
              >
                {submitContactMutation.isPending ? (
                  <>
                    <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
