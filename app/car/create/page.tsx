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
import { ImageListType } from "react-images-uploading";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCarModelByCarMakeId } from "@/actions/getCarModelByCarMakeId";
import { db } from "@/lib/db";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [carMakes, setCarMakes] = useState<CarMake[]>([]);
  const [carModels, setCarModels] = useState<CarModel[]>([]);
  const [fuelTypes, setFuelTypes] = useState();

  const [images, setImages] = useState<ImageListType>([]);
  const [make, setMake] = useState();
  const [model, setModel] = useState();

  useEffect(() => {
    getCarMakes().then((carMakes) => setCarMakes(carMakes));
  }, []);

  useEffect(() => {
    make &&
      getCarModelByCarMakeId(make).then((carModels) => setCarModels(carModels));
  }, [make]);

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
        <CardContent className="flex flex-col gap-3">
          <ImageDragDrop imageState={[images, setImages]} />
          <div>
            <Label htmlFor="make">Make</Label>
            {/* @ts-ignore */}
            <Select value={make} onValueChange={(e) => setMake(e)}>
              <SelectTrigger>
                <SelectValue placeholder="Find your make" />
              </SelectTrigger>
              <SelectContent>
                {carMakes.map((carMake) => (
                  <SelectItem value={carMake.id} key={carMake.id}>
                    {carMake.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Model</Label>

            <Select
              disabled={!make}
              value={model}
              // @ts-ignore
              onValueChange={(e) => setModel(e)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Find your make" />
              </SelectTrigger>
              <SelectContent>
                {carModels.map((carModel) => (
                  <SelectItem value={carModel.id} key={carModel.id}>
                    {carModel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default page;
