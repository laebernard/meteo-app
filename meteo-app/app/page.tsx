import SearchBar from "@/components/SearchBar";
import Favorites from "@/components/Favorites";

export default function HomePage() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Application Météo</h1>

      <SearchBar />

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Vos favoris</h2>
        <Favorites />
      </section>
    </main>
  );
}
