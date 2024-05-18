import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Gift } from "@/types/gift";
import { QrCodePix } from "qrcode-pix";
import { api } from "@/utils/api";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

interface PixProps {
  goBack: () => void;
  gift: Gift;
  closeDrawer: () => void;
}

export const Pix: React.FC<PixProps> = ({ goBack, gift, closeDrawer }) => {
  const [qrCode, setQrCode] = useState("");
  const [pixCopy, setPixCopy] = useState("");
  const confirm = api.order.confirmPayment.useMutation();
  const gifts = api.gift.get.useQuery();
  const { toast } = useToast();

  const isLoading = confirm.isPending || gifts.isLoading;

  const getQrCodePix = async () => {
    const qrCodePix = QrCodePix({
      version: "01",
      key: "10119121980",
      name: "Fulano de Tal",
      city: "SAO PAULO",
      message: gift?.name,
      value: gift.price / 100,
    });

    setPixCopy(qrCodePix.payload());
    setQrCode(await qrCodePix.base64());
  };

  useEffect(() => {
    getQrCodePix();
  }, [gift]);

  const confirmPayment = async () => {
    await confirm.mutateAsync({ giftId: gift.id });
    await gifts.refetch();
    goBack();
    closeDrawer();
    toastMessage("Pagamento confirmado com sucesso!");
  };

  const toastMessage = (message: string) => {
    toast({
      title: message,
      action: <ToastAction altText="Goto schedule to undo">fechar</ToastAction>,
    });
  };

  return (
    <>
      <DrawerHeader>
        <DrawerTitle className="text-center font-quicksand-bold-oblique">
          {gift.name}
        </DrawerTitle>
      </DrawerHeader>
      <DrawerDescription className="my-6">
        <div className="flex flex-col items-center gap-6">
          <Card>
            <CardContent className="flex flex-col items-center gap-4">
              <img src={qrCode} alt="QR Code PIX" />
              <p className="text-center font-quicksand-bold-oblique">
                Ou copie o codigo pix
              </p>
              <div className="flex items-center gap-2">
                <Input value={pixCopy} readOnly className="w-full" />
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(pixCopy);
                    toastMessage("Copiado para a área de transferência");
                  }}
                  className="ml-2"
                >
                  Copiar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DrawerDescription>
      <DrawerFooter className="my-6 flex flex-row justify-center gap-4">
        <Button
          onClick={goBack}
          size="lg"
          disabled={isLoading}
          className="w-fit bg-[#c6a482] font-quicksand-bold-oblique hover:bg-[#997d62]"
        >
          {"<"} Voltar
        </Button>
        <Button
          onClick={confirmPayment}
          size="lg"
          disabled={isLoading}
          className="w-fit bg-[#c6a482] font-quicksand-bold-oblique hover:bg-[#997d62]"
        >
          Confirmar pagamento
        </Button>
      </DrawerFooter>
    </>
  );
};
export default Pix;
