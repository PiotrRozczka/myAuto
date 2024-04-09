import { CarFront, User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-3">
      <Link href={"/"} className="text-xl font-semibold">
        myAuto
      </Link>
      <div className="flex gap-5 items-center">
        <span className="flex">
          <User />
          <Link href={"/login"}>Login</Link>
        </span>
        <Link href={"/car/create"}>
          <Button className="flex gap-2">
            <CarFront />
            Sell your car
          </Button>
        </Link>
      </div>
    </nav>
  );
};
