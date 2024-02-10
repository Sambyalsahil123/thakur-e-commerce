"use client";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const router = useRouter();
  console.log(paymentIntent, "paymentIntent");
  console.log(clientSecret, "client secret");

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
          if (response.status === 401) {
            return router.push("/login");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data, "this is DATA");
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
        })
        .catch((err) => {
          setError(true);
          console.error("Fetch error:", err);
          toast.error("Something went wrong.");
        });
    }
  }, [cartProducts, handleSetPaymentIntent, paymentIntent, router]);

  return <>CHECKOUT{clientSecret}</>;
};

export default CheckoutClient;
