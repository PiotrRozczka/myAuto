import { auth } from "@/auth";
import { getCarsByOwnerId } from "@/actions/getCarsByOwnerId";
import { CarCard } from "@/components/CarCard";
import Link from "next/link";

export default async function Page() {
  const session = await auth();

  const cars = await getCarsByOwnerId(session?.user?.email as string);

  return (
    <main className="w-screen flex items-center gap-10 flex-col">
      <h2 className="text-2xl">My cars</h2>
      {cars.map((car) => (
        <Link
          href={`/cars/${car.id}`}
          key={car.id}
          className="w-screen flex justify-center gap-10"
        >
          <CarCard
            key={car.id}
            name={`${car.model.make.name} ${car.model.name}`}
            price={car.price}
            city={car.city}
            imageUrl={car.images[0].url}
            milage={car.milage}
            fuelType={car.fuel_type}
            gearBoxType={car.transmission_type}
            productionYear={car.year}
          />
        </Link>
      ))}
    </main>
  );
}
