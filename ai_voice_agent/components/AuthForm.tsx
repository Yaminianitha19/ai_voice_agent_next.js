"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) =>
  z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        console.log("SIGN UP", values);
      } else {
        console.log("SIGN IN", values);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong: ${error}`);
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-black text-white shadow-lg rounded-xl p-10 w-full max-w-2xl">
        {/* Logo & Title */}
        <div className="flex flex-col items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={48} height={42} />
          <h2 className="text-2xl font-bold text-primary-100">PrepWise</h2>
        </div>

        <h3 className="text-center text-gray-300 mt-3">Practice With AI</h3>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" className="w-full" {...field} />
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
                    <Input type="password" placeholder="Enter your password" className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-md" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        {/* Link to switch between Sign In & Sign Up */}
        <p className="text-center mt-4 text-sm text-gray-400">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <Link href={!isSignIn ? "/sign-in" : "/sign-up"} className="text-purple-400 font-bold ml-1">
            {!isSignIn ? "Sign in" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
