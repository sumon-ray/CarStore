import { Request, Response } from "express";
import httpStatus from "http-status";
import { getOrderByUserId } from "./order.service"; // Assuming you import the service functions properly

export const getSingleOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      res.status(httpStatus.BAD_REQUEST).json({ message: "User ID is required" });
      return;
    }

    console.log("Fetching orders for user:", userId);

    const orders = await getOrderByUserId(userId); // Passing the userId to the service function

    // Log the fetched orders
    console.log("Fetched orders:", orders);

    res.status(httpStatus.OK).json(orders);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";

    // Log the error
    console.error("Error fetching orders:", errorMessage);

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
  }
};
