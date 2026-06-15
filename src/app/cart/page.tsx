"use client"
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import React, { useContext } from 'react'
import { cartContext } from '../_context/CartContext'
import { product } from '@/types/product.type'
import { updateCount } from './updateCount'
import { toast } from 'sonner'
import { clearCart, deleteItem } from './deleteItem'
import Link from 'next/link';

export default function Carts() {
  const { numOfCartItems, cartData, setNumOfCartItems, setCartData, getData } = useContext(cartContext);

  type cartDataItem = {
    count: number,
    price: number,
    product: product
  }

  async function handelCountUpdate(productId: string, count: number) {
    toast.promise(() => updateCount(productId, count), {
      success: async function () {

        await getData();
        return "Quantity updated successfully";
      },
      loading: "Updating...",
      error: "Ooops Error",
      position: "top-center",
      richColors: true
    });
  }

  async function handelDeleteItem(productId: string) {
    toast.promise(() => deleteItem(productId), {
      success: async function () {
        await getData();
        return "Deleted successfully";
      },
      loading: "Removing item...",
      error: "Ooops Error",
      position: "top-center",
      richColors: true
    });
  }

  async function handelClear() {
    await clearCart();
    setNumOfCartItems(0);
    setCartData({ products: [], totalCartPrice: 0 }); 
    toast.success("Cart cleared", { position: "top-center", richColors: true });
  }

  if (!cartData) {
    return <div className="container mx-auto py-6 px-4 text-center">Loading cart...</div>;
  }

  return (
    <div className='container mx-auto py-6 px-4'>
      <h1 className='text-3xl font-bold tracking-tight'>Shopping Cart</h1>
      <p className='text-muted-foreground mt-1 '>{numOfCartItems} items in your cart</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start mt-6 ">

        <div className="lg:col-span-2 space-y-4">
          {cartData?.products?.map((item: cartDataItem) => (
            <div className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card" key={item?.product?._id}>

              <img
                src={item?.product?.imageCover}
                alt={item?.product?.title || "Product Image"}
                className='w-24 h-24 rounded-lg object-cover md:w-28 md:h-28 '
              />

              <div className='flex-1 ' >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 ">
                  <div className="">
                    <h3 className='font-semibold text-base md:text-lg line-clamp-2 ' >
                      {item?.product?.title}
                    </h3>

                    <p className='text-sm text-muted-foreground mt-1 ' >
                      {item?.product?.brand?.name && <span className="mr-2">{item.product.brand.name}</span>}
                      {item?.product?.category?.name && <span>{item.product.category.name}</span>}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold ">
                      {item?.price} EGP
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between ">
                  <div className="flex items-center gap-2 ">
                    <button onClick={() => handelCountUpdate(item.product._id, item.count - 1)} aria-label='decrease' className='size-8 rounded-lg border hover:bg-accent ' >
                      -
                    </button>
                    <span className='w-6 text-center font-medium ' >
                      {item?.count}
                    </span>
                    <button onClick={() => handelCountUpdate(item.product._id, item.count + 1)} aria-label='increase' className='size-8 rounded-lg border hover:bg-accent ' >
                      +
                    </button>
                  </div>
                  <button onClick={() => handelDeleteItem(item.product._id)} aria-label='remove' className='text-sm cursor-pointer flex text-destructive hover:underline items-center ' >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {cartData?.products?.length === 0 && (
            <p className="text-center text-muted-foreground p-6">Your cart is currently empty.</p>
          )}
        </div>

        <div className='lg:col-span-1 sticky top-18 ' >
          <div className='rounded-xl border p-5 shadow-sm ' >
            <h2 className='text-lg font-semibold '>Order Summary</h2>
            <div className="mt-4 space-y-2 ">
              <div className="flex items-center justify-between ">
                <span className='text-sm text-muted-foreground '>
                  Total Items
                </span>
                <span className='font-semibold '>{numOfCartItems}</span>
              </div>
              <div className="flex justify-between items-center ">
                <span className='text-sm text-muted-foreground '>Shipping</span>
                <span className='text-emerald-500 font-medium '>Free</span>
              </div>
            </div>

            <div className='my-4 border-t ' />
            <div className="flex items-center justify-between ">
              <span className='text-base font-semibold ' >Total Price</span>
              <span className='text-base font-bold ' >{cartData?.totalCartPrice || 0} EGP</span>
            </div>

            <Button asChild className='w-full text-lg mt-4 '>
              <Link href='/payment'>
                Proceed To Checkout
              </Link>
            </Button>

            <Button variant="outline" className='w-full text-lg mt-2 '>
              Continue Shopping
            </Button>
          </div>

          <Button onClick={handelClear} variant={'outline'} className='mt-2 ms-auto text-destructive hover:text-destructive flex w-full lg:w-auto' >
            <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
}