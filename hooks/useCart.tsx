import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
  loading: boolean;
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleQtyIncrease: (product: CartProductType) => void;
  handleQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
};

// CartContext
export const CartContext = createContext<CartContextType | null>(null);
interface Props {
  [propName: string]: any;
}

//CartContextProvider
export const CartContextProvider = (props: Props) => {
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopCartItems");
    const underCartProduct: CartProductType[] | null = JSON.parse(cartItems);
    setCartProducts(underCartProduct);
  }, []);
  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (accu, item) => {
            const itemTotal = item.price * item.quantity;
            accu.total += itemTotal;
            accu.qty = item.quantity;
            return accu;
          },
          { total: 0, qty: 0 }
        );

        setCartTotalQty(qty);
        setCartTotalAmount(qty);
      }
    };
    getTotals();
  }, [cartProducts]);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setLoading(true);
    toast.success("Product added to cart");
    setCartProducts((prev) => {
      let updatedCart;
      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }
      localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      setLoading(false)
      return updatedCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      setLoading(true);
      toast.success("Product added to cart");

      if (cartProducts) {
        const filteredProduct = cartProducts.filter(
          (item) => item.id !== product.id
        );
        setCartProducts(filteredProduct);
        localStorage.setItem("eShopCartItems", JSON.stringify(filteredProduct));
        setLoading(false);
      }

    },
    [cartProducts]
  );
  const handleQtyIncrease = useCallback(
    (product: CartProductType) => {
      if (product.quantity >= 20) {
        return toast.error("Oops, quantity exceeds");
      }

      if (!cartProducts) return;

      const updatedCart = cartProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );

      try {
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    },
    [cartProducts]
  );
  const handleQtyDecrease = useCallback(
    (product: CartProductType) => {
      if (!cartProducts) return;

      const updatedCart = cartProducts.map((item) =>
        item.id === product.id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );

      try {
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    },
    [cartProducts]
  );
  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.setItem("eShopCartItems", JSON.stringify(null));
  }, [cartProducts]);

  const value = {
    loading,
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleQtyIncrease,
    handleQtyDecrease,
    handleClearCart,
  };
  return <CartContext.Provider value={value} {...props} />;
};

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCar must be used within a CartContextProvider");
  }

  return context;
};
