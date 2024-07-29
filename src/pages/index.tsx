import Container from "@/components/Container/Container";
import GiftCards from "@/components/GiftCards/GiftCards";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import Maps from "@/components/Maps/Maps";
import ScrollArrow from "@/components/ScrollArrow/ScrollArrow";
import Section from "@/components/Section/Section";
import SectionDivider from "@/components/SectionDivider/SectionDivider";
import { useRef } from "react";

export default function Home() {
  return (
    <>
      <Header />
      <div className="font-libre font-bold">
        <Section className="h-screen p-0" sectionId="hero">
          <div
            style={{ backgroundPositionX: "50vw" }}
            className="flex h-full w-full items-center justify-center bg-flower bg-no-repeat"
          >
            <Hero />
          </div>
          <ScrollArrow />
        </Section>
        <SectionDivider index={2} />
        <Section sectionId="noivos">
          <Container>
            <div className="m-auto flex flex-col items-center justify-center gap-8 px-4 py-8">
              <h1 className="w-full font-quicksand-light text-3xl font-light tracking-wide text-gray-900">
                OS NOIVOS
              </h1>

              <p className="w-full font-quicksand-light text-2xl font-light tracking-wide text-gray-900">
                Queridos amigos e familiares, sejam bem-vindos ao nosso sonho!
              </p>

              <p className="w-full font-quicksand-light text-xl font-light tracking-wide text-gray-900">
                Se você acessou esse link, significa que são muito especiais
                para nós!
              </p>

              <p className="w-full font-quicksand-light text-xl font-light tracking-wide text-gray-900">
                Estamos imensamente gratos por compartilhar este momento tão
                especial de nossas vidas com todos vocês. Sua presença é o maior
                presente que poderíamos receber.
              </p>

              <p className="w-full font-quicksand-light text-xl font-light tracking-wide text-gray-900">
                Criamos este site com o objetivo de informá-los sobre nosso
                grande dia! Aqui vocês encontrarão a localização do local da
                cerimônia e da festa, e nossa lista de presentes.
              </p>

              <p className="w-full font-quicksand-light text-xl font-light tracking-wide text-gray-900">
                Se vocês desejarem nos presentear, por favor, consultem nossa
                lista de presentes abaixo, e fiquem à vontade para escolher.
                Lembrando que nossa lista contém uma dose de humor hahaha.
              </p>

              <p className="w-full font-quicksand-light text-xl font-light tracking-wide text-gray-900">
                Agradecemos do fundo do coração por todo amor e apoio que nos
                têm dado e por fazerem parte deste capítulo importante de nossas
                vidas.
              </p>

              <p className="w-full font-quicksand-light text-xl font-light tracking-wide text-gray-900">
                Mal podemos esperar para celebrar nosso amor com todos vocês e,
                juntos, criarmos memórias que durarão para sempre.
              </p>

              <p className="w-full font-quicksand-light text-2xl font-light tracking-wide text-gray-900">
                Com amor e gratidão, <strong>Juliana & Gabriel</strong>
              </p>
            </div>
          </Container>
        </Section>
        <SectionDivider index={1} />
        <Section className="px-0" sectionId="presentes">
          <h1 className="mb-8  mt-12 font-quicksand-light text-3xl font-light tracking-wide text-gray-900">
            PRESENTES
          </h1>
          <GiftCards buy />
        </Section>

        <SectionDivider index={3} />
        <Section sectionId="local">
          <Container>
            <div className="m-auto mb-16 flex flex-col items-center justify-center gap-8 ">
              <h1 className="w-full font-quicksand-light text-3xl font-light tracking-wide text-gray-900">
                LOCAL
              </h1>
              <p className="w-full font-quicksand-light text-2xl font-light tracking-wide text-gray-900">
                Horário e local:
              </p>
              <p className="w-full font-quicksand-light text-xl font-light tracking-wide text-gray-900">
                A cerimônia religiosa acontecerá as 17 horas na Igreja Matriz
                Nossa Senhora de Fátima, situada na Avenida Garibaldi Pinheiro.
                Após a cerimônia, os noivos estarão recepcionando os convidados
                na antiga Associação do Banestado (Chácara do Bareta).
              </p>
              <Maps />
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
}
