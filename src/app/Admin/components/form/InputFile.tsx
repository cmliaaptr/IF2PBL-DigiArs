"use client";

type InputFileProps = {
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  disabled?: boolean;
};

export default function InputFile({
  label,
  onChange,
  accept,
  disabled = false,
}: InputFileProps) {
  return (
    <div>
      <label className="block text-black text-sm font-medium mb-1">
        {label}
      </label>
      <input
        type="file"
        accept={accept}
        disabled={disabled}
        onChange={onChange}  
        className="w-full text-sm
        file:mr-4 file:rounded-md 
        border-2 text-white-400 file:border-0
        file:bg-blue-600 file:px-4 file:py-2
        file:text-sm file:font-medium
        hover:file:bg-blue-400 disabled:opacity-60"
      />
    </div>
  );
}
