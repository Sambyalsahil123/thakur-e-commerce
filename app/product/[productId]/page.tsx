import Container from "@/app/components/Container";
import React from "react";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import { products } from "@/utils/products";

interface IParms {
  productID?: string;
}
const Product = ({ params }: { params: IParms }) => {
  const product = products.find((item) => item.id === params.productID);
  console.log(params, "[productId]");

  return (
    <>
      <div className="p-8">
        <Container>
          <ProductDetails product={product} />
          <div className="flex flex-col mt-20 gap-4">
            <div>Add Rating</div>
            <ListRating product={product} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Product;
