"use client";
// next
import Link from "next/link";
import { useRouter } from "next/navigation";
// appwrite
import { createNewUser } from "@/lib/api";
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
  name: z.string().min(3, { message: "enter your name" }),
  email: z.string().email({
    message: "Invalid Email",
  }),
  password: z.string().min(8, {
    message: "Must be 8 letters or above",
  }),
});

export default function SignIn_page() {
  return (
    <>
      <main
        id="SignIn_page"
        className="flex justify-center items-center min-h-screen"
      >
        <div className="min-w-[26rem] space-y-[2rem]">
          <h1 className="text-center text-[1.8rem]">Sign In</h1>
          <section className="w-[80%] mx-auto">
            <SignIn />
          </section>
        </div>
      </main>
    </>
  );
}

const SignIn = () => {
  // Defining form
  let { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    //! default values
    defaultValues: {
      email: "",
    },
  });

  // Defining submit function
  let router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // start
    await createNewUser(values).then((check) => {
      if (check == "user exist") {
        toast({
          variant: "destructive",
          description: "User is already exist !",
        });
      } else {
        router.push("/home");
        toast({
          title: "congratulation",
          description: "Your Account was created successfully",
        });
      }
    });
  };
  // Defining inputs
  const inputs: inputs[] = [
    {
      name: "name",
      label: "Name",
      placeholder: "username...",
      inputType: "string",
    },
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
                      <Input
                        type={e.inputType}
                        placeholder={e.placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
          <div className="flex justify-between items-center">
            <Button
              type="submit"
              className="bg-gradient-to-tr from-bright-blue to-check-background-start hover:from-pink-500 hover:to-yellow-500"
            >
              Submit
            </Button>
            <Link href="/" className="underline hover:text-violet-700">
              Login
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
};
