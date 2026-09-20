"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AuthShell from "@/components/AuthShell";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSendLink = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword", { email });
      toast.success(response.data.message);
    } catch (error) {
      const err = error as any;
      const errorMessage = err.response?.data?.error || err.message;
      console.log("Forgot password failed", errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email]);

  return (
    <AuthShell
      title={loading ? "Sending..." : "Reset your password"}
      subtitle="Enter your email and we'll send you a link to choose a new one."
      footer={
        <Link href="/login" className="link">
          Back to log in
        </Link>
      }
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="email" className="field-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="field-input"
          />
        </div>
        <button
          onClick={onSendLink}
          disabled={buttonDisabled || loading}
          className="btn btn-primary w-full"
        >
          {buttonDisabled ? "Enter your email" : "Send reset link"}
        </button>
      </div>
    </AuthShell>
  );
}
