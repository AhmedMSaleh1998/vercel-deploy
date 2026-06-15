"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';

type SliderProps = {
  imgList: string[] ;
   slidesPerView? : number;
  };

export default function MySlider({imgList,slidesPerView } : SliderProps ) {
  return (
    <div>
        <Swiper
        spaceBetween={0}
        slidesPerView={slidesPerView}
        modules={[Autoplay , Pagination]}
        pagination={{clickable: true}}
        autoplay = {{delay:2000}}

        >
        {imgList.map((src,ind)=>{
            return(
                    
        <SwiperSlide key={ind}>
        <Image src={src} width={300} height={100} className='h-[500] w-full object-cover' alt="laptop" />
        </SwiperSlide>
            );
        })}
        </Swiper>
    </div>
  )
}
