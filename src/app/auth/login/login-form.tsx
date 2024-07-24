"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { LoginSchema } from "@/schemas";
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
import { login } from "@/app/auth/login/actions";
import { Social } from "../../../components/auth/social";
import MaxWidthWrapper from "../../../components/MaxWidthWrapper";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email already in use with different provider!"
    : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    
    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          // if (data?.twoFactor) {
          //   setShowTwoFactor(true);
          // }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
    <MaxWidthWrapper>
    <div className="flex flex-col justify-center items-center">
            <h2 className="text-3xl">Welcome to MomentsCovers! 👋🏻</h2>
            <p className="opacity-[.6]">Please sign-in to your account and start the adventure</p>
          </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden mt-4 flex flex-col-reverse md:flex-row">
        <div className="w-full md:w-1/2 p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                {showTwoFactor && (
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Two Factor Code</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isPending} placeholder="123456" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {!showTwoFactor && (
                  <>
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
                  </>
                )}
              </div>
              <FormError message={error || urlError} />
              <FormSuccess message={success} />
              <Button disabled={isPending} type="submit" className="w-full">
                {showTwoFactor ? 'Confirm' : 'Login'}
              </Button>
            </form>

            <div className="mt-4">
              <div className="text-center">
                 <h2 className=""> <span className="opacity-[.5]">New on our platform? </span> <Link href='/auth/register' className="text-red-700 opacity-[1]">Create an account</Link> </h2>
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
          <img src='/hero.jpg' className="object-cover min-w-full min-h-full" alt="Login hero Image"/>
        </div>
      </div>
    </MaxWidthWrapper>
  </div>
  );
};
