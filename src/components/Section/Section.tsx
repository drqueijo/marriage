import { twMerge } from "tailwind-merge";

interface SectionProps {
  children: React.ReactNode;
  sectionId?: string;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  sectionId,
  className,
}) => {
  return (
    <section
      id={sectionId}
      className={twMerge(
        "flex min-h-8 w-full flex-col items-center justify-center bg-orange-50 bg-opacity-30 bg-texture px-4",
        className,
      )}
    >
      {children}
    </section>
  );
};

export default Section;
