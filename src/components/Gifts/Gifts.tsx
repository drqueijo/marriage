import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { api } from "@/utils/api";

import GiftItem from "../GiftItem/GiftItem";

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

  return (
    <Carousel
      className="bg-blur-1/2"
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="px-6">
        {gifts.data?.map((gift) => (
          <CarouselItem key={gift.id} className="m-auto pl-3 md:basis-3/4">
            <GiftItem {...gift} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
export default Gifts;
