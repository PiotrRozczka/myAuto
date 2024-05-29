"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { getCarMakes } from "@/actions/getCarMakes";
import { getCarModelByCarMakeId } from "@/actions/getCarModelByCarMakeId";

interface IFormInput {
  make: CarMake;
  model: CarModel;
  milageFrom: number;
  milageTo: number;
}

export const SearchCard = () => {
  const [carMakes, setCarMakes] = useState<CarMake[]>([]);
  const [carModels, setCarModels] = useState<CarModel[]>([]);
  const form = useForm<IFormInput>();
  const [make, setMake] = useState();

  useEffect(() => {
    getCarMakes().then((carMakes) => setCarMakes(carMakes));
  }, []);

  useEffect(() => {
    if (make) {
      getCarModelByCarMakeId(make).then((carModel) => setCarModels(carModel));
    }
  }, [make]);

  console.log(make);

  return (
    <Card className="flex flex-col w-1/2">
      <CardHeader>
        <CardTitle>Search for your dream car</CardTitle>
        <CardDescription>
          Here you can adjust your search criteria to find the car that fits
          your dreams.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="flex flex-col gap-3 ">
            <div className="flex gap-10">
              <FormField
                control={form.control}
                name="make"
                render={() => (
                  <FormItem className="w-1/2">
                    <FormLabel>Make</FormLabel>
                    <FormControl>
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
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={() => (
                  <FormItem className="w-1/2">
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Select disabled={!make}>
                        <SelectTrigger>
                          <SelectValue placeholder="Find your model" />
                        </SelectTrigger>
                        <SelectContent>
                          {carModels.map((carModel) => (
                            <SelectItem value={carModel.id}>
                              {carModel.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-10">
              <FormField
                control={form.control}
                name="milageFrom"
                render={() => (
                  <FormItem className="w-1/2">
                    <FormLabel>Milage</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="From" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="milageFrom"
                render={() => (
                  <FormItem className="w-1/2">
                    <FormLabel className="invisible">Milage to</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="To" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="mt-5 flex justify-end w-full">
            <Button type="submit">Find the best car</Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};
