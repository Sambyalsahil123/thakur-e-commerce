"use client";

import { Product } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";

interface ManageProductClientProps {
  products: Product[];
}
const ManageProductClient: React.FC<ManageProductClientProps> = ({
  products,
}) => {
  const router = useRouter();
  const storage = getStorage(firebaseApp);

  let rows: any = [];

  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images,
      };
    });
  }
  let columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 220 },
    {
      field: "price",
      headerName: "Price(USD)",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.price}</div>
        );
      },
    },
    { field: "category", headerName: "Category", width: 100 },
    { field: "brand", headerName: "Brand", width: 100 },
    {
      field: "inStock",
      headerName: "inStock",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            {params.row.inStock === true ? (
              <Status
                icon={MdDone}
                text="in stock"
                bg="bg-green-500"
                color="bg-green-700"
              />
            ) : (
              <Status
                icon={MdClose}
                text="out of stock"
                bg="bg-red-500"
                color="bg-red-700"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full ">
            <ActionBtn
              icon={MdCached}
              onClick={() => {
                handleToggleStock(params.row.id, params.row.inStock);
              }}
            />
            <ActionBtn
              icon={MdDelete}
              onClick={() => {
                handleDelete(params.row.id, params.row.images);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`product/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];
  const handleToggleStock = useCallback((id: string, inStock: boolean) => {
    axios
      .put("/api/product", {
        id,
        inStock: !inStock,
      })
      .then((res) => {
        toast.success("Product status changed");
        router.refresh();
      })
      .catch((error) => {
        toast.success("Oops Something went wrong ");
        console.log(error, "this is error");
      });
  }, []);

  const handleDelete = useCallback(async (id: string, images: any[]) => {
    toast("deleting product, please wait! ");
    const handleImageDelete = async () => {
      try {
        for (const item of images) {
          if (item.image) {
            const imageRef = ref(storage, item.image);
            await deleteObject(imageRef);
            console.log("image deleted ", item.image);
          }
        }
      } catch (error) {
        return console.log("Deleting images error", error);
      }
    };
    await handleImageDelete();
    axios
      .delete(`/api/product/${id}`)
      .then((res) => {
        toast.success("Product deleted");
        router.refresh();
      })
      .catch((error) => {
        toast.success("Failed to delete product ");
        console.log(error, "this is error");
      });
  }, []);

  return (
    <div className="m-auto text-xl max-w-[1150px]">
      <div className="mb-4 mt-8 ">
        <Heading title="Manage Products" center />
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

export default ManageProductClient;
