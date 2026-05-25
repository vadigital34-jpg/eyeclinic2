export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: string; // lucide icon name
  treatments: string[];
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  imgUrl: string;
  qualification: string;
  experience: string;
  specialization: string;
  bio: string;
  languages: string[];
}

export interface Technology {
  id: string;
  name: string;
  tagline: string;
  description: string;
  useCase: string;
  imgUrl: string;
}

export interface VisionTip {
  id: string;
  title: string;
  category: "daily" | "screen" | "diet" | "prevention";
  benefit: string;
  action: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  location: string;
  treatment: string;
  rating: number;
  text: string;
  verified: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "exams" | "surgery" | "lasik" | "emergency";
}
