/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Page = 'home' | 'about' | 'services' | 'portfolio' | 'process' | 'testimonials' | 'blog' | 'contact';

export interface Project {
  id: string;
  title: string;
  category: 'architecture' | 'interior' | 'turnkey' | 'farm';
  categoryLabel: string;
  location: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  year?: string;
  squareFt?: string;
  description: string;
  approach?: string;
  challenge?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  projectTag: string;
  rating: number;
  city: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  readTime: string;
  content: string[];
}

export interface ServiceDetail {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  body: string;
  subServices: string[];
  image: string;
}

export interface VastuStep {
  step: string;
  title: string;
  desc: string;
}

export interface ContactForm {
  fullName: string;
  phone: string;
  email: string;
  projectType: string;
  city: string;
  budget: string;
  description: string;
  source: string;
}
