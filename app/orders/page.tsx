import Container from "@/app/components/Container";
import React, { Suspense } from "react";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
import OrderClient from "./OrderClient";

const Orders = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <NullData title="Oops! access denied " />;
  }
  const orders = await getOrdersByUserId(currentUser.id);

  if (!orders) {
    return <NullData title="No orders yet ... " />;
  }
  return (
    <div className="pt-8">
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <OrderClient orders={orders} />
        </Suspense>
      </Container>
    </div>
  );
};

export default Orders;
