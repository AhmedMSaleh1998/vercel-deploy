"use client"
import React from 'react'
import Image from 'next/image';
import  img1  from  "../../../../public/Images/Laptop.jpg"
import  img2  from  "../../../../public/Images/camera.jpg"
import  img3  from  "../../../../public/Images/printer.jpg"
import  img4  from  "../../../../public/Images/Airpods.jpg"
import  img5  from  "../../../../public/Images/Wireless Headphones.jpg" 
import MySlider from '@/components/my-slider/my-slider';

export default function MainSlider() {
  return <>
  <div className='container w-[80%] mx-auto'> 
       <div className='flex'>
         <div className='w-3/4'>
           <MySlider imgList={[img2.src,img3.src]} />
            </div>
            <div className='w-1/4'>
            <Image src={img4} className='h-[250] object-cover' alt="printer" />
            <Image src={img5} className='h-[250] object-cover' alt="printer" />
            </div>
       </div>
  </div> 
      
  
  </>
 
}
