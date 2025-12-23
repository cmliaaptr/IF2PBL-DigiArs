export default function TextArea({ label }) {
  return (
    <div>
      <label className="block text-black text-sm font-medium mb-1">
        {label}
      </label>
      <textarea
        rows={3}
        placeholder="Input Text"
        className="w-full rounded-md border-2 text-gray-500 px-3 py-2 text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}