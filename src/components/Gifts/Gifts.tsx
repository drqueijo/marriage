import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState } from "react";
import { api } from "@/utils/api";
import format from "@/lib/format";

export const Gifts: React.FC = () => {
  const gifts = api.gift.get.useQuery();
  const plugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      loop: true,
      stopOnHover: true,
    }),
  );

  if (gifts.isLoading) return <div>Carregando...</div>;

  console.log(plugin.current);

  return (
    <Carousel
      className="bg-blur-1/2"
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="px-6">
        {gifts.data?.map((gift, index) => (
          <CarouselItem key={gift.id} className="m-auto pl-3 md:basis-3/4">
            <div className="relative rounded-md px-3">
              <img src={gift.image} className="w-full rounded-md shadow-md" />
              <p
                style={{
                  borderImage:
                    "linear-gradient(90deg, #9a7a5f -0.39%, #b29679 2.64%, #ccb597 5.66%, #decbac 8.68%, #ead9b8 11.71%, #eedebd 14.73%, #ddc5a4 22.79%, #cfb08f 31.86%, #c6a482 40.93%, #c4a07e 48.99%, #c6a482 58.06%, #cfb08e 68.14%, #ddc4a3 77.21%, #eedebd 86.28%, #ead9b9 89.3%, #e0cdad 92.32%, #ceb899 94.34%, #b69b7e 97.36%, #9a7a5f 100.39%) 1",
                }}
                className="absolute left-0 top-0 min-w-16 border bg-orange-50 p-2 text-center font-satisfy text-xl font-light text-orange-950"
              >
                {gift.name}
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
export default Gifts;
