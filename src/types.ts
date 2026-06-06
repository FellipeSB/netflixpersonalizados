export interface Product {
  id: string;
  title: string;
  sectionId: string;
  subtitle?: string;
  tagline?: string;
  images: string[];
  description: string;
  features?: string[]; // E.g., ["Cerâmica importada de alto brilho", "Pode ir ao micro-ondas"]
  badge?: string; // E.g., "Mais Vendido", "Novidade", "Edição Limitada"
  price?: number; // R$ price of the product
  hasNames?: boolean; // Toggle "Nomes do Casal" input
  hasPhotoUpload?: boolean; // Toggle photo upload instructions
  hasMusicSpotify?: boolean; // Toggle Spotify song input
  hasCustomDate?: boolean; // Toggle Anniversary date input
  hasMagicReveal?: boolean; // Toggle magic effect message/features
  hasPackaging?: boolean; // Toggle option to choose packaging step
  isFeatured?: boolean; // Toggle to show product in the high-converting auto-carousel
}

export interface Section {
  id: string;
  title: string;
  subtitle: string;
  products: Product[];
}

export interface Testimonial {
  id: string;
  author: string;
  date: string;
  avatar: string;
  messages: {
    sender: 'customer' | 'store';
    text: string;
    time: string;
  }[];
}

export interface PackagingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}
