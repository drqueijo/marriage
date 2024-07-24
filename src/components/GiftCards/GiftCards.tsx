import { api } from "@/utils/api";
import format from "@/lib/format";
import { useState } from "react";
import { Gift } from "@/types/gift";
import BuyDrawer from "../BuyDrawer/BuyDrawer";
import { Button } from "../ui/button";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { GiftForm } from "../Form/Form";

interface GiftCardsProps {
  buy?: boolean;
}

export const GiftCards: React.FC<GiftCardsProps> = ({ buy }) => {
  const gifts = api.gift.get.useQuery();
  const [showMore, setShowMore] = useState(false);

  const enableShowMore = gifts?.data?.length ?? 0 > 8 ? true : false;

  const giftsToShow = showMore
    ? gifts.data
    : gifts.data?.filter((gift, i) => i < 8) || [];
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  const onClickClose = () => {
    setSelectedGift(null);
  };

  return (
    <div className="mb-12 flex w-full max-w-screen-xl flex-wrap justify-center gap-6 px-4">
      {giftsToShow?.map((gift) => (
        <div
          key={gift.id}
          className="w-72 rounded-2xl border-2  border-[#c6a482] bg-white opacity-90"
        >
          <div className="h-72 rounded-2xl bg-gray-100 ">
            <div
              className="relative h-full w-full rounded-t-[14px] bg-cover bg-center"
              style={{
                backgroundImage: `url(${gift.image})`,
                backgroundSize: "cover",
              }}
            >
              <div
                className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"
                style={{
                  opacity: 1, // Adjust the opacity of the gradient as needed
                }}
              ></div>
            </div>
          </div>

          <div className="flex flex-col gap-3  p-3 pt-6">
            <div className="h-10 text-center font-libre text-sm font-bold text-gray-600">
              {gift.name}
            </div>
            <div className=" w-full text-center font-quicksand-light-oblique text-sm font-bold text-gray-600">
              {gift.qtd} {gift.qtd > 1 ? "unidades" : "unidade"} - $
              {format.money(gift.price)}
            </div>
            {buy && (
              <div className="flex items-center justify-center pt-3">
                <BuyDrawer
                  onClickOpen={() => setSelectedGift(gift)}
                  onClickClose={onClickClose}
                  selectedGift={selectedGift}
                />
              </div>
            )}
            {!buy && (
              <div className="flex items-center justify-center pt-3">
                <GiftForm gift={gift} />
              </div>
            )}
          </div>
        </div>
      ))}
      {enableShowMore && (
        <div className="flex w-full items-center justify-center pt-6">
          <Button
            onClick={() => setShowMore(!showMore)}
            size="lg"
            className="flex gap-4 bg-[#c6a482] font-bold hover:bg-[#997d62]"
          >
            {showMore ? "Ver menos" : "Ver mais"}
            {showMore ? (
              <MdOutlineExpandLess className="text-xl" />
            ) : (
              <MdOutlineExpandMore className="text-xl" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
export default GiftCards;
