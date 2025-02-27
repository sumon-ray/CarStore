import express from "express";
// import { authMiddleware } from "../middlewares/auth.middleware"; // Protect routes with authentication
import { authenticate } from "../middlwares/authenticate";
import {
  createOrderController,
  getAllOrdersController,
} from "./order.controller";
import { getSingleOrderById } from "./getOrderByUserId";
// import { authorize } from "../middlwares/authorize";

const router = express.Router();

// Create order (Authenticated users only)
router.post("/", authenticate, createOrderController);
router.get("/all-order", getAllOrdersController);
router.get("/:userId", getSingleOrderById);






export const orderCar =  router;



