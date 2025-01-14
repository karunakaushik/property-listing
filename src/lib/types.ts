export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  specs: {
    beds: number;
    baths: number;
    area: number;
  };
  images: string[];
  status: "available" | "sold" | "pending";
  isFavorite?: boolean;
}

export interface FilterParams {
  location?: string;
  priceRange?: [number, number];
  beds?: number;
  baths?: number;
}
