// src/app/register/page.tsx
import CreateAccount from "@components/AuthSystem/CreateAccount";

export const metadata = {
  title: "Create Account | AWebGrow - Join Our Community",
  description: "Create your AWebGrow account to access exclusive resources, project management tools, and connect with our expert team.",
};

export default function RegisterPage() {
  return (
    <main className="d-flex align-items-center justify-content-center min-vh-100" style={{ 
      backgroundColor: '#020203',
      paddingTop: '65px'
    }}>
      <CreateAccount />
    </main>
  );
}