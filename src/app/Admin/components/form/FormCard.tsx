export default function FormCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-xl p-5 md:p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
