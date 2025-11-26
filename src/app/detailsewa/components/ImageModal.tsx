interface ModalProps {
  img: string;
  onClose: () => void;
}

export default function ImageModal({ img, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-4 rounded-xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-white text-black w-8 h-8 rounded-full"
        >
          ✕
        </button>
        {/* Image Preview popup */}
        <img src={img} alt="Preview" className="w-[300px] rounded-lg" />
      </div>
    </div>
  );
}
