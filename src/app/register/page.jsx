import CreateAccount from "@/components/AuthSystem/CreateAccount";

export const metadata = {
  title: "Join WebGrow | Create Professional Enterprise Account",
  description: "Register a secure cryptographic identity token configuration under our workspace mesh.",
  robots: "noindex, nofollow",
};

export default function RegisterPage() {
  return (
    <main className="d-flex align-items-center justify-content-center min-vh-100 bg-light p-0 m-0">
        <CreateAccount />
    </main>
  );
}