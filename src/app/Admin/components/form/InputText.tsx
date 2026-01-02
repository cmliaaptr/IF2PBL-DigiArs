type InputTextProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

export default function InputText({
  label,
  placeholder = "Input Text",
  value,
  onChange,
  disabled = false,
}: InputTextProps) {
  return (
    <div>
      <label className="block text-black text-sm font-medium mb-1">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full rounded-md border-2 text-gray-500 px-3 py-2 text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
      />
    </div>
  );
}
