export default function Loading() {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
      <p className="text-gray-600 text-sm">Loading...</p>
    </div>
  );
}
