type InputLinkProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

export default function InputLink({
  label,
  placeholder = "https://instagram.com/username",
  value,
  onChange,
  disabled = false,
}: InputLinkProps) {
  return (
    <div className="space-y-1">
      <label className="block text-black text-sm font-medium mb-1">
        {label}
      </label>

      <input
        type="url"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="
          w-full rounded-md border-2 text-gray-500 px-3 py-2 text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60
        "
      />
    </div>
  );
}
