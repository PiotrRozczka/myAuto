"use client";
import { logout } from "@/actions/logout";

export const SignOutButton = () => {
  return <div onClick={() => logout()}>Signout</div>;
};
