declare module "shurjopay" {
  interface ShurjoPay {
    config(
      endpoint: string,
      username: string,
      password: string,
      prefix: string,
      returnUrl: string
    ): void;

    makePayment(
      paymentDetails: {
        amount: number;
        order_id: string;
        customer_name: string;
        customer_address: string;
        client_ip: string;
        customer_phone: string;
        customer_city: string;
        customer_post_code: string;
      },
      onSuccess: (response_data: any) => void,
      onError: (error: any) => void
    ): void;

    verifyPayment(
      order_id: string,
      onSuccess: (response_data: any) => void,
      onError: (error: any) => void
    ): void;
  }

  function spfactory(): ShurjoPay;
  export default spfactory;
}
