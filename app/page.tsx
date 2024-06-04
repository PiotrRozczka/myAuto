import { SearchCard } from "@/components/SearchCard";
import { CarCard } from "@/components/CarCard";

export default async function Home() {
  const cars = [];

  return (
    <main className="flex w-screen items-center flex-col gap-10">
      <SearchCard />
    </main>
  );
}
