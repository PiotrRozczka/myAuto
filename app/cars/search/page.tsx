"use client";
import { useState, useEffect } from "react";
import { SearchCard } from "@/components/SearchCard";
import { useSearchParams } from "next/navigation";
import { searchValidator } from "@/lib/validators/search";
import { getCars } from "@/actions/getCars";
import { z } from "zod";

const Page = () => {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState([]);
  interface StringMap {
    [key: string]: string;
  }

  const fetchCars = async (params: z.infer<typeof searchValidator>) => {
    const cars = await getCars(params);

    console.log(cars);
  };

  useEffect(() => {
    const paramsObject: StringMap = {};
    searchParams.forEach((param, index) => (paramsObject[index] = param));
    const parsedParams = searchValidator.parse(paramsObject);

    fetchCars(parsedParams);
  }, []);

  return (
    <main className="flex w-screen items-center flex-col gap-10">
      <SearchCard />
    </main>
  );
};

export default Page;
