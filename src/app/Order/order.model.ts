import { Schema, model, Document } from "mongoose";

export interface IOrder extends Document {
  order_id: string;
  
  // order_id: Schema.Types.ObjectId; 
  user: Schema.Types.ObjectId; // Reference to User
  items: {
    product: Schema.Types.ObjectId; // Reference to Car (Product)
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  status: "Pending" | "Paid" | "Cancelled";
  transaction: string
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    // order_id: { type: String, required: true },
    // order_id: { type: String, default: function() {
    //   return 'ORDER' + Date.now();  // এটিতে টাইমস্ট্যাম্প যুক্ত করে একটি ইউনিক আইডি তৈরি হবে
    // }},
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Car", required: true },
        
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        
      },
    ],
    
    totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Paid", "Cancelled"], // Add valid status values
    default: "Pending", // Default to "Pending"
  },
  order_id: { type: String}, 
  transaction: {
    id: { type: String },
    transactionStatus: { type: String },
  },
  },
  { timestamps: true }
);

export const Order = model<IOrder>("Order", orderSchema);
