"use client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast";
import {useRouter} from "next/navigation"
import { useState } from "react";
export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };
  return (
    <main className="min-h-screen px-6 py-16 sm:px-16">
      <div className="max-w-xl">
        <h1 className="font-display text-4xl tracking-tight">Profile</h1>
        <p className="mt-2 text-muted">Your account details.</p>

        <div className="mt-10 border-t border-line pt-6">
          <p className="text-sm text-muted">User ID</p>
          <p className="mt-1 break-all">
            {data === "nothing" ? (
              "Not loaded yet"
            ) : (
              <Link href={`/profile/${data}`} className="link">
                {data}
              </Link>
            )}
          </p>
        </div>

        <div className="mt-10 flex gap-3">
          <button onClick={getUserDetails} className="btn btn-primary">
            Load my ID
          </button>
          <button onClick={logout} className="btn btn-quiet">
            Log out
          </button>
        </div>
      </div>
    </main>
  );
}
