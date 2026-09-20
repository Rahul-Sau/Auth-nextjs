"use client"

import axios from "axios"
import Link from "next/link"
import React,{useEffect, useState} from "react"
import AuthShell from "@/components/AuthShell";

export default function VerifyEmailPage(){
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <AuthShell
      title="Verify your email"
      subtitle={
        verified
          ? "Your email is confirmed. You can log in now."
          : error
            ? "This link is invalid or has expired."
            : token
              ? "Checking your link..."
              : "This link is missing its token."
      }
    >
      {verified && (
        <Link href="/login" className="btn btn-primary w-full">
          Log in
        </Link>
      )}
      {error && (
        <Link href="/signup" className="btn btn-quiet w-full">
          Back to sign up
        </Link>
      )}
    </AuthShell>
  );
}