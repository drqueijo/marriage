import { Gift } from "@/types/gift";

type GiftItemProps = Gift;

const GiftItem: React.FC<GiftItemProps> = ({ id, image, name, qtd, price }) => {
  return (
    <div className="max-h-[640px] max-w-screen-sm rounded-md px-3">
      <div
        className="relative flex aspect-square w-full items-center justify-center rounded-md bg-orange-50 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      >
        <p
          style={{
            borderImage:
              "linear-gradient(90deg, #9a7a5f -0.39%, #b29679 2.64%, #ccb597 5.66%, #decbac 8.68%, #ead9b8 11.71%, #eedebd 14.73%, #ddc5a4 22.79%, #cfb08f 31.86%, #c6a482 40.93%, #c4a07e 48.99%, #c6a482 58.06%, #cfb08e 68.14%, #ddc4a3 77.21%, #eedebd 86.28%, #ead9b9 89.3%, #e0cdad 92.32%, #ceb899 94.34%, #b69b7e 97.36%, #9a7a5f 100.39%) 1",
          }}
          className="absolute left-[-16px] top-1 min-w-16 border-2 bg-orange-50 p-2 text-center font-satisfy text-xl font-light text-orange-950"
        >
          {name}
        </p>
      </div>
    </div>
  );
};
export default GiftItem;
