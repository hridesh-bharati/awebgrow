'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { websitePackagesData } from '@/components/Home/PricingPackages';
import Link from 'next/link';
import Header from '@/components/Header/Header';

function BookingContent() {
  const searchParams = useSearchParams();

  // URL Query Parameters Parsing
  const packageTitle = searchParams.get('title');
  const planType = searchParams.get('type');
  const basePriceRaw = searchParams.get('price') || '0';
  const featuresList = searchParams.get('features') ? searchParams.get('features').split(',') : [];
  const packageIcon = searchParams.get('icon') || 'bi-layers-fill';
  const packageGradient = searchParams.get('gradient') || 'linear-gradient(135deg, #a855f7, #ec4899)';

  const currentPackage = websitePackagesData.find(
    pkg => pkg.title?.toLowerCase() === packageTitle?.toLowerCase()
  );
  const targetServiceId = currentPackage ? currentPackage.id : packageTitle?.toLowerCase().replace(/\s+/g, '-');

  // Component States
  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderedSuccessfully, setIsOrderedSuccessfully] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  // User details state (Kept unchanged)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  // Parsing numbers
  const basePriceNum = parseInt(basePriceRaw.replace(/[^0-9]/g, '')) || 0;
  const discountAmount = appliedCoupon ? (basePriceNum * appliedCoupon.discount) / 100 : 0;
  const finalPayablePrice = basePriceNum - discountAmount;

  // Fetch Coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await fetch('/api/coupons');
        const data = await res.json();
        if (data.success) setCoupons(data.coupons);
      } catch (err) {
        console.error("Error connecting to Live Token Database:", err);
      }
    };
    fetchCoupons();
  }, []);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    setAppliedCoupon(null);

    const cleanInputCode = couponCode.trim().toUpperCase();
    if (!cleanInputCode) {
      setCouponError('Please enter a coupon code key.');
      return;
    }

    const matchingCoupon = coupons.find(
      (c) => c.code === cleanInputCode && c.serviceId?.toLowerCase() === targetServiceId?.toLowerCase()
    );

    if (matchingCoupon) {
      setAppliedCoupon(matchingCoupon);
      setCouponSuccess(`Code "${matchingCoupon.code}" applied successfully! (${matchingCoupon.discount}% Off)`);
    } else {
      setCouponError('Invalid coupon code or not applicable for this category.');
    }
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const orderPayload = {
      clientName: formData.name,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      architectureRequirements: formData.message,
      selectedService: packageTitle,
      serviceSlugId: targetServiceId,
      packagePlan: planType,
      basePrice: basePriceNum,
      couponApplied: appliedCoupon ? appliedCoupon.code : 'NONE',
      discountReceived: discountAmount,
      finalPayableAmount: finalPayablePrice,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const resData = await response.json();

      if (resData.success) {
        setGeneratedOrderId(resData.id);
        setIsOrderedSuccessfully(true);

        const whatsappMessage = `*🚀 NEW WEBSITE ORDER ARCHITECTURE*%0A` +
          `----------------------------------------%0A` +
          `*Order ID:* ${resData.id}%0A` +
          `*Client Name:* ${orderPayload.clientName}%0A` +
          `*Phone:* ${orderPayload.clientPhone}%0A` +
          `*Service:* ${orderPayload.selectedService} (${orderPayload.packagePlan})%0A` +
          `*Net Payable:* ₹${orderPayload.finalPayableAmount.toLocaleString('en-IN')}.00%0A` +
          `----------------------------------------%0A` +
          `*Requirements:* ${orderPayload.architectureRequirements || 'Standard Architecture.'}`;

        const whatsappUrl = `https://wa.me/917267995307?text=${whatsappMessage}`;

        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
        }, 1200);
      } else {
        alert(`Pipeline error: ${resData.error}`);
      }
    } catch (err) {
      console.error("Redirection pipeline crashed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS GREETING SCREEN (Neon Theme)
  if (isOrderedSuccessfully) {
    return (
      <>
        <Header />
        <div className="w-100 min-vh-100 d-flex align-items-center justify-content-center py-5 bg-theme-main px-3" style={{ marginTop: '60px' }}>
          <div 
            className="card border p-4 p-md-5 text-center rounded-4 shadow-lg animate__animated animate__zoomIn" 
            style={{ 
              backgroundColor: 'var(--bg-card, #0f101a)', 
              borderColor: 'rgba(168, 85, 247, 0.3)', 
              maxWidth: '540px' 
            }}
          >

            {/* Success Icon */}
            <div className="mb-3">
              <i className="bi bi-check-circle-fill text-gradient-pink display-3"></i>
            </div>

            <h3 className="fw-extrabold text-white mb-2 display-6">Order Placed Successfully!</h3>

            <p className="text-theme-secondary mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Thank you, <span className="fw-bold text-white">{formData.name}</span>! Your order for <span className="text-gradient-purple-blue fw-bold">{packageTitle} ({planType})</span> has been received.
            </p>

            {/* Receipt Box */}
            <div className="p-3 mb-4 text-start rounded-3 border" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.1)', fontSize: '0.9rem' }}>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-theme-secondary">Order ID:</span>
                <span className="fw-bold text-white font-monospace">{generatedOrderId}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-theme-secondary">Payment Gateway:</span>
                <span className="text-white fw-medium">WhatsApp Activation</span>
              </div>
              <hr className="my-2" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold text-white">Total Amount:</span>
                <span className="fw-bold fs-5 text-gradient-pink font-monospace">₹{finalPayablePrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <p className="small text-theme-secondary mb-4">
              <i className="bi bi-whatsapp text-success me-1"></i> We are redirecting you to WhatsApp for instant updates.
            </p>

            <Link href="/" className="btn-neon-cta w-100 justify-content-center py-2.5">
              Back to Home Page
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (!packageTitle) {
    return (
      <>
        <Header />
        <div className="container py-5 text-center min-vh-100 d-flex align-items-center justify-content-center" style={{ marginTop: '60px' }}>
          <div className="card p-5 shadow-lg border rounded-4 bg-theme-main" style={{ maxWidth: '500px', backgroundColor: 'var(--bg-card, #0f101a)', borderColor: 'rgba(255,255,255,0.1)' }}>
            <i className="bi bi-exclamation-triangle-fill text-warning display-4 mb-3"></i>
            <h4 className="fw-bold text-white">No Plan Selected</h4>
            <p className="text-theme-secondary small mb-4">Please select a website package plan from our pricing tables to proceed.</p>
            <Link href="/#pricingpackages" className="btn-neon-cta">
              View Pricing Packages
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="w-100 min-vh-100 py-5 px-2 bg-theme-main" style={{ marginTop: '65px' }}>
        <div className="container" style={{ maxWidth: '1140px' }}>
          <div className="row g-4">

            {/* LEFT: Checkout Form */}
            <div className="col-12 col-lg-7">
              <div 
                className="card border p-4 shadow-lg rounded-4" 
                style={{ 
                  backgroundColor: 'var(--bg-card, #0f101a)', 
                  borderColor: 'rgba(255, 255, 255, 0.08)' 
                }}
              >
                <h5 className="fw-bold text-white mb-4 d-flex align-items-center gap-2">
                  <i className="bi bi-person-bounding-box text-gradient-pink"></i> Client Registration Profile
                </h5>

                <form onSubmit={handleCheckoutSubmit}>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label text-theme-secondary small fw-bold">FULL NAME</label>
                      <input 
                        type="text" 
                        required 
                        className="form-control dark-input rounded-3 py-2" 
                        placeholder="John Doe" 
                        value={formData.name} 
                        onChange={e => setFormData({ ...formData, name: e.target.value })} 
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label text-theme-secondary small fw-bold">EMAIL ADDRESS</label>
                      <input 
                        type="email" 
                        required 
                        className="form-control dark-input rounded-3 py-2" 
                        placeholder="john@example.com" 
                        value={formData.email} 
                        onChange={e => setFormData({ ...formData, email: e.target.value })} 
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label text-theme-secondary small fw-bold">WHATSAPP CONTACT</label>
                      <input 
                        type="tel" 
                        required 
                        className="form-control dark-input rounded-3 py-2" 
                        placeholder="+91 XXXXX XXXXX" 
                        value={formData.phone} 
                        onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-theme-secondary small fw-bold">SPECIFIC ARCHITECTURE REQUIREMENTS (OPTIONAL)</label>
                      <textarea 
                        className="form-control dark-input rounded-3" 
                        rows="3" 
                        placeholder="Tell us more about your business requirements..." 
                        value={formData.message} 
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                    </div>
                  </div>

                  <hr className="my-4 border-secondary opacity-25" />

                  {/* COUPON INPUT NODE */}
                  <div className="mb-3">
                    <label className="form-label text-theme-secondary small fw-bold">APPLY PROMO TOKEN</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control dark-input text-uppercase font-monospace rounded-start-3"
                        placeholder="E.G. REAL40"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <button className="btn-secondary-glow px-4 fw-bold rounded-end-3 border-0" type="button" onClick={handleApplyCoupon}>
                        Apply Token
                      </button>
                    </div>
                    {couponError && <div className="text-danger small mt-2 fw-semibold"><i className="bi bi-x-circle-fill me-1"></i> {couponError}</div>}
                    {couponSuccess && <div className="text-success small mt-2 fw-semibold"><i className="bi bi-check-circle-fill me-1"></i> {couponSuccess}</div>}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="btn-neon-cta w-100 py-3 rounded-pill fw-bold text-uppercase mt-4 shadow-sm justify-content-center"
                  >
                    {isSubmitting ? (
                      <span className="spinner-border spinner-border-sm" role="status"></span>
                    ) : (
                      <>Proceed to Activation <i className="bi bi-arrow-right ms-1"></i></>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* RIGHT: Invoice Panel */}
            <div className="col-12 col-lg-5">
              <div className="card border shadow-lg overflow-hidden h-100 rounded-4" style={{ backgroundColor: 'var(--bg-card, #0f101a)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="p-4 text-white d-flex align-items-center gap-3" style={{ background: packageGradient }}>
                  <div className="d-flex align-items-center justify-content-center bg-white bg-opacity-20 rounded-3" style={{ width: '48px', height: '48px', fontSize: '20px' }}>
                    <i className={`bi ${packageIcon}`}></i>
                  </div>
                  <div>
                    <h6 className="fw-bold m-0 text-uppercase tracking-wider opacity-75" style={{ fontSize: '0.72rem' }}>Selected Package</h6>
                    <h4 className="fw-bold m-0" style={{ fontSize: '1.25rem' }}>{packageTitle}</h4>
                  </div>
                </div>

                <div className="p-4 flex-grow-1 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge rounded-pill px-3 py-1.5 fw-bold text-uppercase" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7', border: '1px solid rgba(168, 85, 247, 0.3)', fontSize: '0.68rem' }}>
                        {planType} PLAN
                      </span>
                      <span className="fw-bold text-white font-monospace fs-5">₹{basePriceNum.toLocaleString('en-IN')}</span>
                    </div>

                    <h6 className="fw-bold text-theme-secondary tracking-wide mb-3" style={{ fontSize: '0.72rem' }}>INCLUDED FEATURES:</h6>
                    <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                      {featuresList.map((feat, index) => (
                        <li key={index} className="d-flex align-items-start gap-2 text-theme-secondary" style={{ fontSize: '0.82rem' }}>
                          <i className="bi bi-patch-check-fill text-gradient-pink flex-shrink-0" style={{ fontSize: '0.9rem' }}></i>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 pt-3 border-top border-secondary opacity-75">
                    <div className="d-flex justify-content-between align-items-center mb-2" style={{ fontSize: '0.85rem' }}>
                      <span className="text-theme-secondary">Base Package Price</span>
                      <span className="font-monospace text-white">₹{basePriceNum.toLocaleString('en-IN')}.00</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="d-flex justify-content-between align-items-center mb-2" style={{ fontSize: '0.85rem' }}>
                        <span className="text-success fw-semibold">Promo Discount Token</span>
                        <span className="font-monospace text-success">-₹{discountAmount.toLocaleString('en-IN')}.00</span>
                      </div>
                    )}

                    <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top border-secondary">
                      <span className="fw-bold text-white">Total Payable Amount</span>
                      <span className="fw-bold text-gradient-pink font-monospace fs-4">₹{finalPayablePrice.toLocaleString('en-IN')}.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Input Styling */}
        <style jsx>{`
          .dark-input {
            background-color: rgba(255, 255, 255, 0.04) !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            color: #ffffff !important;
          }
          .dark-input:focus {
            background-color: rgba(255, 255, 255, 0.07) !important;
            border-color: #a855f7 !important;
            box-shadow: 0 0 10px rgba(168, 85, 247, 0.2) !important;
          }
          .dark-input::placeholder {
            color: rgba(255, 255, 255, 0.3) !important;
          }
        `}</style>
      </main>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="w-100 min-vh-100 d-flex align-items-center justify-content-center bg-theme-main">
        <div className="spinner-border text-purple" role="status"></div>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}