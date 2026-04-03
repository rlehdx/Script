"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface CheckoutButtonProps {
  plan: "creator" | "agency";
  billingCycle?: "monthly" | "annual";
  className?: string;
  children: React.ReactNode;
}

export default function CheckoutButton({
  plan,
  billingCycle = "monthly",
  className,
  children,
}: CheckoutButtonProps) {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!isSignedIn) {
      router.push("/sign-up");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, billingCycle }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Failed to open checkout. Please try again.");
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={className}
    >
      {loading ? "Redirecting..." : children}
    </button>
  );
}
