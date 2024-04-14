"use client";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";

interface IFormInput {
  login: string;
  password: string;
}

export const Login = () => {
  const form = useForm<IFormInput>();

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="login"
        render={() => (
          <FormItem>
            <FormLabel>Login: </FormLabel>
            <FormControl>
              <Input type="text" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={() => (
          <FormItem>
            <FormLabel>Password: </FormLabel>
            <FormControl>
              <Input type="text" />
            </FormControl>
          </FormItem>
        )}
      />
      <Button>Login</Button>
    </Form>
  );
};
