import { SearchCard } from "@/components/SearchCard";
import { CarCard } from "@/components/CarCard";

export default function Home() {
  return (
    <main className="flex w-screen items-center flex-col gap-10">
      <SearchCard />
      <CarCard
        city="Szczecin"
        imageUrl="https://ocdn.eu/pulscms-transforms/1/2zuktkpTURBXy81NTMzZmJiZTczNWM2YzBlNDE0YTI0OWU1ZDY3MjRlNC5qcGeSlQPNAY_NAfDNBT_NAvSTBc0EsM0Cow"
        name="BMW M2"
        price={25000}
        fuelType="Gas"
        milage={200000}
        gearBoxType="Authomatic"
        productionYear={2006}
      />
    </main>
  );
}
