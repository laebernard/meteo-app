export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-500"></div>
      <p className="mt-4 text-gray-600 text-lg">Chargement…</p>
    </div>
  );
}
