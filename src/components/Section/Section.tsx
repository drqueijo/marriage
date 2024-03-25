interface SectionProps {
  children: React.ReactNode;
  sectionId?: string;
}

export const Section: React.FC<SectionProps> = ({ children, sectionId }) => {
  return (
    <section
      id={sectionId}
      className="flex min-h-8 w-full flex-col items-center justify-center bg-orange-50 bg-opacity-30 bg-texture"
    >
      {children}
    </section>
  );
};

export default Section;
