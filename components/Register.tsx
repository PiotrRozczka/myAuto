"use client";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { LoginSchema, RegisterSchema } from "@/lib/validators/user";
import { register } from "@/actions/regster";
import { toast } from "sonner";
import { login } from "@/actions/login";

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

export const Register = () => {
  const form = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (
    values: z.infer<typeof RegisterSchema>,
  ) => {
    try {
      const data = RegisterSchema.parse(values);
      const response = await register(data);

      if (response.error) {
        toast.error(response.error);
        return;
      }

      signIn({ email: data.email, password: data.password });
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (values: z.infer<typeof LoginSchema>) => {
    try {
      const data = LoginSchema.parse(values);
      const response = await login(data);

      if (response && response.error) {
        toast.error(response.error);
        return;
      }

      toast.success("You have been successfully registered!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username: </FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
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
        <Button>Create an account</Button>
      </form>
    </Form>
  );
};
