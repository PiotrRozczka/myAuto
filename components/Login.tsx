"use client";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@/lib/validators/user";
import { login } from "@/actions/login";
import { toast } from "sonner";

interface IFormInput {
  email: string;
  password: string;
}

export const Login = () => {
  const form = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (
    values: z.infer<typeof LoginSchema>,
  ) => {
    const result = await login(values);
    if (result?.error) toast.error(result?.error);

    console.log(result);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email: </FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password: </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button>Login</Button>
      </form>
    </Form>
  );
};
