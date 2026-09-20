"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import AuthShell from "@/components/AuthShell";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false)
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
      
    } catch (error) {
      const err = error as any;
      const errorMessage = err.response?.data?.error || err.message;
      console.log("Login failed", errorMessage);
      toast.error(errorMessage);
    }finally{
      setLoading(false);
    }
  };


  useEffect(()=>{
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  },[user])
    return (
    <AuthShell
      title={loading ? "Logging in..." : "Log in"}
      subtitle="Welcome back. Enter your details to continue."
      footer={
        <>
          New here?{" "}
          <Link href="/signup" className="link">
            Create an account
          </Link>
        </>
      }
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="email" className="field-label">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="you@example.com"
            className="field-input"
          />
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="password" className="field-label">Password</label>
            <Link href="/forgotpassword" className="link text-sm">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Your password"
            className="field-input"
          />
        </div>
        <button
          onClick={onLogin}
          disabled={buttonDisabled || loading}
          className="btn btn-primary w-full"
        >
          {buttonDisabled ? "Fill all fields" : "Log in"}
        </button>
      </div>
    </AuthShell>
  );
}

