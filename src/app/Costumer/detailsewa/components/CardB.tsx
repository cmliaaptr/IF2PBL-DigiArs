interface Props {
  img: string;
  name: string;
  onClick: () => void;
}

export default function CardB({ img, name, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="bg-neutral-800 hover:bg-neutral-700 transition cursor-pointer p-3 rounded-xl flex flex-col items-center shadow-md"
    >
      <img
        src={img}
        alt={name}
        className="w-full h-28 object-contain mb-3"
      />
      <p className="text-sm text-center">{name}</p>
    </div>
  );
}
