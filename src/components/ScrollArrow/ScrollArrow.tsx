import { useLottie } from "lottie-react";
import scrollAnimation from "@/animations/scrolldown.json";
import { useEffect, useRef, useState } from "react";

export const ScrollArrow: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  const options = {
    animationData: scrollAnimation,
    loop: true,
    autoplay: true,
  };

  const { View, animationItem } = useLottie(options);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const parentElement = ref.current.parentElement;
        if (parentElement) {
          const rect = parentElement.getBoundingClientRect();
          const isAtTop = rect.top >= 0 && rect.top <= window.innerHeight * 0.1; // Adjust as needed
          setIsVisible(isAtTop);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);

  useEffect(() => {
    if (animationItem) {
      if (isVisible) {
        animationItem.play();
      } else {
        animationItem.stop();
      }
    }
  }, [isVisible, animationItem]);

  return (
    <div className="" ref={ref}>
      {View}
    </div>
  );
};

export default ScrollArrow;
