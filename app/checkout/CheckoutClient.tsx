"use client";

import { useCart } from "@/hooks/useCart";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/Button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (cartProducts) {
      setLoading(true);
      setError(false);
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((response) => {
          setLoading(false);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          if (response.status === 401) {
            return router.push("/login");
          }
          return response.json();
        })
        .then((data) => {
          if (!data || !data.paymentIntent || !data.paymentIntent.id) {
            throw new Error("Invalid data received");
          }
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
        })
        .catch((err) => {
          setError(true);
          console.error("Fetch error:", err);
          toast.error("Something went wrong.");
        });
    }
  }, [cartProducts, paymentIntent]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };
  const handlePaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);
  return (
    <div className="w-full">
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handlePaymentSuccess}
          />
        </Elements>
      )}

      {loading && <div className="text-center">Loading Checkout</div>}
      {error && <div className="text-center">Something went wrong...</div>}
      {paymentSuccess && (
        <div className="flex items-center flex-col gap-4">
          <div className="text-teal-500 text-center">Payment Success</div>
          <div className="max-w-[220px] w-full">
            <Button
              label="view your Orders"
              onClick={() => router.push("/order")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;
