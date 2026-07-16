import { Suspense } from 'react';
import ResetPassword from "@/components/AuthSystem/ResetPassword";

export default function ResetPasswordpage() {
  return (
    <main className="d-flex align-items-center justify-content-center min-vh-100 bg-light pt-5">
      <section className="w-100 px-3" style={{ maxWidth: '440px' }}>
        <Suspense fallback={
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status"></div>
            <span className="ms-2 small text-muted">Loading authentication form...</span>
          </div>
        }>
          <ResetPassword />
        </Suspense>
      </section>
    </main>
  );
}