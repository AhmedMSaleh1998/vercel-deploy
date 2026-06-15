import React from 'react'
import GetAllProducts from '../api/_actions/getProducts'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import Image from 'next/image';
import { product } from '@/types/product.type';
import AddToCardBtn from './AddToCardBtn';

export default async function Products() {

  let data = await GetAllProducts();

  return <>


    <div className="container mx-auto w-[80%]">
      <div className="flex flex-wrap ">
        {data.map((product: product, indx) => {
          return <Card
            key={indx} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2'>
            <Link href={`/products/${product.id}`}>
              <Card>
                <CardHeader >
                  <CardTitle>
                    <Image width={100} height={300} className='w-full' src={product.imageCover} alt="" />
                  </CardTitle>
                  <CardDescription>{product.category.name}</CardDescription>
                </CardHeader>
                <CardContent >
                  <p className='font-bold line-clamp-1'>{product.title}</p>
                </CardContent>
                <CardFooter className=''>
                  <div className="flex w-full justify-between">
                    <p>{product.price} EGP</p>
                    <h6> <i className="fa-solid fa-star text-yellow-500"></i> {product.ratingsAverage}</h6>
                  </div>
                </CardFooter>

              </Card>
            </Link>

            <AddToCardBtn productId={product._id} />

          </Card>
        })}
      </div>

    </div>
  </>
}
