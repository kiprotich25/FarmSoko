export default function EmptyState({ message }) {
  return (
    <div className="text-center text-gray-500 py-16">
      <p className="text-lg">{message || "Nothing to show yet."}</p>
    </div>
  );
}
