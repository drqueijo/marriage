import { Gift } from "@/types/gift";
import { twMerge } from "tailwind-merge";
import format from "@/lib/format";
import React, { useState } from "react";
import BuyDrawer from "../BuyDrawer/BuyDrawer";

type GiftItemProps = Gift & {
  className?: string;
  buy?: boolean;
  hoverContent?: React.ReactNode;
};

const GiftItem: React.FC<GiftItemProps> = ({
  id,
  image,
  name,
  qtd,
  price,
  orders,
  description,
  createdAt,
  updatedAt,
  createdById,
  className,
  buy,
}) => {
  const itemsAvaliableCount = qtd - (orders?.length || 0);

  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  const onClickBuy = () => {
    setSelectedGift({
      id,
      image,
      name,
      qtd,
      price,
      orders,
      description,
      createdAt,
      updatedAt,
      createdById,
    });
  };

  const onClickClose = () => {
    setSelectedGift(null);
  };

  return (
    <div className={twMerge("flex h-[40vh] flex-col md:flex-row ", className)}>
      <div className="relative ml-auto flex w-[100%] flex-col items-center justify-center gap-8 p-8 md:w-[40%]">
        <p className="text-center font-libre text-xl font-light text-gray-800">
          {name}
        </p>
        <p
          style={{
            borderImage:
              "linear-gradient(90deg, #9a7a5f -0.39%, #b29679 2.64%, #ccb597 5.66%, #decbac 8.68%, #ead9b8 11.71%, #eedebd 14.73%, #ddc5a4 22.79%, #cfb08f 31.86%, #c6a482 40.93%, #c4a07e 48.99%, #c6a482 58.06%, #cfb08e 68.14%, #ddc4a3 77.21%, #eedebd 86.28%, #ead9b9 89.3%, #e0cdad 92.32%, #ceb899 94.34%, #b69b7e 97.36%, #9a7a5f 100.39%) 1",
          }}
          className="text-md min-w-16 border-2 bg-orange-50 p-2 text-center font-quicksand-book font-semibold text-gray-800"
        >
          R$ {format.money(price)}
        </p>
        {buy && (
          <BuyDrawer
            onClickOpen={onClickBuy}
            onClickClose={onClickClose}
            selectedGift={selectedGift}
          />
        )}
      </div>

      <div
        style={{
          backgroundImage: `url(${image})`,
        }}
        className="relative h-full w-[100%] rounded-l-[500px] border-l-4 border-[#c6a482] bg-cover bg-center md:w-[50%]"
      >
        <p
          style={{
            borderImage:
              "linear-gradient(90deg, #9a7a5f -0.39%, #b29679 2.64%, #ccb597 5.66%, #decbac 8.68%, #ead9b8 11.71%, #eedebd 14.73%, #ddc5a4 22.79%, #cfb08f 31.86%, #c6a482 40.93%, #c4a07e 48.99%, #c6a482 58.06%, #cfb08e 68.14%, #ddc4a3 77.21%, #eedebd 86.28%, #ead9b9 89.3%, #e0cdad 92.32%, #ceb899 94.34%, #b69b7e 97.36%, #9a7a5f 100.39%) 1",
          }}
          className="text-md absolute bottom-0 right-0 min-w-16 border-2 bg-orange-50 p-2 text-center font-quicksand-book font-semibold text-gray-800"
        >
          {itemsAvaliableCount}{" "}
          {itemsAvaliableCount === 1 ? "disponível" : "disponíveis"}
        </p>
      </div>
    </div>
  );
};
export default GiftItem;
