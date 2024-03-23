interface HeroProps {}

export const Hero: React.FC<HeroProps> = ({}) => {
  const positioning = (x: number, y: number): React.CSSProperties => {
    return {
      position: "absolute",
      top: `${y}%`,
      left: `${x}%`,
    };
  };

  return (
    <div
      className="my-52 flex h-[380px] w-[440px] flex-col items-center justify-center gap-7 border-4 bg-orange-50"
      style={{
        borderImage:
          "linear-gradient(90deg, #9a7a5f -0.39%, #b29679 2.64%, #ccb597 5.66%, #decbac 8.68%, #ead9b8 11.71%, #eedebd 14.73%, #ddc5a4 22.79%, #cfb08f 31.86%, #c6a482 40.93%, #c4a07e 48.99%, #c6a482 58.06%, #cfb08e 68.14%, #ddc4a3 77.21%, #eedebd 86.28%, #ead9b9 89.3%, #e0cdad 92.32%, #ceb899 94.34%, #b69b7e 97.36%, #9a7a5f 100.39%) 1",
      }}
    >
      <div className="bg-separator relative h-12 w-11 bg-center bg-no-repeat">
        <div
          className="font-quicksand-bold text-2xl"
          style={positioning(0, -19)}
        >
          J
        </div>
        <div
          className="font-quicksand-bold text-2xl"
          style={positioning(60, 50)}
        >
          G
        </div>
      </div>
      <div className="tracking-full flex flex-col items-center justify-center  gap-4">
        <p className="font-libre text-xl font-light text-gray-600">JULIANA</p>
        <img className="my-1" src="/img/svg/and.svg" />
        <p className="font-libre tracking-full text-xl font-light text-gray-600">
          GABRIEL
        </p>
      </div>
      <div className="flex gap-5 text-sm font-thin tracking-wider text-gray-600">
        21<span>| </span>09<span>| </span>2024
      </div>
    </div>
  );
};
export default Hero;
