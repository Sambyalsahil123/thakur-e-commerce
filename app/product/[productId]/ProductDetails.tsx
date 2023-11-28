"use client";

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { Rating } from "@mui/material";
import { useState, useCallback } from "react";

interface ProductDetailsProps {
  product: any;
}
export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

const Horizontal = () => {
  return <hr className="w-[30%] my-2 mb-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });
  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );
  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 10) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct]);

  const handleQtyDecrease = useCallback(() => {
    setCartProduct((prev) => {
      const newQuantity = Math.max(1, prev.quantity - 1);
      return { ...prev, quantity: newQuantity };
    });
  }, [cartProduct]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
      <div className="flex flex-col gap-1 text-sm text-slate-700">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div className="font-semibold">
          <span>CATEGORY:</span>
          {product.category}
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "In stock " : "Out of stock"}
        </div>
        <Horizontal />
        <div>
          <SetColor
            cartProduct={cartProduct}
            images={product.images}
            handleColorSelect={handleColorSelect}
          />
        </div>
        <Horizontal />
        <SetQuantity
          cartProduct={cartProduct}
          handleQtyIncrease={handleQtyIncrease}
          handleQtyDecrease={handleQtyDecrease}
        />
        <Horizontal />
        <div className="max-w-[300px]">
          <Button label="Add to Cart" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
