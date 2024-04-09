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

interface IFormInput {
  make: CarMake;
  milageFrom: number;
  milageTo: number;
}

export const SearchCard = () => {
  const [carMakes, setCarMakes] = useState<CarMake[]>([]);
  const form = useForm<IFormInput>();

  useEffect(() => {
    getCarMakes().then((carMakes) => setCarMakes(carMakes));
  }, []);

  return (
    <Card className="flex w-1/2">
      <CardHeader>
        <CardTitle>Search for your dream car</CardTitle>
        <CardDescription>
          Here you can adjust your search criteria to find the car that fits
          your dreams.
        </CardDescription>
        <CardContent>
          <Form {...form}>
            <div className="flex flex-col gap-3 w-full">
              <FormField
                control={form.control}
                name="make"
                render={() => (
                  <FormItem>
                    <FormLabel>Make</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Find your make" />
                        </SelectTrigger>
                        <SelectContent>
                          {carMakes.map((carMake) => (
                            <SelectItem value={carMake.name}>
                              {carMake.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="model"
                render={() => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Models..." />
                        </SelectTrigger>
                        <SelectContent>
                          {carMakes.map((carMake) => (
                            <SelectItem value={carMake.name}>
                              {carMake.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              /> */}

              <div className="flex gap-10">
                <FormField
                  control={form.control}
                  name="milageFrom"
                  render={() => (
                    <FormItem>
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
                    <FormItem>
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
      </CardHeader>
    </Card>
  );
};
