import Shurjopay, { PaymentResponse } from "shurjopay";
import axios from "axios";
import config from "../config";

const shurjopay = new Shurjopay();

// ✅ Configure ShurjoPay once during initialization
shurjopay.config(
  config.sp.sp_endpoint!,
  config.sp.sp_username!,
  config.sp.sp_password!,
  config.sp.sp_prefix!,
  config.sp.sp_return_url!
);

// ✅ Function to Get ShurjoPay Token
export const getShurjoPayToken = async (): Promise<string | null> => {
  try {
    console.log("🔄 Requesting ShurjoPay token...");

    const response = await axios.post(
      "https://sandbox.shurjopayment.com/api/get_token",
      {
        username: config.sp.sp_username,
        password: config.sp.sp_password,
      },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    if (response.data?.token) {
      console.log("✅ ShurjoPay Token:", response.data.token);
      return response.data.token;
    }

    throw new Error("Failed to get ShurjoPay token");
  } catch (error: any) {
    console.error("❌ Error getting ShurjoPay token:", error?.response?.data || error);
    return null;
  }
};

// ✅ Make Payment Function
export const makePaymentAsync = async (paymentPayload: any): Promise<PaymentResponse> => {
  return new Promise(async (resolve, reject) => {
    if (!paymentPayload.order_id) {
      reject(new Error("Order ID is required in the payment payload"));
      return;
    }

    const token = await getShurjoPayToken();
    if (!token) {
      reject(new Error("Failed to retrieve ShurjoPay token"));
      return;
    }

    shurjopay.makePayment(
      { ...paymentPayload, token }, // Include token in payload
      (response: PaymentResponse) => {
        console.log("✅ ShurjoPay Payment Response:", response);
        
        if (response?.transactionStatus === "Initiated") {
          resolve(response);
        } else {
          reject(new Error("Payment failed or status not successful"));
        }
      },
      (error: any) => {
        console.error("❌ Shurjopay Payment Error:", error);
        reject(new Error(`Payment Error: ${error}`));
      }
    );
  });
};

// ✅ Verify Payment Function
export const verifyPaymentAsync = async (sp_order_id: string) => {
    try {
      if (!sp_order_id) throw new Error("ShurjoPay order ID is required.");
  
      const token = await getShurjoPayToken();
      if (!token) throw new Error("ShurjoPay token not available");
  
      console.log(`🔄 Verifying Payment for ShurjoPay Order ID: ${sp_order_id}`);
  
      const response = await axios.post(
        "https://sandbox.shurjopayment.com/api/verification",
        { order_id: sp_order_id, token },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
  
      console.log("✅ ShurjoPay Verification Response:", response.data);
  
      if (!response.data || response.data.length === 0) {
        throw new Error("Invalid verification response from ShurjoPay.");
      }
  
      return response.data[0]; // Returning first object from array response
    } catch (error: any) {
      console.error("❌ Error verifying payment:", error.response?.data || error);
      return { sp_code: "9999", message: "Verification failed due to server error" };
    }
  };
  

// ✅ Export utility functions
export const orderUtils = {
  makePaymentAsync,
  verifyPaymentAsync,
};
