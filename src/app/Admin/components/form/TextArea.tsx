"use client";

type TextAreaProps = {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
};

export default function TextArea({
  label,
  value,
  onChange,
  placeholder = "Input Text",
  rows = 3,
  disabled = false,
}: TextAreaProps) {
  return (
    <div>
      <label className="block text-black text-sm font-medium mb-1">
        {label}
      </label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        value={value ?? ""}     
        onChange={onChange}     
        disabled={disabled}
        className="w-full rounded-md border-2 text-gray-500 px-3 py-2 text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
      />
    </div>
  );
}
