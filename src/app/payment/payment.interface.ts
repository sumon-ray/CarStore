export interface PaymentInitData {
    amount: number;
    order_id: string;
    customer_name: string;
    customer_phone: string;
  }
  
  export interface PaymentVerifyData {
    order_id: string;
  }
  