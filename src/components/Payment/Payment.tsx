"use client";
import { Gift } from "@/types/gift";
import { api } from "@/utils/api";
import { CreateOrderData, CreateOrderActions } from "@paypal/paypal-js";
import paypal from "@paypal/paypal-js";
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";
import {
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

interface PaymentProps {
  goBack: () => void;
  gift: Gift;
  closeDrawer: () => void;
}

export const Payment: React.FC<PaymentProps> = ({
  goBack,
  gift,
  closeDrawer,
}) => {
  const createOrder = api.order.create.useMutation();
  const captureOrder = api.order.captureOrder.useMutation();
  const saveOrder = api.order.saveOrder.useMutation();
  const gifts = api.gift.get.useQuery();
  const isLoading =
    createOrder.isPending ||
    captureOrder.isPending ||
    saveOrder.isPending ||
    gifts.isLoading;
  const { toast } = useToast();

  const paypalCreateOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions,
  ) => {
    let response = "";
    try {
      await createOrder.mutateAsync(
        { value: gift.price / 100 },
        {
          onSuccess: (data) => {
            response = data.id;
          },
          onError: (error) => {
            return error;
          },
        },
      );
    } catch (err) {
      toast({
        title: "Erro ao abrir a ordem de pagamento",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    }
    return response;
  };

  const paypalCaptureOrder = async (orderID: string) => {
    try {
      const response = await captureOrder.mutateAsync(orderID);
      if (response.status === "COMPLETED") {
        toast({
          title: "Ordem de pagamento bem-sucedida",
          action: (
            <ToastAction altText="Goto schedule to undo">fechar</ToastAction>
          ),
        });
        await saveOrder.mutateAsync({
          giftId: gift.id,
          paymentData: {
            name: response.payer.name.given_name,
            lastName: response.payer.name.surname,
            email: response.payer.email_address,
            userId: response.payer.payer_id,
          },
        });
        await gifts.refetch();
        goBack();
        closeDrawer();
      }
      return true;
    } catch (err: unknown) {}
  };

  return (
    <div className="h-fit max-h-screen w-full overflow-auto content-none">
      <style jsx>{`
        .vaul-drawer-bottom::after {
          content: "";
          display: block;
          height: 100% !important;
          width: 100%;
          background: inherit; /* Optional: ensures the background of the pseudo-element matches the parent */
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>
      <DrawerHeader>
        <DrawerTitle className="text-center font-quicksand-bold-oblique">
          {gift.name}
        </DrawerTitle>
      </DrawerHeader>
      <DrawerDescription className="my-6 flex items-center justify-center">
        <div className="min-w-80">
          <PayPalScriptProvider
            options={{
              clientId:
                "ATvGe-DQHW9DY1ntil48yvwZktSmCwZCZip1rcNJgm3tDxAyyGLOb-51O8aHfhsKxpm24CiQIOAalzzq",
              currency: "BRL",
              intent: "capture",
            }}
          >
            <PayPalButtons
              style={{
                color: "gold",
                shape: "rect",
                label: "pay",
                height: 50,
              }}
              createOrder={async (data, actions) => {
                return await paypalCreateOrder(data, actions);
              }}
              onApprove={async (data, actions) => {
                await paypalCaptureOrder(data.orderID);
              }}
            />
          </PayPalScriptProvider>
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
      </DrawerFooter>
    </div>
  );
};
export default Payment;
