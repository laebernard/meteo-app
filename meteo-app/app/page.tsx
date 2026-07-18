import SearchBar from "@/components/SearchBar";
import Favorites from "@/components/Favorites";

export default function HomePage() {
  return (
    <main className="p-6 max-w-3xl mx-auto space-y-10">

      {/* HEADER */}
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Application Météo</h1>
        <p className="text-gray-500">
          Recherchez une ville et obtenez sa météo en temps réel
        </p>
      </header>

      {/* SEARCH BAR */}
      <section className="bg-white shadow-md border border-gray-100 p-5 rounded-xl">
        <SearchBar />
      </section>

      {/* FAVORIS */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">⭐ Vos favoris</h2>

        <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-4">
          <Favorites />
        </div>
      </section>
    </main>
  );
}
