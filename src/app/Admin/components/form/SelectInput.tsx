"use client";

export default function SelectInput({ label, value, onChange, children, disabled=false }: any) {
  return (
    <div>
      <label className="block text-black text-sm font-medium mb-2">{label}</label>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full rounded-md border-2 text-gray-500 px-3 py-2 text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {children}
      </select>
    </div>
  );
}
