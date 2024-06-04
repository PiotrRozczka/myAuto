"use client";
import { getCars } from "@/actions/getCars";
import { CarCard } from "@/components/CarCard";
import { useEffect, useState } from "react";

export default function CarList() {
  const [cars, setCars] = useState({});

  useEffect(() => {
    async () => {
      await setCars(getCars({ make: "BMW", model: "M2" }));
    };
  }, []);

  console.log(cars);

  // const cars = [
  //   {
  //     city: "Szczecin",
  //     imageUrl:
  //       "https://ocdn.eu/pulscms-transforms/1/2zuktkpTURBXy81NTMzZmJiZTczNWM2YzBlNDE0YTI0OWU1ZDY3MjRlNC5qcGeSlQPNAY_NAfDNBT_NAvSTBc0EsM0Cow",
  //     name: "BMW M2",
  //     price: 25000,
  //     fuelType: "Gas",
  //     milage: 200000,
  //     gearBoxType: "Automatic",
  //     productionYear: 2006,
  //   },
  //   {
  //     city: "Rzeszów",
  //     imageUrl:
  //       "https://www.carscare.pl/wp-content/uploads/2023/08/BMW-M3-Mat-5-of-10_edited.jpg",
  //     name: "BMW M3",
  //     price: 350000,
  //     fuelType: "Gas",
  //     milage: 100000,
  //     gearBoxType: "Manual",
  //     productionYear: 2023,
  //   },
  // ];
  return <main className="flex w-screen items-center flex-col gap-10"></main>;
}
