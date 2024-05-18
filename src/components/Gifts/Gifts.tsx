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

export const Gifts: React.FC = ({ buy }: { buy?: boolean }) => {
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
      className="mb-12 w-full"
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="">
        {gifts.data?.map((gift) => (
          <CarouselItem
            key={gift.id}
            className="w-full  shadow-2xl shadow-gray-50"
          >
            <GiftItem {...gift} buy={buy} className="" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute !left-40  top-[80%] border-2 border-orange-950  bg-orange-950 text-orange-50" />
      <CarouselNext className="absolute !left-[unset] right-40 top-[80%]  border-orange-950  bg-orange-50 text-orange-950" />
    </Carousel>
  );
};
export default Gifts;
