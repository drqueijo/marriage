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
import { createGiftInput, CreateGiftSchema } from "@/types/gift";
import CurrencyInput from "../NumberInput/NumberInput";
import { toast } from "../ui/use-toast";
import { api } from "@/utils/api";

export function GiftForm() {
  const form = useForm({
    resolver: zodResolver(createGiftInput),
    defaultValues: {
      name: "",
      qtd: 0,
      price: 0,
      image: "",
      description: "",
      createdById: "ADMIN",
    },
  });

  const createGift = api.gift.create.useMutation();

  const { watch, setValue } = form;
  const { price } = watch();

  function onSubmit(values: CreateGiftSchema) {
    values.price = price * 100;
    createGift.mutateAsync(values).then(
      (e) => {
        toast({
          duration: 3000,
          className:
            "bg-green-500 text-white font-bold font-quicksand-bold-oblique",
          title: `Presente ${e.name} cadastrado com sucesso`,
        });
        form.reset();
      },
      (e) => {
        onError(e);
      },
    );
  }

  function onError(e: any) {
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-8"
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
                  className="input"
                />
              </FormControl>
              <FormDescription>Insira o nome do presente</FormDescription>
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
                  value={field.value}
                  onChange={(e) =>
                    setValue(
                      "qtd",
                      parseInt(!!e.target.value ? e.target.value : "0"),
                    )
                  }
                  placeholder="Digite a quantidade"
                  className="input"
                />
              </FormControl>
              <FormDescription>Insira a quantidade do presente</FormDescription>
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
              <FormDescription>Insira o preço do presente</FormDescription>
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
                  className="input"
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
                  className="input"
                />
              </FormControl>
              <FormDescription>Insira a descrição do presente</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="btn">
          Enviar
        </Button>
      </form>
    </Form>
  );
}
