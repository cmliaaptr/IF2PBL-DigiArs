"use client";

interface ImageModalProps {
  img: string;
  title: string;
  onClose: () => void;
}

export default function ImageModal({ img, title, onClose }: ImageModalProps) {
  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 bg-black/70 backdrop-blur-sm
        flex items-center justify-center
        z-50 animate-fadeIn
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl w-full mx-4 animate-zoomIn"
      >
        <img
          src={img}
          alt={title}
          className="rounded-xl w-full h-auto shadow-2xl"
        />

        <p className="text-center text-white mt-4 text-lg">{title}</p>
      </div>
    </div>
  );
}
