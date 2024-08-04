export interface Billboard {
    id: number;
    name: string;
    description: string;
    longitude: number;
    latitude: number;
    location: string;
    dimensions: string;
    side: string;
    price: number;
    images: string[];
    type: {
      id: number;
      name: string;
    } | null;
  }
  
  export interface BillboardType {
    id: number;
    name: string;
  }