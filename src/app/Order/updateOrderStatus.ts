import { Request, Response } from "express";
import { Order } from "./order.model";
// import { updateOrderStatus } from "./order.service"; // Assuming this is in the service

export const cancelOrderController = async (req: Request, res: Response) => {
  const { orderId } = req.params; // Get order ID from params

  try {
    // Call service function to check if the order is still pending and update status
    // await updateOrderStatus(orderId, 'Canceled');

    res.status(200).json({
      message: "Order successfully canceled",
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    res.status(400).json({ message: errorMessage });
  }
};
