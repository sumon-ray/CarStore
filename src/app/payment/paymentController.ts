// import axios from "axios";
// import crypto from "crypto";
// import dotenv from "dotenv";
// import { Order } from "../Order/order.model";
// import { PaymentInitData } from "./payment.interface";

// dotenv.config();

// // Load environment variables
// const SURJOPAY_API_URL = process.env.SP_ENDPOINT;
// const STORE_ID = process.env.SP_USERNAME;
// const PASSWORD = process.env.SP_PASSWORD;
// const RETURN_URL = process.env.SP_RETURN_URL;

// // Helper function to generate the sign for security purposes
// const generateSign = (
//   storeId: string,
//   password: string,
//   amount: number,
//   orderId: string
// ): string => {
//   return crypto
//     .createHash("md5")
//     .update(storeId + password + amount + orderId)
//     .digest("hex");
// };

// // Initiate Payment function
// // Initiate Payment function
// export const initiatePayment = async (req, res) => {
//   try {
//     // Log incoming request headers and body for debugging
//     console.log("📥 Received headers:", req.headers);
//     console.log("📥 Received body:", req.body);

//     const paymentData: PaymentInitData = req.body;
//     console.log("Received order_id:", paymentData.order_id);

//     // Validate required fields
//     if (
//       !paymentData.amount ||
//       !paymentData.order_id ||
//       !paymentData.customer_name ||
//       !paymentData.customer_phone
//     ) {
//       console.error("❌ Missing required payment fields:", paymentData);
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Fetch the order details from the database using order_id
//     //   const order = await Order.findOne({ order_id: { $regex: new RegExp(`^${paymentData.order_id}$`, 'i') } });
//     const order = await Order.findById(paymentData.order_id);

//     if (!order) {
//       // console.error("❌ Order not found:", paymentData.order_id);
//       return res.status(404).json({ message: "Order not found" });
//     }

//     //   console.log("Searching for order_id:", paymentData.order_id);
//     console.log("Order found:", order);
//     //   db.orders.find({ order_id: "ORDER1740429136553" })

//     // Generate the security sign for the payment
//     const sign = generateSign(
//       STORE_ID,
//       PASSWORD,
//       order.totalPrice,
//       paymentData.order_id
//     );

//     // Construct the payload to send to SurjoPay API
//     const payload = {
//       store_id: STORE_ID,
//       amount: order.totalPrice,
//       order_id: paymentData.order_id,
//       currency: "BDT",
//       customer_name: paymentData.customer_name,
//       customer_phone: paymentData.customer_phone,
//       success_url: `${RETURN_URL}?order_id=${paymentData.order_id}`,
//       fail_url: `${RETURN_URL}/fail`,
//       cancel_url: `${RETURN_URL}/cancel`,
//       sign: sign, // Attach the generated sign here
//     };

//     console.log("Payload to SurjoPay:", payload);

//     // Call the SurjoPay API to initiate payment
//     const response = await axios.post(
//       `${SURJOPAY_API_URL}/api/secret-pay`,
//       payload
//     );

//     console.log("✅ Payment initiated successfully:", response.data);

//     // Send the response back to the client with the API data
//     res.status(200).json(response.data);
//   } catch (error) {
//     // Catch and log any errors during payment initiation
//     console.error("❌ Error in initiatePayment controller:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// // Verify Payment function
// export const verifyPayment = async (req, res) => {
//   try {
//     const { order_id } = req.query;

//     // Check if order_id is provided in the query
//     if (!order_id) {
//       return res.status(400).json({ message: "Order ID is required" });
//     }

//     // Call the SurjoPay API to verify payment
//     // const response = await axios.get(
//     //   `${SURJOPAY_API_URL}/api/verify-payment?order_id=${order_id}`
//     // );

//     // Check payment status and update the order accordingly
//     if (response.data.status === "Success") {
//       // If payment is successful, update the order status to 'Paid'
//       await Order.findByIdAndUpdate(order_id, { status: "Paid" });
//       console.log(
//         `✅ Payment verified for Order ID: ${order_id} - Status: Paid`
//       );
//     } else {
//       // If payment failed, update the order status to 'Failed'
//       await Order.findByIdAndUpdate(order_id, { status: "Failed" });
//       console.log(
//         `❌ Payment failed for Order ID: ${order_id} - Status: Failed`
//       );
//     }

//     // Send the response from the verification back to the client
//     res.status(200).json(response.data);
//   } catch (error) {
//     // Catch and log any errors during payment verification
//     console.error("❌ Error in verifyPayment controller:", error);
//     res.status(500).json({ message: "Payment verification failed." });
//   }
// };
