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
  console.log(selectedGift);
  return (
    <Drawer>
      <DrawerTrigger>
        <Button
          onClick={onClickOpen}
          size="lg"
          className="flex gap-4 bg-[#c6a482] font-bold hover:bg-[#997d62]"
        >
          Enviar Presente <GiftIcon size={24} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button onClick={onClickClose} variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default BuyDrawer;
