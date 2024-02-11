"use client";
// next
import Link from "next/link";
import { useRouter } from "next/navigation";
// appwrite
import { userLogin } from "@/lib/api";
// hooks
import { useLayoutEffect } from "react";
// ! appwrite
import { account } from "@/appwrite";
// ? types
import { inputs } from "@/types";
// form
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// shadcn-ui
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormMessage,
  FormItem,
  FormField,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid Email",
  }),
  password: z.string().min(8, {
    message: "Must be 8 letters or above",
  }),
});

export default function Home() {
  let router = useRouter();
  useLayoutEffect(() => {
    let userInfo = account
      .get()
      .then((res) => {
        router.push("/home");
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(userInfo);
  }, []);
  return (
    <>
      <main
        id="Login_page"
        className="flex justify-center items-center min-h-screen"
      >
        <div className="max-w-[28rem] space-y-[2rem]">
          <h1 className="text-center text-[1.8rem]">
            Welcome to Online Todo app from
            <span className="font-bold"> Front end mentor</span>
          </h1>
          <section className="w-[80%] mx-auto">
            <Login />
          </section>
        </div>
      </main>
    </>
  );
}

const Login = () => {
  // Defining form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    //! default values
    defaultValues: {
      email: "",
    },
  });

  // Defining submit function
  let router = useRouter();
  let { toast } = useToast();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    await userLogin(values).then((res) => {
      if (res == "user does not exist") {
        toast({
          variant: "destructive",
          description: "User does not exit !",
        });
      } else if (res == "access") {
        router.push("/home");
      } else {
        toast({
          variant: "destructive",
          description: "Wrong password",
        });
      }
    });
  };
  // Defining inputs
  const inputs: inputs[] = [
    {
      name: "email",
      label: "Email",
      placeholder: "example@gmail.com",
      inputType: "string",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "your password",
      inputType: "password",
    },
  ];
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {inputs.map((e: any, i) => {
            return (
              <FormField
                key={i}
                control={form.control}
                name={e.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{e.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={e.placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
          <div className="flex justify-between items-center">
            <Button type="submit">Submit</Button>
            <Link href="/signIn" className="underline hover:text-violet-700">
              Sign in
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
};
