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
import { Button } from "@/components/ui/button";
import { getFuelTypes } from "@/actions/getFuelTypes";
import { FuelType, CarState, TransmissionType } from "@prisma/client";
import { getCarStates } from "@/actions/getCarStates";
import { getTransmissionTypes } from "@/actions/getTransmissionTypes";
import { getCarOrigins } from "@/actions/getCarOrigins";
import { createCar } from "@/actions/createCar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const { push } = useRouter();
  const { edgestore } = useEdgeStore();

  const [carMakes, setCarMakes] = useState<CarMake[]>([]);
  const [carModels, setCarModels] = useState<CarModel[]>([]);
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
  const [carStates, setCarStates] = useState<CarState[]>([]);
  const [transmissionTypes, setTransmissionTypes] = useState<
    TransmissionType[]
  >([]);
  const [carOrigins, setCarOrigins] = useState<Origin[]>([]);

  const [images, setImages] = useState<ImageListType>([]);
  const [make, setMake] = useState();
  const [model, setModel] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [carState, setCarState] = useState("");
  const [milage, setMilage] = useState(0);
  const [horsepower, setHorsepower] = useState(0);
  const [color, setColor] = useState("");
  const [origin, setOrigin] = useState("");
  const [price, setPrice] = useState(0);
  const [year, setYear] = useState(0);
  const [engineCapacity, setEngineCapacity] = useState(0);
  const [transmissionType, setTransmissionType] = useState("");
  const [city, setCity] = useState("");

  type FileState = {
    file: File | string;
    key: string;
    progress: "PENDING" | "COMPLETE" | "ERROR" | number;
  };
  const [fileStates, setFileStates] = useState<FileState[]>([]);

  useEffect(() => {
    getCarMakes().then((carMakes) => setCarMakes(carMakes));
    getFuelTypes().then((fuelTypes) => setFuelTypes(fuelTypes));
    getCarStates().then((carStates) => setCarStates(carStates));
    getTransmissionTypes().then((transmissionTypes) =>
      setTransmissionTypes(transmissionTypes),
    );
    getCarOrigins().then((carOrigins) => setCarOrigins(carOrigins));
  }, []);

  useEffect(() => {
    make &&
      getCarModelByCarMakeId(make).then((carModels) => setCarModels(carModels));
  }, [make]);

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const submit = async () => {
    const uploadedImagePaths: string[] = [];
    await Promise.all(
      images.map(async (image) => {
        const res = await edgestore.cars.upload({
          file: image.file as File,
          onProgressChange: async (progress) => {
            updateFileProgress(image.key, progress);
            if (progress === 100) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              updateFileProgress(image.key, "COMPLETE");
            }
          },
        });
        if (res.url) {
          uploadedImagePaths.push(res.url);
        }
      }),
    );

    const car = {
      model,
      fuel_type: fuelType as FuelType,
      state: carState as CarState,
      milage,
      horse_power: horsepower,
      color,
      origin,
      price,
      year,
      engine_capacity: engineCapacity,
      transmission_type: transmissionType as TransmissionType,
      images: uploadedImagePaths,
      city,
    };

    try {
      const newCar = await createCar(car);

      toast.success("Car created successfully!");

      push(`/cars/${newCar.id}`);
    } catch (e) {
      toast.error("Couldn't create a car. Please check the form.");
      console.error(e);
    }
  };

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
                <SelectValue placeholder="Make" />
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
                <SelectValue placeholder="Model" />
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
          <div>
            <Label>Fuel type</Label>

            <Select
              value={fuelType}
              // @ts-ignore
              onValueChange={(e) => setFuelType(e)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Fuel type" />
              </SelectTrigger>
              <SelectContent>
                {fuelTypes.map((fuelType: string) => (
                  <SelectItem value={fuelType} key={fuelType}>
                    {fuelType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Car state</Label>

            <Select
              value={carState}
              // @ts-ignore
              onValueChange={(e) => setCarState(e)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Car state" />
              </SelectTrigger>
              <SelectContent>
                {carStates.map((carState: string) => (
                  <SelectItem value={carState} key={carState}>
                    {carState}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Transmission type</Label>

            <Select
              value={transmissionType}
              // @ts-ignore
              onValueChange={(e) => setTransmissionType(e)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Transmission type" />
              </SelectTrigger>
              <SelectContent>
                {transmissionTypes.map((transmissionType: string) => (
                  <SelectItem value={transmissionType} key={transmissionType}>
                    {transmissionType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Origin</Label>

            <Select
              value={origin}
              // @ts-ignore
              onValueChange={(e) => setOrigin(e)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Origin" />
              </SelectTrigger>
              <SelectContent>
                {carOrigins.map((origin: Origin) => (
                  <SelectItem value={origin.id} key={origin.id}>
                    {origin.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Milage</Label>
            <Input
              type="number"
              value={milage}
              onChange={(e) => setMilage(Number.parseFloat(e.target.value))}
            />
          </div>
          <div>
            <Label>Horsepower</Label>
            <Input
              type="number"
              value={horsepower}
              onChange={(e) => setHorsepower(Number.parseFloat(e.target.value))}
            />
          </div>
          {/*engine capacity*/}
          <div>
            <Label>
              Engine capacity (m<sup>3</sup>)
            </Label>
            <Input
              type="number"
              value={engineCapacity}
              onChange={(e) =>
                setEngineCapacity(Number.parseFloat(e.target.value))
              }
            />
          </div>
          <div>
            <Label>Production year</Label>
            <Input
              type="number"
              value={year}
              onChange={(e) => setYear(Number.parseFloat(e.target.value))}
            />
          </div>
          <div>
            <Label>Color</Label>
            <Input value={color} onChange={(e) => setColor(e.target.value)} />
          </div>
          <div>
            <Label>City</Label>
            <Input value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div>
            <Label>Price</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number.parseFloat(e.target.value))}
            />
          </div>
          <Button onClick={() => submit()}>Upload</Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default Page;
