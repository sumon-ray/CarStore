// // car.model.ts
// import mongoose, { Schema} from 'mongoose';
import { Schema, model } from "mongoose";
import { ICar } from './car.interface';

const carSchema = new Schema<ICar>(
  {
    name: { type: String, required: true, trim: true }, // Car name
    brand: { type: String, required: true, trim: true }, // Car brand (e.g., Toyota, BMW)
    model: { type: String, required: true, trim: true }, // Model of the car (e.g., Corolla 2022)
    category: { type: String, required: true, trim: true }, 
    price: { type: Number, required: true }, // Price of the car
    stock: { type: Number, required: true, default: 1 }, // Available stock
    description: { type: String, required: true }, 
    image: { type: String, required: true }, // Car image URL
    isAvailable: { type: Boolean, default: true }, // Availability status
 
  },
  { timestamps: true }
);

export const Car = model<ICar>('Car', carSchema);
// export const Car = model("Car", carSchema);
