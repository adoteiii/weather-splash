"use client";

import React, { useState } from "react";
import firebase from "@/lib/firebase/clientApp";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

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
import BackgroundVideo from "@/components/BackgroundVideo";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const router = useRouter(); // Use router for navigation

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      // Optionally, update the user profile with additional info
      await user?.updateProfile({
        displayName: `${firstName} ${lastName}`,
      });
      router.push("/"); // Redirect to home page upon successful signup
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error signing up with email and password", error);
        alert(error.message);
      } else {
        console.error("Unknown error", error);
        alert("An unknown error occurred");
      }
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      router.push("/"); // Redirect to home page upon successful signup
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error signing in with Google", error);
        alert(error.message);
      } else {
        console.error("Unknown error", error);
        alert("An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <Navbar2 />
      <BackgroundVideo />

      <div className="flex items-center justify-center min-h-screen bg-cover bg-center backdrop:blur-md">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    placeholder="First Name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    placeholder="Last Name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </form>
            <Button variant="outline" className="w-full mt-4" onClick={handleGoogleSignUp}>
              <Image
                height={24}
                width={24}
                src="/assets/google_icon.svg"
                alt="Google Logo"
                unoptimized
                className="h-8 w-auto cursor-pointer"
              />
              Sign up with Google
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
