"use client";

import { useEffect, useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { rtdb, auth } from '@/lib/firebase'; 
import { ref, onValue, update } from 'firebase/database';
import { 
  User, 
  Mail, 
  Phone, 
  Camera, 
  Edit2, 
  Save, 
  X, 
  Key,
  Shield,
  CheckCircle,
  Loader2
} from 'lucide-react';

export default function AdminProfile({ session }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [resetLoading, setResetLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const defaultAdminUid = "hridesh027_gmail_com"; 
  const activeUid = session?.uid || defaultAdminUid;

  useEffect(() => {
    if (!activeUid) return;

    const userRef = ref(rtdb, `users/${activeUid}`);
    const unsubscribe = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      
      setName(data?.name || session?.name || 'Hridesh');
      setEmail(data?.email || session?.email || 'hridesh027@gmail.com');
      setPhone(data?.phone || session?.phone || '');
      setProfileImage(data?.profileImage || session?.profileImage || "/images/default-avatar.jpg");
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [activeUid, session]);

  const handleSave = async () => {
    setSaveLoading(true);
    try {
      await update(ref(rtdb, `users/${activeUid}`), { 
        name: name,
        phone: phone.trim()
      });
      setIsEditing(false);
      // Show success feedback
    } catch (error) {
      alert("Update failed!");
    } finally {
      setSaveLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) return;
    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setTimeout(() => {
        setShowResetModal(false);
        setResetSent(false);
      }, 3000);
    } catch (error) {
      alert("Failed: " + error.message);
    } finally {
      setResetLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
            {/* Header with gradient */}
            <div className="card-header bg-gradient-primary text-white p-4 border-0" style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h4 className="fw-bold mb-0 text-white">Profile</h4>
                  <p className="text-white-50 small mb-0">Manage your personal information</p>
                </div>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)} 
                    className="btn btn-light btn-sm rounded-pill px-4 py-2 fw-semibold shadow-sm hover-lift"
                  >
                    <Edit2 size={16} className="me-2" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            <div className="card-body p-4 p-md-5">
              {/* Profile Header */}
              <div className="d-flex align-items-center gap-4 mb-4 pb-4 border-bottom">
                <div className="position-relative">
                  <img 
                    src={profileImage} 
                    alt="Avatar" 
                    className="rounded-circle object-fit-cover border border-3 border-primary shadow-sm" 
                    width="80" 
                    height="80" 
                  />
                  <div className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-1 border border-2 border-white">
                    <Camera size={14} className="text-white" />
                  </div>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">{name}</h5>
                  <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2">
                    <Shield size={12} className="me-1" />
                    Super Administrator
                  </span>
                </div>
              </div>

              {/* Form Fields */}
              <div className="row g-4">
                <div className="col-12">
                  <div className="form-floating">
                    <input 
                      type="text" 
                      className={`form-control ${isEditing ? 'bg-white' : 'bg-light'}`}
                      id="nameInput"
                      placeholder="Full Name"
                      value={name} 
                      disabled={!isEditing} 
                      onChange={(e) => setName(e.target.value)}
                      style={{ borderColor: isEditing ? '#667eea' : 'transparent' }}
                    />
                    <label htmlFor="nameInput" className="text-muted">
                      <User size={16} className="me-2" />
                      Full Name
                    </label>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="form-floating">
                    <input 
                      type="tel" 
                      className={`form-control ${isEditing ? 'bg-white' : 'bg-light'}`}
                      id="phoneInput"
                      placeholder="Mobile Number"
                      value={phone} 
                      disabled={!isEditing} 
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ borderColor: isEditing ? '#667eea' : 'transparent' }}
                    />
                    <label htmlFor="phoneInput" className="text-muted">
                      <Phone size={16} className="me-2" />
                      Mobile Number
                    </label>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="form-floating">
                    <input 
                      type="email" 
                      className="form-control bg-light"
                      id="emailInput"
                      placeholder="Email Address"
                      value={email} 
                      disabled 
                      style={{ borderColor: 'transparent' }}
                    />
                    <label htmlFor="emailInput" className="text-muted">
                      <Mail size={16} className="me-2" />
                      Email Address
                    </label>
                  </div>
                </div>
              </div>

              {/* Password Reset Section */}
              <div className="mt-4 pt-3 border-top">
                <button 
                  onClick={() => setShowResetModal(true)} 
                  type="button" 
                  className="btn btn-outline-primary btn-sm rounded-pill px-4 py-2"
                >
                  <Key size={16} className="me-2" />
                  Reset Password
                </button>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="d-flex gap-3 justify-content-end mt-4 pt-3 border-top">
                  <button 
                    onClick={() => setIsEditing(false)} 
                    type="button" 
                    className="btn btn-light rounded-pill px-4 py-2"
                    disabled={saveLoading}
                  >
                    <X size={18} className="me-2" />
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave} 
                    type="button" 
                    className="btn btn-primary rounded-pill px-4 py-2 shadow-sm hover-lift"
                    disabled={saveLoading}
                  >
                    {saveLoading ? (
                      <>
                        <Loader2 size={18} className="me-2 spinner-border spinner-border-sm" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} className="me-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">
                  <Key size={20} className="me-2 text-primary" />
                  Reset Password
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => {
                    setShowResetModal(false);
                    setResetSent(false);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                {resetSent ? (
                  <div className="text-center py-4">
                    <CheckCircle size={48} className="text-success mb-3" />
                    <h6 className="fw-bold">Check Your Email</h6>
                    <p className="text-muted small">
                      A password reset link has been sent to <strong>{email}</strong>
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-muted">
                      We'll send a password reset link to your registered email address.
                    </p>
                    <div className="alert alert-info bg-light border-0 rounded-3">
                      <Mail size={16} className="me-2" />
                      <strong>{email}</strong>
                    </div>
                  </>
                )}
              </div>
              <div className="modal-footer border-0 pt-0">
                {!resetSent && (
                  <>
                    <button 
                      type="button" 
                      className="btn btn-light rounded-pill px-4" 
                      onClick={() => {
                        setShowResetModal(false);
                        setResetSent(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-primary rounded-pill px-4 shadow-sm" 
                      onClick={handlePasswordReset}
                      disabled={resetLoading}
                    >
                      {resetLoading ? (
                        <>
                          <Loader2 size={18} className="me-2 spinner-border spinner-border-sm" />
                          Sending...
                        </>
                      ) : (
                        'Send Reset Link'
                      )}
                    </button>
                  </>
                )}
                {resetSent && (
                  <button 
                    type="button" 
                    className="btn btn-primary rounded-pill px-4" 
                    onClick={() => {
                      setShowResetModal(false);
                      setResetSent(false);
                    }}
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS */}
      <style jsx>{`
        .bg-gradient-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .hover-lift {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        .form-control {
          transition: all 0.3s ease;
          padding: 0.75rem 1rem;
        }
        .form-control:disabled {
          opacity: 0.7;
        }
        .form-control:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
        }
        .form-floating label {
          padding: 0.75rem 1rem;
        }
        .form-floating .form-control:disabled ~ label {
          opacity: 0.6;
        }
        .modal {
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}