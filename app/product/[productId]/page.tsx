import Container from "@/app/components/Container";
import { product } from "@/utils/products";
import React from "react";
import ProductDetails from "./ProductDetails";

interface IParms {
  productID?: string;
}
const Product = ({ params }: { params: IParms }) => {
  console.log(params, "[productId]");
  return (
    <>
      <div className="p-8">
        <Container>
          <ProductDetails product={product} />
        </Container>
      </div>
    </>
  );
};

export default Product;
