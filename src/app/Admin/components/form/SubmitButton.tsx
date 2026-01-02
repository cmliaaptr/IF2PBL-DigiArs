"use client";

type SubmitButtonProps = {
  text?: string;
  disabled?: boolean;
  type?: "submit" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function SubmitButton({
  text = "Simpan",
  disabled = false,
  type = "submit",
  onClick,
}: SubmitButtonProps) {
  return (
    <div className="flex justify-end">
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className="bg-blue-600 hover:bg-blue-700 text-white
        text-sm px-5 py-2 rounded-full transition
        disabled:opacity-60 disabled:hover:bg-blue-600"
      >
        {text}
      </button>
    </div>
  );
}
