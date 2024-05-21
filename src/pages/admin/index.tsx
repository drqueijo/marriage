import { GiftForm } from "@/components/Form/Form";
import GiftCards from "@/components/GiftCards/GiftCards";
import GiftItem from "@/components/GiftItem/GiftItem";
import Gifts from "@/components/Gifts/Gifts";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import format from "@/lib/format";
import { api } from "@/utils/api";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/router";

export const index: React.FC<{ a?: string }> = ({}) => {
  const { push } = useRouter();
  const orders = api.order.get.useQuery();
  const confirmPayment = api.order.updateStatus.useMutation();

  const handleConfirmPayment = async (id: number) => {
    await confirmPayment.mutateAsync({ id, status: "COMPLETED" });
    await orders.refetch();
  };

  return (
    <div className="flex min-h-screen w-full justify-center bg-texture p-6 pt-6">
      <div className="flex w-full max-w-screen-2xl flex-col gap-8">
        <div className="flex w-full justify-between">
          <Button variant="destructive" size="lg" onClick={() => push("/")}>
            {"<"} Ir para o site
          </Button>

          <GiftForm />
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          <GiftCards />
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Metodo</TableHead>
                <TableHead>Presente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead className="text-right">Confirmar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.data ? (
                orders.data.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.method}</TableCell>
                    <TableCell>{order.gift.name}</TableCell>
                    <TableCell>${format.money(order.price)}</TableCell>
                    <TableCell className="text-right">
                      {order.status === "PENDING" ? (
                        <Button onClick={() => handleConfirmPayment(order.id)}>
                          <CheckIcon />
                        </Button>
                      ) : (
                        <div></div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow key={"d"}>
                  <TableCell className="font-medium">{"asd"}</TableCell>
                  <TableCell>{"COMPLETED"}</TableCell>
                  <TableCell>{"COMPLETED"}</TableCell>
                  <TableCell>{"COMPLETED"}</TableCell>
                  <TableCell>${format.money(1000)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleConfirmPayment(1)}
                    >
                      <CheckIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>Total</TableCell>
                <TableCell className="text-right">
                  $
                  {format.money(
                    orders.data?.reduce((acc, order) => acc + order.price, 0) ??
                      0,
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
};
export default index;
