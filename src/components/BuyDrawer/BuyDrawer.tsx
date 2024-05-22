import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { Gift } from "@/types/gift";
import { GiftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FaPix, FaCreditCard } from "react-icons/fa6";
import Pix from "../Pix/Pix";
import Payment from "../Payment/Payment";

interface BuyDrawerProps {
  onClickOpen: () => void;
  onClickClose: () => void;
  selectedGift: Gift | null;
}

export const BuyDrawer: React.FC<BuyDrawerProps> = ({
  onClickOpen,
  onClickClose,
  selectedGift,
}: BuyDrawerProps) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
  }, [selectedGift]);

  return (
    <Drawer>
      <DrawerTrigger>
        <Button
          onClick={onClickOpen}
          size="sm"
          className="flex gap-4 bg-[#c6a482] font-bold hover:bg-[#997d62]"
        >
          Enviar Presente <GiftIcon size={24} />
        </Button>
      </DrawerTrigger>
      {selectedGift && (
        <DrawerContent>
          {step === 0 && (
            <>
              <DrawerHeader>
                <DrawerTitle className="font-quicksand-bold-oblique">
                  Como gostaria de enviar o presente?
                </DrawerTitle>
              </DrawerHeader>
              <DrawerDescription className="items-center- my-6 flex flex-wrap justify-center gap-4">
                <Button
                  onClick={() => setStep(1)}
                  size="lg"
                  className="flex gap-1 bg-[#c6a482] font-quicksand-bold-oblique font-bold hover:bg-[#997d62]"
                >
                  Pix <FaPix />
                </Button>
                <Button
                  onClick={() => setStep(2)}
                  size="lg"
                  className="flex gap-1 bg-[#c6a482] font-quicksand-bold-oblique font-bold hover:bg-[#997d62]"
                >
                  Cartao <FaCreditCard />
                </Button>
              </DrawerDescription>
            </>
          )}
          {step === 1 && (
            <Pix
              gift={selectedGift}
              goBack={() => setStep(0)}
              closeDrawer={onClickClose}
            />
          )}
          {step === 2 && (
            <Payment
              gift={selectedGift}
              goBack={() => setStep(0)}
              closeDrawer={onClickClose}
            />
          )}
        </DrawerContent>
      )}
    </Drawer>
  );
};
export default BuyDrawer;
