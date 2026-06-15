import CategorySlider from "@/app/_components/category-slider/categoryslider";
import MainSlider from "@/app/_components/MainSlider/MainSlider";
import Image from "next/image";
import Products from "./products/page";


export default function Home() {
  return <>
  <MainSlider/>
  <CategorySlider/>
  <Products/>
  </>
}
