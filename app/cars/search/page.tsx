import { db } from "@/lib/db";
import { getCars } from "@/actions/getCars";
import { CarCard } from "@/components/CarCard";
import { SearchCard } from "@/components/SearchCard";
import Link from "next/link";

interface SearchParams {
  [key: string]: string;
}

export default async function Page({ searchParams }: SearchParams) {
  const { make, model, milageFrom, milageTo } = searchParams as unknown as {
    make: string;
    model: string;
    milageFrom: string;
    milageTo: string;
  };

  const cars = await getCars({
    make,
    model,
    milageFrom: parseInt(milageFrom),
    milageTo: parseInt(milageTo),
  });

  return (
    <main className="flex w-screen items-center flex-col gap-10">
      <SearchCard />
      {cars.length > 0 ? (<div className="w-screen flex flex-col items-center gap-10">
        {cars.map((car) => (
            <Link
                href={`/cars/${car.id}`}
                key={car.id}
                className="w-screen flex justify-center"
            >
              <CarCard
                  name={`${car.model.make.name} ${car.model.name}`}
                  city={car.city}
                  fuelType={car.fuel_type}
                  imageUrl={car.images[0].url}
                  milage={car.milage}
                  gearBoxType={car.transmission_type}
                  price={car.price}
                  productionYear={car.year}
              />
            </Link>
        ))}
      </div>): <h3 className='text-slate-400'>No cars found...</h3>}
    </main>
  );
  // return <h1>Test</h1>
}
