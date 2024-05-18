import Container from "@/components/Container/Container";
import Gifts from "@/components/Gifts/Gifts";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import Maps from "@/components/Maps/Maps";
import Payment from "@/components/Payment/Payment";
import Section from "@/components/Section/Section";
import SectionDivider from "@/components/SectionDivider/SectionDivider";

export default function Home() {
  return (
    <>
      <Header />
      <div className="font-libre font-bold">
        <Section sectionId="hero">
          <div
            style={{ backgroundPositionX: "48vw" }}
            className="flex w-full items-center justify-center bg-flower bg-center bg-no-repeat"
          >
            <Hero />
          </div>
        </Section>
        <SectionDivider index={1} />
        <Section className="px-0" sectionId="presentes">
          <h1 className="mb-8 mt-12 font-libre text-xl font-light tracking-full text-gray-700">
            PRESENTES
          </h1>
          <Gifts />
        </Section>
        <SectionDivider index={2} />
        <Section sectionId="noivos">
          <Container>
            <div className="m-auto flex flex-col items-center justify-center gap-8">
              <h1
                style={{ textAlign: "center" }}
                className="m-auto w-full text-center font-libre text-xl font-light tracking-full text-gray-700"
              >
                OS NOIVOS
              </h1>
              <img
                src="/img/2.png"
                className="mx-auto h-64 w-64 overflow-hidden rounded-full"
              />
              <p className="text-center font-libre text-sm font-light uppercase text-gray-700">
                JUJUBA coloca alguma coisa bonita aqui
              </p>
              <p className="text-center font-libre text-sm font-light uppercase text-gray-700">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
              </p>
              <p className="text-center font-libre text-sm font-light uppercase text-gray-700">
                emo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi
              </p>
            </div>
          </Container>
        </Section>
        <SectionDivider index={3} />
        <Section sectionId="local">
          <Container>
            <div className="m-auto flex flex-col items-center justify-center gap-8">
              <h1 className="font-libre text-xl font-light tracking-full text-gray-700">
                LOCAL
              </h1>
              <p className="text-center font-libre text-sm font-light uppercase text-gray-700">
                HORÁRIO E LOCAL:
              </p>
              <p className="text-center font-libre text-sm font-light uppercase text-gray-700">
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
