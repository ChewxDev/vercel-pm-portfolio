import { QueryClient } from "@tanstack/react-query";
import { projects } from "../data/projects";
import { resources } from "../data/resources";

// Create query client for static data
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // Static data never goes stale
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    },
  },
});

// Mock API responses for static data
export const staticApi = {
  getProjects: () => Promise.resolve(projects),
  getResources: () => Promise.resolve(resources),
  
  // Mock contact form submission
  submitContact: async (data: any) => {
    // In a real static site, this would integrate with a service like Formspree or Netlify Forms
    console.log("Contact form submission:", data);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, always resolve successfully
    return Promise.resolve({ 
      success: true, 
      message: "Thank you for your message! I'll get back to you soon." 
    });
  }
};

// Override the default fetcher to use static data
export const defaultFetcher = async (url: string) => {
  if (url === '/api/projects') {
    return staticApi.getProjects();
  }
  if (url === '/api/resources') {
    return staticApi.getResources();
  }
  throw new Error(`No static data available for ${url}`);
};