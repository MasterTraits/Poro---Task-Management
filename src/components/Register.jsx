import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { db, auth } from '@/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";

function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Add user details to Firestore
      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        firstName,
        lastName,
        email,
      });

      // Set registration success to true
      setRegistrationSuccess(true);
    } catch (error) {
      console.error(error.message);
    }
  };


  return (
    <Card className="mx-auto max-w-sm rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister}>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input 
              id="first-name" 
              placeholder = "e.g. Juan" 
              required 
              onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input 
              id="last-name" 
              placeholder = "e.g. Dela Cruz" 
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
            placeholder="Password"
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder = "Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
        </div>
        </form>
        {registrationSuccess && (
          <div className="mt-4 text-center text-sm">
            Registration successful!{" "}
            <Link to="/login" className="underline cursor-pointer">
              Login
            </Link>{" "}
            to continue.
          </div>
        )}
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default RegisterForm