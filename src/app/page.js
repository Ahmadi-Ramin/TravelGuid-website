import BestHotels from "@/components/best-hotels/BestHotels";
import Hero from "@/components/hero/Hero";
import PopularLocation from "../components/popular-locations/PopularLocations";
import sea from '../../public/assets/sea.jpg'
import hotel_image from '../../public/assets/hr_10.jpg'


export default function Home() {
  return (
    <>
      <Hero 
        image={sea} 
        mainHeader="Are you ready for an adventure?" 
        SecondaryHeader="Browse through the popular locations." 
      />
      <PopularLocation />
      <Hero 
        image={hotel_image} 
        mainHeader="Get the best offer for your hotel!" 
        SecondaryHeader="Pick your desired place." 
      />
      
      <BestHotels />
      
    </>
  );
}
