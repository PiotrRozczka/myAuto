import { CarFront, User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { auth } from "@/auth";

export const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="flex items-center justify-between p-3">
      <Link href={"/"} className="text-xl font-semibold">
        myAuto
      </Link>
      <div className="flex gap-5 items-center">
        {!session?.user && (
          <span className="flex">
            <User />
            <Link href={"/login"}>Login</Link>
          </span>
        )}
        {session?.user && (
          <span className="flex gap-2">
            <User />
            {session.user.email}
          </span>
        )}
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
