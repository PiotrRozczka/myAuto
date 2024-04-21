"use client";
import { getCarMakes } from "@/actions/getCarMakes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormLabel } from "@/components/ui/form";
import { FC, useEffect, useState } from "react";
import { ImageDragDrop } from "@/components/ImageDragDrop";

interface pageProps { }

const page: FC<pageProps> = ({ }) => {
  const [carMakes, setCarMakes] = useState<CarMake[]>([]);
  const [carModels, setCarModels] = useState<CarModel[]>([]);

  useEffect(() => {
    getCarMakes().then((carMakes) => setCarMakes(carMakes));
  }, []);

  return (
    <main className="flex w-screen justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Sell your car</CardTitle>
          <CardDescription>
            Fill out this form with information that may interest your potential
            buyers. Take your time to sell a car faster.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ImageDragDrop />
        </CardContent>
      </Card>
    </main>
  );
};

export default page;
