import { Car } from "../Car/car.model";
import { Order } from "./order.model";
import httpStatus from "http-status";
import { orderUtils } from "./order.utils";
import AppError from "../errors/AppError";
import { Types } from "mongoose";

export const createOrder = async (
  userId: string,
  items: { product: string; quantity: number }[],
  paymentMethod: "cash" | "card",
  client_ip: string,
  user: { name: string; email: string; phone: string; address: string; city: string }
) => {
  if (!items.length) throw new AppError(httpStatus.NOT_ACCEPTABLE, "Order is empty");

  let totalPrice = 0;

  // Step 1: Validate stock and calculate total price
  for (const item of items) {
    if (!Types.ObjectId.isValid(item.product)) {
      throw new AppError(httpStatus.BAD_REQUEST, `❌ Invalid product ID: ${item.product}`);
    }

    const productId = new Types.ObjectId(item.product);
    const car = await Car.findById(productId);

    if (!car) throw new AppError(httpStatus.NOT_FOUND, "❌ Car not found");
    if (car.stock < item.quantity) {
      throw new AppError(httpStatus.BAD_REQUEST, `⚠️ Not enough stock for ${car.name}`);
    }

    totalPrice += item.quantity * car.price;
  }

  // Step 2: Create Order with "Pending" status
  let newOrder = await Order.create({
    user: userId,
    items: items.map((item) => ({
      product: new Types.ObjectId(item.product),
      quantity: item.quantity,
      price: totalPrice,
    })),
    totalPrice,
    paymentMethod,
    status: "Pending",
    order_id: new Types.ObjectId().toString(),
  });

  console.log("📌 Order ID sent to ShurjoPay:", newOrder.order_id);

  // Step 3: Send Payment Request to ShurjoPay
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: newOrder.order_id,
    currency: "BDT",
    customer_name: user.name,
    customer_email: user.email,
    customer_phone: user.phone,
    customer_address: user.address,
    customer_city: user.city,
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
  console.log("📌 ShurjoPay Payment Response:", JSON.stringify(payment, null, 2));

  if (payment?.sp_order_id) {
    console.log("🛠 ShurjoPay Order ID:", payment.sp_order_id);
  } else {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "❌ No order ID returned from ShurjoPay");
  }

  // Return the checkout_url without verifying the payment
  return payment.checkout_url;
};

export const getAllOrders = async () => {
  return await Order.find().populate("items.product");
};




export const getOrderByUserId = async (userId: string) => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "❌ Invalid user ID");
  }

  // Use find() instead of findOne to get all orders for the user
  const orders = await Order.find({ user: userId }).populate("items.product");

  if (orders.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Sorry No orders found for this user");
  }

  return orders; // Return all orders
};
