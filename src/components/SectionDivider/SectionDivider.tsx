interface SectionDividerProps {
  index: number;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  index,
}: SectionDividerProps) => {
  return (
    <div
      className="h-[60vh] w-full bg-cover bg-fixed bg-center"
      style={{
        backgroundImage: `url(/img/bg-${index}.jpg)`,
      }}
    ></div>
  );
};
export default SectionDivider;
