"use client"
import { Button } from '@/components/ui/button'
import React, { useContext } from 'react'
import { addItemToCart } from '../api/_actions/addToCart'
import { toast } from 'sonner'
import { cartContext } from '../_context/CartContext'

export default function AddToCardBtn({ productId }: { productId: string }) {
  const { setNumOfCartItems, getData } = useContext(cartContext);

  async function handelAddItem() {

    const toastId = toast.loading("Adding to cart...", { position: "top-center" });

    try {
      const data = await addItemToCart(productId);
      console.log("Add to cart response:", data);

      if (data.status === "success") {
        toast.success("Product added successfully", {
          id: toastId,
          position: "top-center",
          richColors: true
        });
        setNumOfCartItems(data.numOfCartItems);

        await getData();

      } else {
        toast.error("Error adding product", { id: toastId, position: "top-center", richColors: true });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId, position: "top-center", richColors: true });
    }
  }

  return (
    <Button onClick={handelAddItem}>
      <i className="fa-solid fa-plus mr-2"></i> Add To Cart
    </Button>
  );
}