"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  createGiftInput,
  CreateGiftSchema,
  GiftUpdateSchema,
} from "@/types/gift";
import CurrencyInput from "../NumberInput/NumberInput";
import { toast } from "../ui/use-toast";
import { api } from "@/utils/api";
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

export function GiftForm({ gift }: { gift?: GiftUpdateSchema }) {
  const form = useForm({
    resolver: zodResolver(createGiftInput),
    defaultValues: {
      name: gift?.name || "",
      qtd: gift?.qtd || 0,
      price: gift?.price || 0,
      image: gift?.image || "",
      description: gift?.description || "",
      createdById: "ADMIN",
    },
  });

  const createGift = api.gift.create.useMutation();
  const updateGift = api.gift.update.useMutation();
  const gifts = api.gift.get.useQuery();

  const { watch, setValue } = form;
  const { price } = watch();

  function onSubmit(values: CreateGiftSchema) {
    values.price = price * 100;
    if (gift?.id) {
      updateGift.mutateAsync({ ...values, id: gift.id }).then(
        async (e) => {
          toast({
            duration: 3000,
            className:
              "bg-green-500 text-white font-bold font-quicksand-bold-oblique",
            title: `Presente ${e.name} atualizado com sucesso`,
          });
          form.reset();
          await gifts.refetch();
        },
        (e) => {
          onError(e);
        },
      );
      return;
    }
    createGift.mutateAsync(values).then(
      async (e) => {
        toast({
          duration: 3000,
          className:
            "bg-green-500 text-white font-bold font-quicksand-bold-oblique",
          title: `Presente ${e.name} cadastrado com sucesso`,
        });
        form.reset();
        await gifts.refetch();
      },
      (e) => {
        onError(e);
      },
    );
  }

  function onError(e: unknown) {
    console.log(form.getValues());
    console.log(e);
    toast({
      duration: 3000,
      variant: "destructive",
      className: "font-quicksand-bold-oblique",
      title: "Ops, algo deu errado com o formulário",
      description: "Verifique os campos e tente novamente",
    });
  }

  return (
    <Drawer>
      <DrawerTrigger asChild className="">
        {gift ? (
          <Button
            size="lg"
            className="flex gap-4 bg-[#c6a482] font-bold hover:bg-[#997d62]"
          >
            Editar
          </Button>
        ) : (
          <Button variant="default" size="lg">
            Criar Novo presente
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <Form {...form}>
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
            <div className="mx-auto flex w-full flex-col gap-6 p-6 font-mono">
              <DrawerHeader className="mb-6">
                <DrawerTitle>{gift ? gift.name : "Novo Presente"}</DrawerTitle>
              </DrawerHeader>
              <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="flex w-full flex-col items-center justify-center gap-4 p-4 "
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o nome"
                          {...field}
                          className="w-full min-w-96"
                        />
                      </FormControl>
                      <FormDescription>
                        Insira o nome do presente
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="qtd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          defaultValue={field.value}
                          onChange={(e) =>
                            setValue(
                              "qtd",
                              parseInt(!!e.target.value ? e.target.value : ""),
                            )
                          }
                          placeholder="Digite a quantidade"
                          className="w-full min-w-96"
                        />
                      </FormControl>
                      <FormDescription>
                        Insira a quantidade do presente
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço</FormLabel>
                      <FormControl>
                        <CurrencyInput
                          value={field.value}
                          onChange={(e: number) => field.onChange(e)}
                        />
                      </FormControl>
                      <FormDescription>
                        Insira o preço do presente
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL da Imagem</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Insira o URL da imagem"
                          {...field}
                          className="w-full min-w-96"
                        />
                      </FormControl>
                      <FormDescription>
                        Insira o URL da imagem do presente
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Insira a descrição"
                          {...field}
                          className="w-full min-w-96"
                        />
                      </FormControl>
                      <FormDescription>
                        Insira a descrição do presente
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DrawerFooter className="mt-6 flex w-full max-w-96 flex-row items-center justify-end gap-4 px-0">
                  <DrawerClose asChild>
                    <Button className="w-fit min-w-20" variant="outline">
                      Cancelar
                    </Button>
                  </DrawerClose>
                  <Button className="w-fit min-w-32">
                    {gift ? "Editar" : "Criar"}
                  </Button>
                </DrawerFooter>
              </form>
            </div>
          </div>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
