import React, { createContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getUserCart } from '../api/_actions/getCartData';

export const cartContext = createContext<any>({
  cartData: null,
  setCartData: () => { },
  cartId: null,
  setCartId: () => { },
  numOfCartItems: 0,
  setNumOfCartItems: () => { },
  getData: async () => { }
});

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [cartData, setCartData] = useState<any>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [numOfCartItems, setNumOfCartItems] = useState<number>(0);

  async function getData() {
    try {
      const userDataCart = await getUserCart();
      console.log("userDataCart", userDataCart);
      if (userDataCart) {
        setCartData(userDataCart.data || { products: [] });
        setCartId(userDataCart.cartId || null);
        setNumOfCartItems(userDataCart.numOfCartItems || 0);
      }
    } catch (error) {
      console.error("Failed to fetch cart data:", error);
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      getData();
    } else if (status === "unauthenticated") {
      // مسح بيانات السلة عند تسجيل الخروج
      setCartData(null);
      setCartId(null);
      setNumOfCartItems(0);
    }
  }, [status]);

  return (
    <cartContext.Provider value={{
      cartData, setCartData,
      cartId, setCartId,
      numOfCartItems, setNumOfCartItems,
      getData
    }}>
      {children}
    </cartContext.Provider>
  );
}