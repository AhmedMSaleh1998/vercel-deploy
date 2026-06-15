import GetAllCategories from '@/app/api/_actions/getAllCategories'
import MySlider from '@/components/my-slider/my-slider'
import React from 'react'

export default async function CategorySlider() {
   let data = await GetAllCategories()
   let dataImgs = data.map((categ)=>categ.image)
   console.log(dataImgs);
   

  return <div className='w-[80%] mx-auto my-5'>
  <MySlider imgList={dataImgs} slidesPerView={2} />
  
  </div>
}
