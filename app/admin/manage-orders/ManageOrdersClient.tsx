"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";
import { formatPrice } from "@/utils/formatPrice";
import { Order, User } from "@prisma/client";

interface ManageOrdersClientProps {
  orders: ExtendedOrder[];
}
type ExtendedOrder = Order & {
  user: User | null;
};

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
  const router = useRouter();

  let rows: any = [];

  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user ? order.user.name : "Unknown User",
        amount: formatPrice(order.amount / 100),
        paymentStatus: order.status,
        date: moment(order.createDate).fromNow(),
        deliveryStatus: order.deliveryStatus,
      };
    });
  }
  let columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "customer", headerName: "Customer Name", width: 130 },
    {
      field: "amount",
      headerName: "Amount(USD)",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.amount}</div>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.paymentStatus === "pending" ? (
              <Status
                icon={MdAccessTimeFilled}
                text="pending"
                bg="bg-slate-200"
                color="bg-white-700"
              />
            ) : params.row.paymentStatus === "complete" ? (
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
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.deliveryStatus === "pending" ? (
              <Status
                icon={MdAccessTimeFilled}
                text="pending"
                bg="bg-zinc-400"
                color="bg-slate-700"
              />
            ) : params.row.deliveryStatus === "dispatched" ? (
              <Status
                icon={MdDeliveryDining}
                text="dispatched"
                bg="bg-purple-200"
                color="bg-purple-700"
              />
            ) : params.row.deliveryStatus === "delivered" ? (
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
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 130,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full ">
            <ActionBtn
              icon={MdDeliveryDining}
              onClick={() => {
                handleDispatch(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdDone}
              onClick={() => {
                handleDeliver(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];
  const handleDispatch = useCallback((id: string) => {
    axios
      .put("/api/order", {
        id,
        deliveryStatus: "dispatched",
      })
      .then((res) => {
        console.log(res);

        toast.success("Order Dispatched");
        router.refresh();
      })
      .catch((error) => {
        toast.success("Oops Something went wrong ");
        console.log(error, "this is error");
      });
  }, []);

  const handleDeliver = useCallback((id: string) => {
    axios
      .put("/api/order", {
        id,
        deliveryStatus: "delivered",
      })
      .then((res) => {
        toast.success("Order Delivered");
        router.refresh();
      })
      .catch((error) => {
        toast.success("Oops Something went wrong ");
        console.log(error, "this is error");
      });
  }, []);

  return (
    <div className="m-auto text-xl max-w-[1150px]">
      <div className="mb-4 mt-8 ">
        <Heading title="Manage Orders" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default ManageOrdersClient;
