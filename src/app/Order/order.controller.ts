import { Request, Response } from "express";
import { createOrder, getAllOrders } from "./order.service";
import httpStatus from "http-status";

export const createOrderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id; // Assuming authentication middleware attaches user
    const { items, paymentMethod, client_ip, user, customer_name, customer_address, customer_phone, customer_city } = req.body;

    // Log the received order data for debugging
    // console.log("Received order data:", req.body);

    // Ensure that necessary fields are present
    if (!items?.length || !paymentMethod || !client_ip || !customer_name || !customer_address || !customer_phone || !customer_city) {
      console.log("⚠️ Missing required fields:", { items, paymentMethod, client_ip, customer_name, customer_address, customer_phone, customer_city });
      res.status(400).json({ message: "All fields (items, payment method, and customer info) are required" });
      return;
    }

    console.log("🛒 Creating order for user:", userId);

    // Pass necessary customer data to createOrder function
    const checkoutUrl = await createOrder(userId, items, paymentMethod, client_ip, {
      name: customer_name,
      email: user.email,
      phone: customer_phone,
      address: customer_address,
      city: customer_city,
    });

    console.log("✅ Order created successfully. Checkout URL:", checkoutUrl);

    res.status(httpStatus.CREATED).json({
      message: "Order created successfully",
      checkoutUrl, // Return checkout URL without payment verification
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    console.error("❌ Error creating order:", errorMessage);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
  }
};

export const getAllOrdersController = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Fetching all orders");

    const orders = await getAllOrders(); // Assuming you have a service function to get all orders

    // Log the fetched orders
    console.log("Fetched orders:", orders);

    res.status(httpStatus.OK).json(orders);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    // Log the error
    console.error("Error fetching orders:", errorMessage);

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
  }
};
