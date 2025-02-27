import express from "express";
import { authenticate } from "../middlwares/authenticate";
import { initiatePayment } from "./payment.controller";



const router = express.Router();

// Routes for initiating 
router.post("/initiate", authenticate,initiatePayment);

export const paymentRoutes = router;
