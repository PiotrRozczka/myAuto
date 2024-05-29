import { CarCard } from "@/components/CarCard";

export default function CarList() {
  const cars = [
    {
      city: "Szczecin",
      imageUrl:
        "https://ocdn.eu/pulscms-transforms/1/2zuktkpTURBXy81NTMzZmJiZTczNWM2YzBlNDE0YTI0OWU1ZDY3MjRlNC5qcGeSlQPNAY_NAfDNBT_NAvSTBc0EsM0Cow",
      name: "BMW M2",
      price: 25000,
      fuelType: "Gas",
      milage: 200000,
      gearBoxType: "Automatic",
      productionYear: 2006,
    },
    {
      city: "Rzeszów",
      imageUrl:
        "https://www.carscare.pl/wp-content/uploads/2023/08/BMW-M3-Mat-5-of-10_edited.jpg",
      name: "BMW M3",
      price: 350000,
      fuelType: "Gas",
      milage: 100000,
      gearBoxType: "Manual",
      productionYear: 2023,
    },
  ];
  return (
    <main className="flex w-screen items-center flex-col gap-10">
      {cars.map((car, index) => (
        <CarCard
          key={index}
          city={car.city}
          imageUrl={car.imageUrl}
          name={car.name}
          price={car.price}
          fuelType={car.fuelType}
          milage={car.milage}
          gearBoxType={car.gearBoxType}
          productionYear={car.productionYear}
        />
      ))}
    </main>
  );
}
