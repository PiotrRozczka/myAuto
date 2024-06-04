import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Fuel, Gauge, Cog, Calendar } from "lucide-react";

interface CarCardProps {
  name: string;
  price: number;
  city: string;
  imageUrl: string;
  milage: number;
  fuelType: string;
  gearBoxType: string;
  productionYear: number;
}

export const CarCard = ({
  name,
  price,
  city,
  imageUrl,
  milage,
  fuelType,
  gearBoxType,
  productionYear,
}: CarCardProps) => {
  return (
    <Card className="w-5/6 flex">
      <div className="h-44 flex justify-center items-center pl-3">
        <img className="h-36 rounded-sm " src={imageUrl} alt="car thumbnail" />
      </div>
      <div className="w-full">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span>{name}</span>{" "}
            <span className="text-primary">{price.toLocaleString()} PLN</span>
          </CardTitle>
          <CardDescription className="flex gap-3">
            <Gauge size={20} />
            {milage} km <Fuel size={20} />
            {fuelType} <Cog size={20} /> {gearBoxType} <Calendar size={20} />
            {productionYear}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p></p>
        </CardContent>
        <CardFooter>
          <p>{city}</p>
        </CardFooter>
      </div>
    </Card>
  );
};
