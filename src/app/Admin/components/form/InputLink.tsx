type InputLinkProps = {
  label: string;
  placeholder?: string;
};

export default function InputLink({
  label,
  placeholder = "https://example.com/image.jpg",
}: InputLinkProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type="url"
        placeholder={placeholder}
        className="
          w-full rounded-md
          border border-gray-300
          px-3 py-2 text-sm
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
          focus:border-blue-500
        "
      />
    </div>
  );
}
