export interface ICar {
  _id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}
