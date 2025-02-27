import { Request, Response } from "express";
// import { makePaymentAsync } from "../order/order.utils";
import httpStatus from "http-status";
import { makePaymentAsync } from "../Order/order.utils";

export const initiatePayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      amount,
      order_id,
      customer_name,
      customer_address,
      customer_phone,
      customer_city,
      client_ip,
    } = req.body;

    console.log("🔄 Initiating payment with data:", req.body);

    // Ensure required fields are present
    if (
      !amount ||
      !order_id ||
      !customer_name ||
      !customer_address ||
      !customer_phone ||
      !customer_city ||
      !client_ip
    ) {
      res
        .status(400)
        .json({ message: "All fields are required for payment initiation" });
      return;
    }

    // Send payment request to ShurjoPay
    const paymentResponse = await makePaymentAsync({
      amount,
      order_id,
      currency: "BDT",
      customer_name,
      customer_phone,
      customer_address,
      customer_city,
      client_ip,
    });

    // console.log("✅ Payment initiation successful:", paymentResponse);

    res.status(httpStatus.OK).json({
      message: "Payment initiated successfully",
      checkoutUrl: paymentResponse.checkout_url,
    });
  } catch (error) {
    console.error("❌ Error initiating payment:", error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to initiate payment" });
  }
};
