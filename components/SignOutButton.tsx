"use client";
import { logout } from "@/actions/logout";

export const SignOutButton = () => {
  return <div onClick={() => logout()}>Sign out</div>;
};
