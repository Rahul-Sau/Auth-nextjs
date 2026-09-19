"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className="p-1 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-amber-100 text-black"
      />
      <label htmlFor="password">password</label>
      <input
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        className="p-1 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-amber-100 text-black"
      />
      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "Fill all fields" : "Login here"}
      </button>
      <Link href="/signup" className="text-blue-500 hover:underline">
        Visit signup
      </Link>
    </div>
  );
}
