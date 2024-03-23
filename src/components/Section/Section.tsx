interface SectionProps {
  children: React.ReactNode;
  sectionId?: string;
}

export const Section: React.FC<SectionProps> = ({ children, sectionId }) => {
  return (
    <section
      id={sectionId}
      className="bg-texture flex min-h-8 w-full flex-col items-center justify-center bg-orange-50 bg-opacity-30"
    >
      {children}
    </section>
  );
};

export default Section;
