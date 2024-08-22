"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar2 from "@/components/Navbar2";
import BackgroundVideo from "@/components/BackgroundSVG";
import {
  signInWithEmailAndPassword,
  signInWithGoogle,
} from "@/lib/firebase/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter(); // Use router for navigation
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      const result = await signInWithEmailAndPassword({ email, password });
      if ("user" in result) {
        // This is a UserCredential object, login was successful
        router.push("/");
      } else {
        // This is an error object
        setErrorMessage(result.error || "Login failed. Please try again.");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error logging in with email and password", error);
        // Handle specific error cases
        if (error.message.includes("user-not-found")) {
          setErrorMessage("No account found with this email. Please sign up.");
        } else if (error.message.includes("wrong-password")) {
          setErrorMessage("Incorrect password. Please try again.");
        } else if (error.message.includes("invalid-email")) {
          setErrorMessage("Invalid email format. Please check your email.");
        } else {
          setErrorMessage("Login failed. Please try again.");
        }
      } else {
        console.error("Unknown error", error);
        setErrorMessage("An unknown error occurred. Please try again later.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage("");
    try {
      const result = await signInWithGoogle();
      if (result === true) {
        router.push("/");
      } else {
        setErrorMessage(
          result?.error || "Google login failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during Google login", error);
      setErrorMessage(
        "An error occurred during Google login. Please try again."
      );
    }
  };
  return (
    <div>
      <Navbar2 />
      {/* <BackgroundVideo /> */}

      <div className="flex items-center justify-center min-h-screen bg-cover bg-center backdrop:blur-md">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errorMessage && (
              <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
            )}
            <form onSubmit={handleLogin} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={(e) => {
                  e.preventDefault();
                  handleGoogleLogin();
                }}
              >
                <Image
                  height={24}
                  width={24}
                  src="/assets/google_icon.svg"
                  alt="Google Logo"
                  unoptimized
                  className="h-8 w-auto cursor-pointer"
                />
                Login with Google
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
