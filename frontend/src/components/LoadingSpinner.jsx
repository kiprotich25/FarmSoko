export default function LoadingSpinner() {
  return (
    <div className="w-full flex justify-center py-10">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600" />
    </div>
  );
}
