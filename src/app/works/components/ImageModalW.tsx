interface ImageModalProp {
  media: { type: "image" | "video"; src: string };
  onClose: () => void;
}

export default function ImageModalW({ media, onClose }: ImageModalProp) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {media.type === "image" ? (
          <img src={media.src} alt="Portfolio" className="w-full rounded-lg" />
        ) : media.src.includes("youtube.com") || media.src.includes("youtu.be") ? (
          <div className="aspect-video w-full">
            <iframe
              src={media.src}
              title="Video Player"
              className="w-full h-full rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <video
            src={media.src}
            controls
            autoPlay
            className="w-full rounded-lg"
          />
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
