import { GiftForm } from "@/components/Form/Form";
import GiftItem from "@/components/GiftItem/GiftItem";
import Gifts from "@/components/Gifts/Gifts";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

export const index: React.FC<{ a?: string }> = ({}) => {
  const { push } = useRouter();
  const gifts = api.gift.get.useQuery();

  return (
    <div className="flex min-h-screen w-full justify-center bg-texture p-6 pt-6">
      <div className="flex w-full max-w-screen-2xl flex-col gap-8">
        <div className="flex justify-between">
          <Button variant="destructive" size="lg" onClick={() => push("/")}>
            {"<"} Ir para o site
          </Button>
          <GiftForm />
        </div>
        <div className="flex flex-wrap gap-3">
          <Gifts />
        </div>
      </div>
    </div>
  );
};
export default index;
