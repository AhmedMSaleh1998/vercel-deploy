import productDetails from '@/app/api/_actions/productdetails';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import React from 'react'

export default async function Details({params}:any) {
 
 let {details} = await params

let data = await productDetails(details)
console.log(data);



  return <>
  <h1>product Details</h1>
  <div className="container w-[80%] mx-auto">
    <div className='flex flex-wrap items-center'>
    <div className="w-full md:w-1/4">
  <img src={data.imageCover} alt={data.title} />
  </div>
  <div className="w-full md:w-3/4 ">
  <h2>{data.title}</h2>
  <p>{data.description}</p>
  <h5>{data.category.name}</h5>
   <CardFooter>
           <div className="flex w-full justify-between">
             <p>{data.price} EGP</p>
            <h6> <i className="fa-solid fa-star text-yellow-500"></i> {data.ratingsAverage}</h6>
           </div>
            </CardFooter>
            <Button className='w-full mt-3'><i className="fa-solid fa-plus"></i> Add To Cart</Button>
  </div>
  </div>
  </div>
  </> 
  
}
