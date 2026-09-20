"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import AuthShell from "@/components/AuthShell";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onResetPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", {
        token,
        password,
        confirmPassword,
      });
      toast.success(response.data.message);
      router.push("/login");
    } catch (error) {
      const err = error as any;
      const errorMessage = err.response?.data?.error || err.message;
      console.log("Reset password failed", errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0 && password.length > 0 && confirmPassword.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [token, password, confirmPassword]);

  return (
    <AuthShell
      title={loading ? "Saving..." : "Choose a new password"}
      subtitle="Use at least 6 characters."
      footer={
        <Link href="/login" className="link">
          Back to log in
        </Link>
      }
    >
      <div className="space-y-5">
        {!token && (
          <p className="text-sm text-danger">
            This link is missing its token. Request a new reset email.
          </p>
        )}
        <div>
          <label htmlFor="password" className="field-label">
            New password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="field-label">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat the password"
            className="field-input"
          />
        </div>
        <button
          onClick={onResetPassword}
          disabled={buttonDisabled || loading}
          className="btn btn-primary w-full"
        >
          {buttonDisabled ? "Fill all fields" : "Save new password"}
        </button>
      </div>
    </AuthShell>
  );
}
