import Container from "@/components/Container/Container";
import Hero from "@/components/Hero/Hero";
import Maps from "@/components/Maps/Maps";
import Section from "@/components/Section/Section";

export default function Home() {
  return (
    <div className="h-[300vh] font-libre font-bold">
      <Section sectionId="hero">
        <div
          style={{ backgroundPositionX: "48vw" }}
          className="flex w-full items-center justify-center bg-flower bg-center bg-no-repeat"
        >
          <Hero />
        </div>
      </Section>
      <Section sectionId="noivos">
        <Container>
          <div className="m-auto flex max-w-screen-md flex-col items-center justify-center gap-8">
            <h1 className="font-libre text-xl font-light tracking-full text-gray-700">
              OS NOIVOS
            </h1>
            <img
              src="/img/2.png"
              className="mb-8 h-64 w-64 overflow-hidden rounded-full"
            />
            <p className="text-center font-libre text-sm font-light uppercase text-gray-700">
              JUJUBA coloca alguma coisa bonita aqui
            </p>
            <p className="text-center font-libre text-sm font-light uppercase text-gray-700">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>
            <p className="text-center font-libre text-sm font-light uppercase text-gray-700">
              emo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi
            </p>
          </div>
        </Container>
      </Section>
      <Section sectionId="local">
        <Container>
          <div className="m-auto flex flex-col items-center justify-center gap-8">
            <h1 className="font-libre text-xl font-light tracking-full text-gray-700">
              LOCAL
            </h1>
            <Maps />
          </div>
        </Container>
      </Section>
    </div>
  );
}
