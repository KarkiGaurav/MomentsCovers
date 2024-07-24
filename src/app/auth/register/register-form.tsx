"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/app/auth/register/actions";
import MaxWidthWrapper from "../../../components/MaxWidthWrapper";
import Link from "next/link";
import { Social } from "@/components/auth/social";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values)
        .then((data) => {
          console.log("data=>", data)
          setError(data.error);
          setSuccess(data.success);
        });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <MaxWidthWrapper>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-3xl">Adventure starts here 🚀</h2>
          <p className="opacity-[.6]">Please sign-up to your account and start the adventure</p>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden mt-4 flex flex-col-reverse md:flex-row">
          <div className="w-full md:w-1/2 p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="John Doe"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="john.doe@example.com"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="******"
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                  disabled={isPending}
                  type="submit"
                  className="w-full"
                >
                  Create an account
                </Button>
              </form>
              <div className="mt-4">
              <div className="text-center">
                 <h2 className=""> <span className="opacity-[.5]">Already have an account?</span> <Link href='/auth/login' className="text-red-700 opacity-[1]">Sign in instead</Link> </h2>
              </div>
              <div className="flex items-center w-full">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-4">or</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>


              <div className="mt-4">
                <Social />
              </div>
            </div>
            </Form>
          </div>
          {/* Right Side: Image */}
          <div className="w-full md:w-1/2 block bg-cover bg-center">
            {/* You can replace the URL with the actual path to your image */}
            <img src='/signUp.jpg' className="object-cover min-w-full min-h-full" alt="Sign up hero Image" />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>

  );
};
