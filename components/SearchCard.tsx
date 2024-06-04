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
import { useRouter } from "next/navigation";

interface IFormInput {
  make: string;
  model: string;
  milageFrom: number;
  milageTo: number;
}

export const SearchCard = () => {
  const { push } = useRouter();

  const [carMakes, setCarMakes] = useState<CarMake[]>([]);
  const [carModels, setCarModels] = useState<CarModel[]>([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [milageFrom, setMilageFrom] = useState("");
  const [milageTo, setMilageTo] = useState("");

  const form = useForm<IFormInput>();

  useEffect(() => {
    getCarMakes().then((carMakes) => setCarMakes(carMakes));
  }, []);

  useEffect(() => {
    if (make) {
      getCarModelByCarMakeId(make).then((carModel) => setCarModels(carModel));
    }
  }, [make]);

  const onSubmit: SubmitHandler<IFormInput> = async (values) => {
    push(
      `/cars/search?make=${make}&model=${model}&milageFrom=${milageFrom}&milageTo=${milageTo}`,
    );
  };

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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3 ">
              <div className="flex gap-10">
                <FormField
                  control={form.control}
                  name="make"
                  render={(field) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Make</FormLabel>
                      <FormControl>
                        {/* @ts-ignore */}
                        <Select
                          value={make}
                          onValueChange={(e) => setMake(e)}
                          {...field}
                        >
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
                  render={(field) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <Select
                          disabled={!make}
                          {
                            ...field /* @ts-ignore */
                          }
                          onValueChange={(e) => setModel(e)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Find your model" />
                          </SelectTrigger>
                          <SelectContent>
                            {carModels.map((carModel) => (
                              <SelectItem value={carModel.id} key={carModel.id}>
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
                  render={(field) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Milage</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="From"
                          {...field}
                          value={milageFrom}
                          onChange={(e) => setMilageFrom(e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="milageTo"
                  render={(field) => (
                    <FormItem className="w-1/2">
                      <FormLabel className="invisible">Milage to</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="To"
                          {...field}
                          value={milageTo}
                          onChange={(e) => setMilageTo(e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end w-full">
              <Button>Find the best car</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
