import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input";
import { Button } from "@/srccomponents/ui/button";
import { useForm } from "react-hook-form";
import { signinValidation } from "@/srclib/validation";
import Loader from "C:/Users/isaac/Desktop/Snappy/src/components/shared/Loader.tsx"
import { useSignInAccount } from "@/srclib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
// import { z } from "zod";


const SigninForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading  } = useUserContext();
  const navigate = useNavigate();
  

  const { mutateAsync: signInAccount} = useSignInAccount();
  // define your form
  const form = useForm<z.infer<typeof signinValidation>>({
    resolver: zodResolver(signinValidation),
    defaultValues: {
      password: '',
      email: '',
    },
  })


  async function onSubmit(values: z.infer<typeof signinValidation>) {

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if(!session){
      return toast({ title:'Sign in failed. Please try again. '})
    }

    const isLoggedIn = await checkAuthUser();
    
    if(isLoggedIn){
      form.reset();

      navigate('/');
    } else {
      return toast({ title: ' Sign in failed. Please try again. '})
    }
  };

  return (
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
          <img src="/assets/images/logo.svg" alt="logo"></img>

          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log into your account</h2>
          <p className="text-light-3 small-medium md:base-regular">Welcome back! Please enter your details.</p>


        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
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
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader/> Loading...
              </div>
            ): "Sign in"}
          </Button>

          <p className="text-small-regular text-light-2 text-center">
            Don't have an account?
            <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Sign up</Link>
          </p>
        </form>
        </div>
      </Form>
  )
}

export default SigninForm