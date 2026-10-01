import { createContext, useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const MyStoreContext = createContext();

export const MyStoreProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("skymart_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("skymart_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const loginUser = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem("skymart_user", JSON.stringify(userData));
    } catch (e) {
      console.error("Failed to save user to localStorage:", e);
    }
  };

  const logoutUser = () => {
    setUser(null);
    try {
      localStorage.removeItem("skymart_user");
    } catch (e) {
      console.error("Failed to remove user from localStorage:", e);
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem("skymart_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage:", e);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountCodeName, setDiscountCodeName] = useState("");

  const clearCart = () => {
    setCart([]);
    setAppliedDiscount(0);
    setDiscountCodeName("");
  };

  const FREE_SHIPPING_THRESHOLD = 50;

  const subtotal = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );

  const cartItemCount = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const discountAmount = (subtotal * appliedDiscount) / 100;
  const discountedSubtotal = subtotal - discountAmount;
  const isFreeShipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shippingCost = subtotal === 0 || isFreeShipping ? 0 : 9.99;
  const estimatedTax = discountedSubtotal > 0 ? discountedSubtotal * 0.08 : 0;
  const cartTotal =
    subtotal === 0
      ? 0
      : Math.max(0, discountedSubtotal + shippingCost + estimatedTax);

  useEffect(() => {
    const productsApi = "https://dummyjson.com/products";

    const getProducts = async () => {
      try {
        const response = await axios.get(productsApi);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Failed to fetch products from DummyJSON:", error);
      }
    };

    getProducts();
  }, []);

  return (
    <MyStoreContext.Provider
      value={{
        products,
        setProducts,
        category,
        setCategory,
        cart,
        setCart,
        cartTotal,
        cartItemCount,
        subtotal,
        discountAmount,
        discountedSubtotal,
        shippingCost,
        isFreeShipping,
        estimatedTax,
        appliedDiscount,
        setAppliedDiscount,
        discountCodeName,
        setDiscountCodeName,
        FREE_SHIPPING_THRESHOLD,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        user,
        loginUser,
        logoutUser,
      }}>
      {children}
    </MyStoreContext.Provider>
  );
};
