"use client";
import Login from "@/components/AuthSystem/Login";

export const metadata = {
  title: "Secure Login | WebGrow Workspace Dashboard",
  description: "Access your cloud account on WebGrow network securely via authorization credentials.",
  robots: "noindex, nofollow", 
};

export default function LoginPage() {
  return (
    <main className="d-flex align-items-center justify-content-center bg-light">
      <section className="w-100 p-0 container">
        <Login />
      </section>
    </main>
  );
}