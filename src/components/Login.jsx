import { Link } from "react-router-dom"
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
import { auth } from "@/firebase"
import { signInWithEmailAndPassword  } from "firebase/auth"
import { useState } from 'react'
 
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        window.location.href = '/home';
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Card className="mx-auto max-w-sm rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email belo w to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
        <div className="grid gap-4">
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
              <button className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </button>
            </div>
            <Input 
              id="password"
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} />  
          </div>
          {error && <p className="text-red-500">{error}</p>} 
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline">
            Sign Up
          </Link> 
        </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default LoginForm