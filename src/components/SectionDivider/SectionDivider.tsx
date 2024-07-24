interface SectionDividerProps {
  index: number;
  ref?: React.RefObject<HTMLDivElement>;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  index,
  ref,
}: SectionDividerProps) => {
  return (
    <div
      ref={ref}
      className="h-[60vh] w-full bg-cover bg-fixed bg-center"
      style={{
        backgroundImage: `url(/img/bg-${index}.jpg)`,
      }}
    ></div>
  );
};
export default SectionDivider;
