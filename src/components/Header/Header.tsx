import { useState, useEffect } from "react";
import usePaths from "@/hooks/usePaths";
import Link from "next/link";
import { Container } from "../Container/Container";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const { paths, scrollTo } = usePaths({});
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the page has been scrolled past a certain threshold
      const offset = window.scrollY;
      if (offset > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`bg-orange-100 bg-opacity-50 ${isSticky ? "invisible opacity-0" : ""} fixed left-0 right-0 top-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-in-out`}
    >
      <Container className="flex gap-8" noMargin>
        {Object.keys(paths).map((key) => (
          <button
            key={key}
            onClick={() => scrollTo(paths[key as keyof typeof paths].section)}
            className="font-quicksand-light transition-all duration-300 ease-in-out hover:text-orange-950"
          >
            {paths[key as keyof typeof paths].name}
          </button>
        ))}
      </Container>
    </div>
  );
};

export default Header;
