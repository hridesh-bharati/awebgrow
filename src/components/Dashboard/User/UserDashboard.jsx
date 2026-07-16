"use client";

export default function UserDashboard({ session, onLogout }) {
  return (
    <section className="card shadow-sm border-0 rounded-4 p-4 bg-white mx-auto" style={{ maxWidth: '600px' }}>
      <header className="text-center border-bottom pb-4 mb-4">
        <div className="position-relative d-inline-block mb-3">
          <img 
            src={session?.profileImage || "/images/default-avatar.jpg"} 
            alt="Profile View" 
            className="rounded-circle object-fit-cover border border-3 border-primary shadow-sm"
            width="110" 
            height="110" 
          />
          <span className="position-absolute bottom-0 end-0 bg-success border border-white border-2 rounded-circle p-2" title="Session Active"></span>
        </div>
        <h1 className="h3 fw-bold text-dark m-0">Welcome, {session?.name}!</h1>
        <p className="text-muted small m-0">{session?.email}</p>
      </header>

      <div className="bg-light p-3 rounded-3 border mb-4">
        <h3 className="h6 fw-bold text-secondary mb-3 text-uppercase small">Your Account Metadata</h3>
        <div className="d-flex flex-column gap-3"> {/* Bootstrap me gap-2.5 nahi hota, gap-3 use karein */}
          <div className="d-flex justify-content-between border-bottom pb-2 small">
            <span className="text-muted">Account ID:</span>
            <span className="font-monospace text-dark fw-medium">{session?.uid}</span>
          </div>
          <div className="d-flex justify-content-between border-bottom pb-2 small">
            <span className="text-muted">Security Group:</span>
            <span className="badge bg-secondary rounded-pill px-3">Standard Premium User</span>
          </div>
          <div className="d-flex justify-content-between small">
            <span className="text-muted">System Platform Access:</span>
            <span className="text-success fw-medium">Granted (Level 1)</span>
          </div>
        </div>
      </div>

      <footer className="d-flex gap-2">
        <a href="/" className="btn btn-primary rounded-pill flex-grow-1 py-2 fw-medium">
          <i className="bi bi-house-door me-2"></i>Back to Home Site
        </a>
        <button onClick={onLogout} className="btn btn-outline-danger rounded-pill px-4 py-2 fw-medium" aria-label="Sign out">
          <i className="bi bi-box-arrow-right"></i>
        </button>
      </footer>
    </section>
  );
}