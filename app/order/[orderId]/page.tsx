import Container from "@/app/components/Container";
import React from "react";
import OrderDetails from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";

interface IParams {
  orderId?: string;
}

const Order = async ({ params }: { params: IParams }) => {
  if (!params.orderId) {
    return <NullData title="Order ID is missing" />;
  }

  const order = await getOrderById({ orderId: params.orderId });

  if (!order) return <NullData title="No order" />;
  return (
    <div className="p-8">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
};

export default Order;
