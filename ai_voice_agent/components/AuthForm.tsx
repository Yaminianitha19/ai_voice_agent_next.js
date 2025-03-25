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
    <div className="auth-container">
      {/* Logo & Title */}
      <div className="logo-section">
        <Image 
          src="/image.png" 
          alt="AI Logo" 
          width={60} 
          height={60} 
          className="w-auto h-auto"
          priority={true}
          unoptimized
        />
        <h2>PrepWise</h2>
        <h3>Practice With AI</h3>
      </div>

      {/* Form */}
      <div className="form-section">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="form">
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your name" 
                        {...field}
                      />
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
                    <Input 
                      placeholder="Enter your email"
                      {...field}
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
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="btn">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="footer-text">
        {isSignIn ? (
          <p>Don't have an account? <Link href="/sign-up" className="hover:underline">Sign Up</Link></p>
        ) : (
          <p>Already have an account? <Link href="/sign-in" className="hover:underline">Sign In</Link></p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
