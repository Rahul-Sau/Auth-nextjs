"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast from "react-hot-toast";
import AuthShell from "@/components/AuthShell";


export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success", response.data);
      router.push("/login");
    } catch (error) {
      const err = error as Error;
      console.log("Signup failed", err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <AuthShell
      title={loading ? "Creating account..." : "Create your account"}
      subtitle="We'll email you a link to confirm your address."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="link">
            Log in
          </Link>
        </>
      }
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="username" className="field-label">
            Username
          </label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Pick a username"
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="email" className="field-label">
            Email
          </label>
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
          <label htmlFor="password" className="field-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Choose a password"
            className="field-input"
          />
        </div>
        <button
          onClick={onSignup}
          disabled={buttonDisabled || loading}
          className="btn btn-primary w-full"
        >
          {buttonDisabled ? "Fill all fields" : "Create account"}
        </button>
      </div>
    </AuthShell>
  );
}
