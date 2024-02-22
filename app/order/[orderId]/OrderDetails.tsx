"use client";

import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

interface OrderDetailsProps {
  order: Order;
}
const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <>
      <div className="max-w-[1150px] m-auto flex flex-col gap-2">
        <div className="mt-8">
          <Heading title="Order Details" />
        </div>
        <div className="">Order ID: {order.id}</div>

        <div className="font-bold">
          Total Amount :<span>{formatPrice(order.amount)}</span>
        </div>

        <div className="flex gap-2 items-center">
          <div>Payment status:</div>
          <div>
            {order.status === "pending" ? (
              <Status
                icon={MdAccessTimeFilled}
                text="pending"
                bg="bg-zinc-400"
                color="bg-slate-700"
              />
            ) : order.status === "complete" ? (
              <Status
                icon={MdDone}
                text="completed"
                bg="bg-green-300"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div>Delivery status:</div>
          <div>
            {order.deliveryStatus === "pending" ? (
              <Status
                icon={MdAccessTimeFilled}
                text="pending"
                bg="bg-zinc-400"
                color="bg-slate-700"
              />
            ) : order.deliveryStatus === "dispatched" ? (
              <Status
                icon={MdDeliveryDining}
                text="dispatched"
                bg="bg-purple-200"
                color="bg-purple-700"
              />
            ) : order.deliveryStatus === "delivered" ? (
              <Status
                icon={MdDone}
                text="delivered"
                bg="bg-green-300"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div>Date: {moment(order.createDate).fromNow()}</div>
        <div>
          <h2 className="font-semibold mt-4 mb-2">Products ordered</h2>
          <div className="grid grid-cols-5 text-xs gap-4 items-center">
            <div className="col-span-2 justify-self-start">PRODUCT</div>
            <div className="justify-self-center">PRICE</div>
            <div className=" justify-self-center">QTY</div>
            <div className=" justify-self-end">TOTAL</div>
          </div>

          {order.products &&
            order.products.map((item) => {
              return <OrderItem key={item.id} item={item} />;
            })}
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
