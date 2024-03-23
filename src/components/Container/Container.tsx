import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  noMargin?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  noMargin,
}) => {
  const margin = noMargin ? "" : "py-12";
  return (
    <div className={twMerge("w-full max-w-screen-lg", margin, className)}>
      {children}
    </div>
  );
};
export default Container;
