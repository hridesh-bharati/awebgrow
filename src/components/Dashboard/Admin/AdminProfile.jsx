"use client";

import { useEffect, useState, useRef } from 'react';
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

  // Hidden File Input Ke Liye Ref
  const fileInputRef = useRef(null);

  const defaultAdminUid = "hridesh027_gmail_com"; 
  const activeUid = session?.uid || defaultAdminUid;

  useEffect(() => {
    if (!activeUid) return;

    const userRef = ref(rtdb, `users/${activeUid}`);
    const unsubscribe = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      
      setName(data?.name || session?.name || 'hridesh');
      setEmail(data?.email || session?.email || 'hridesh027@gmail.com');
      setPhone(data?.phone || session?.phone || '');
      setProfileImage(data?.profileImage || session?.profileImage || "/images/default-avatar.jpg");
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [activeUid, session]);

  // Image Upload Handler (Base64 Conversion)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB Limit Check
        alert("Image size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaveLoading(true);
    try {
      await update(ref(rtdb, `users/${activeUid}`), { 
        name: name,
        phone: phone.trim(),
        profileImage: profileImage // Database me Profile Image Save ki ja rahi hai
      });
      setIsEditing(false);
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
      <div className="d-flex justify-content-center align-items-center vh-100 bg-theme-main text-theme-primary">
        <div className="text-center">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-theme-secondary fw-semibold">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div 
            className="rounded-4 overflow-hidden border"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
              boxShadow: '0 10px 30px var(--shadow-color)'
            }}
          >
            {/* Header */}
            <div 
              className="p-4 border-bottom text-white" 
              style={{ 
                background: 'linear-gradient(135deg, #a855f7 0%, #ff0080 100%)',
                borderColor: 'var(--border-subtle)'
              }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h4 className="fw-black mb-0 text-white" style={{ fontWeight: 900 }}>Admin Profile</h4>
                  <p className="text-white-50 small mb-0 fw-medium">Manage your personal credentials &amp; contact info</p>
                </div>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)} 
                    className="btn btn-light btn-sm rounded-pill px-4 py-2 fw-black shadow-sm"
                    style={{ fontWeight: 800 }}
                  >
                    <Edit2 size={15} className="me-1.5" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 p-md-5">
              {/* Profile Avatar Header */}
              <div className="d-flex align-items-center gap-4 mb-4 pb-4 border-bottom" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="position-relative">
                  <img 
                    src={profileImage} 
                    alt="Avatar" 
                    className="rounded-circle object-fit-cover border border-3 border-primary shadow-sm" 
                    width="80" 
                    height="80" 
                  />
                  
                  {/* Camera Icon Button & Hidden File Input */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageChange} 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                    disabled={!isEditing}
                  />
                  <div 
                    onClick={() => isEditing && fileInputRef.current.click()}
                    className="position-absolute bottom-0 end-0 rounded-circle p-1" 
                    style={{ 
                      background: '#ff0080', 
                      cursor: isEditing ? 'pointer' : 'not-allowed',
                      opacity: isEditing ? 1 : 0.6
                    }}
                    title={isEditing ? "Click to change photo" : "Click Edit Profile first"}
                  >
                    <Camera size={14} className="text-white" />
                  </div>
                </div>
                <div>
                  <h5 className="fw-black mb-1 text-theme-primary" style={{ fontWeight: 800 }}>{name}</h5>
                  <span 
                    className="badge rounded-pill px-3 py-1.5 text-white"
                    style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', fontSize: '0.7rem' }}
                  >
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
                      className="form-control text-theme-primary border"
                      id="nameInput"
                      placeholder="Full Name"
                      value={name} 
                      disabled={!isEditing} 
                      onChange={(e) => setName(e.target.value)}
                      style={{ 
                        backgroundColor: 'var(--bg-pill)',
                        borderColor: isEditing ? '#a855f7' : 'var(--border-subtle)',
                        color: 'var(--text-primary)'
                      }}
                    />
                    <label htmlFor="nameInput" className="text-theme-secondary">
                      <User size={16} className="me-2" />
                      Full Name
                    </label>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="form-floating">
                    <input 
                      type="tel" 
                      className="form-control text-theme-primary border"
                      id="phoneInput"
                      placeholder="Mobile Number"
                      value={phone} 
                      disabled={!isEditing} 
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ 
                        backgroundColor: 'var(--bg-pill)',
                        borderColor: isEditing ? '#a855f7' : 'var(--border-subtle)',
                        color: 'var(--text-primary)'
                      }}
                    />
                    <label htmlFor="phoneInput" className="text-theme-secondary">
                      <Phone size={16} className="me-2" />
                      Mobile Number
                    </label>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="form-floating">
                    <input 
                      type="email" 
                      className="form-control text-theme-primary border"
                      id="emailInput"
                      placeholder="Email Address"
                      value={email} 
                      disabled 
                      style={{ 
                        backgroundColor: 'var(--bg-pill)',
                        borderColor: 'var(--border-subtle)',
                        opacity: 0.7,
                        color: 'var(--text-primary)'
                      }}
                    />
                    <label htmlFor="emailInput" className="text-theme-secondary">
                      <Mail size={16} className="me-2" />
                      Email Address
                    </label>
                  </div>
                </div>
              </div>

              {/* Password Reset Trigger */}
              <div className="mt-4 pt-3 border-top" style={{ borderColor: 'var(--border-subtle)' }}>
                <button 
                  onClick={() => setShowResetModal(true)} 
                  type="button" 
                  className="btn-secondary-glow"
                >
                  <Key size={16} />
                  Reset Password
                </button>
              </div>

              {/* Action Buttons when editing */}
              {isEditing && (
                <div className="d-flex gap-3 justify-content-end mt-4 pt-3 border-top" style={{ borderColor: 'var(--border-subtle)' }}>
                  <button 
                    onClick={() => setIsEditing(false)} 
                    type="button" 
                    className="btn btn-secondary-glow rounded-pill px-4"
                    disabled={saveLoading}
                  >
                    <X size={18} className="me-1.5" />
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave} 
                    type="button" 
                    className="btn-neon-cta py-2 px-4 fs-6"
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
        <div 
          className="modal show d-block p-3" 
          tabIndex={-1} 
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div 
              className="modal-content rounded-4 border text-theme-primary"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
                boxShadow: '0 20px 60px var(--shadow-color)'
              }}
            >
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-black text-theme-primary d-flex align-items-center" style={{ fontWeight: 800 }}>
                  <Key size={20} className="me-2 text-primary" />
                  Reset Password
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
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
                    <h6 className="fw-black text-theme-primary" style={{ fontWeight: 800 }}>Check Your Email</h6>
                    <p className="text-theme-secondary small">
                      A password reset link has been sent to <strong>{email}</strong>
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-theme-secondary small mb-3" style={{ fontWeight: 500 }}>
                      We will send an official password reset email link to your registered address.
                    </p>
                    <div className="p-3 rounded-3 border d-flex align-items-center" style={{ backgroundColor: 'var(--bg-pill)', borderColor: 'var(--border-subtle)' }}>
                      <Mail size={16} className="me-2 text-theme-secondary" />
                      <strong className="text-theme-primary">{email}</strong>
                    </div>
                  </>
                )}
              </div>

              <div className="modal-footer border-0 pt-0">
                {!resetSent && (
                  <>
                    <button 
                      type="button" 
                      className="btn btn-secondary-glow rounded-pill px-4" 
                      onClick={() => {
                        setShowResetModal(false);
                        setResetSent(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="button" 
                      className="btn-neon-cta py-2 px-4" 
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
                    className="btn-neon-cta py-2 px-4" 
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
    </div>
  );
}