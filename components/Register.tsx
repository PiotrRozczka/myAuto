"use client";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

export const Register = () => {
  const form = useForm<IFormInput>();

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="username"
        render={() => (
          <FormItem>
            <FormLabel>Username: </FormLabel>
            <FormControl>
              <Input type="text" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={() => (
          <FormItem>
            <FormLabel>Email: </FormLabel>
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
      <Button>Create an account</Button>
    </Form>
  );
};
