import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../lib/store";
import { initiatePayment, verifyPayment } from "../../lib/slices/payment/paymentApiSlice";
import { useEffect } from "react";

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

const BuyNowButton = ({ amount, setIsPaid }: { amount: number; setIsPaid: (isPaid: boolean) => void }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay script loaded!");
    };
    document.body.appendChild(script);
  }, []);

  const handleBuyNow = async () => {
    try {
      const resultAction = await dispatch(initiatePayment({ amount }));

      if (initiatePayment.fulfilled.match(resultAction)) {
        const { orderId } = resultAction.payload;

        const options = {
          key: RAZORPAY_KEY_ID,
          amount: amount * 100,
          currency: "INR",
          name: "AI Chat Access",
          description: "Unlock premium AI chat access",
          order_id: orderId,
          handler: async function (response: any) {
            // Send payment details to the backend
            dispatch(verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              setIsPaid
            }))
          },
          theme: { color: "#3399cc" },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      }
    } catch (error) {
      console.error("Razorpay Checkout Error:", error);
    }
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleBuyNow}>
      Buy Now
    </Button>
  );
};

export default BuyNowButton;