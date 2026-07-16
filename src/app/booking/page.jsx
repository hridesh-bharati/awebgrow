'use client';
// src\app\booking\page.jsx
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
  const packageGradient = searchParams.get('gradient') || 'linear-gradient(135deg, #1e293b, #0f172a)';

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

  // User details state
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  // Parsing absolute numbers for arithmetic manipulation
  const basePriceNum = parseInt(basePriceRaw.replace(/[^0-9]/g, '')) || 0;
  const discountAmount = appliedCoupon ? (basePriceNum * appliedCoupon.discount) / 100 : 0;
  const finalPayablePrice = basePriceNum - discountAmount;

  // Fetch Coupons from production API
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await fetch('/api/coupons');
        const data = await res.json();
        if (data.success) setCoupons(data.coupons);
      } catch (err) {
        console.error("Error connecting to Live Token Database Matrix:", err);
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
      setCouponSuccess(`Code "${matchingCoupon.code}" applied successfully! (${matchingCoupon.discount}% Off applied)`);
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
      // 1. POST payload metadata to production server endpoint
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const resData = await response.json();

      if (resData.success) {
        setGeneratedOrderId(resData.id);
        setIsOrderedSuccessfully(true);

        // 2. Initialize WhatsApp fallback redirection mapping
        const whatsappMessage = `*🚀 NEW WEBSITE ORDER ARCHITECTURE*%0A` +
          `----------------------------------------%0A` +
          `*Order ID:* ${resData.id}%0A` +
          `*Client Name:* ${orderPayload.clientName}%0A` +
          `*Phone:* ${orderPayload.clientPhone}%0A` +
          `*Service:* ${orderPayload.selectedService} (${orderPayload.packagePlan})%0A` +
          `*Net Payable:* ₹${orderPayload.finalPayableAmount.toLocaleString('en-IN')}.00%0A` +
          `----------------------------------------%0A` +
          `*Requirements:* ${orderPayload.architectureRequirements || 'Standard Architecture.'}`;

        const whatsappUrl = `https://wa.me/91XXXXXXXXXX?text=${whatsappMessage}`; // Replace XXXXXXXXXX with your number

        // Delayed trigger for native UX feel
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

  // SUCCESS GREETING CONTEXT PANEL
  if (isOrderedSuccessfully) {
    return (
      <>
        <Header />
        <div className="w-100  d-flex align-items-center justify-content-center mt-5 py-3" style={{ backgroundColor: '#f1f3f6' }}>
          <div className="card border-0 shadow-sm p-4 p-md-5 text-center mt-3 bg-white" style={{ borderRadius: '16px', maxWidth: '540px' }}>

            {/* Success Flag / Badge */}
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" >
              <i className="bi bi-check-circle-fill text-success me-2" style={{ fontSize: '2.5rem' }}></i>
              <h3 className="fw-bold text-primary mb-2" style={{ color: '#212121' }}>Order Placed Successfully!</h3>

            </div>

            {/* Main Heading */}

            {/* Friendly Greeting */}
            <p className="text-muted mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
              Thank you, <span className="fw-bold text-dark">{formData.name}</span>! Your order for <span className="fw-bold text-primary">{packageTitle} ({planType})</span> has been received and is being processed.
            </p>

            {/* Order Details Receipt Box */}
            <div className="p-3 mb-4 text-start" style={{ backgroundColor: '#f9f9f9', borderRadius: '12px', border: '1px dashed #e0e0e0', fontSize: '0.9rem' }}>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Order ID:</span>
                <span className="fw-bold text-dark">{generatedOrderId}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Payment Mode:</span>
                <span className="text-dark fw-medium">WhatsApp Gateway</span>
              </div>
              <hr className="my-2" style={{ borderColor: '#e0e0e0' }} />
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold text-dark">Total Amount:</span>
                <span className="fw-bold fs-5" style={{ color: '#388e3c' }}>₹{finalPayablePrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Info Message */}
            <p className="small text-muted mb-4">
              <i className="bi bi-whatsapp text-success me-1"></i> We are redirecting you to WhatsApp for instant updates. If it doesn't open, please wait.
            </p>

            {/* Navigation Button */}
            <div className="d-flex flex-column gap-2">
              <Link href="/" className="btn w-100 py-2.5 fw-bold text-white rounded-3" style={{ backgroundColor: '#ff6145', border: 'none', boxShadow: '0 2px 4px 0 rgba(0,0,0,.2)' }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!packageTitle) {
    return (
      <div className="container py-5 text-center">
        <div className="card p-5 shadow-sm border-0 rounded-4 max-width-md mx-auto" style={{ maxWidth: '500px' }}>
          <i className="bi bi-exclamation-triangle-fill text-warning display-4 mb-3"></i>
          <h4 className="fw-bold text-dark">No Plan Selected</h4>
          <p className="text-muted small">Please access the pricing tables index array to complete checkout routing execution pipeline.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-100 min-vh-100 py-5 px-2" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)' }}>
      <div className="container" style={{ maxWidth: '1140px' }}>
        <div className="row g-4">

          {/* LEFT: Checkout Form & User Matrix */}
          <div className="col-12 col-lg-7">
            <div className="card border-0 shadow-sm p-4 bg-white" style={{ borderRadius: '24px' }}>
              <h5 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                <i className="bi bi-person-bounding-box text-primary"></i> Client Registration Profile
              </h5>

              <form onSubmit={handleCheckoutSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label text-secondary small fw-bold">FULL NAME</label>
                    <input type="text" required className="form-control rounded-3 py-2" placeholder="John Doe" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-secondary small fw-bold">EMAIL ADDRESS</label>
                    <input type="email" required className="form-control rounded-3 py-2" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-secondary small fw-bold">WHATSAPP CONTACT</label>
                    <input type="tel" required className="form-control rounded-3 py-2" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-secondary small fw-bold">SPECIFIC ARCHITECTURE REQUIREMENTS (OPTIONAL)</label>
                    <textarea className="form-control rounded-3" rows="3" placeholder="Tell us more about your business scale configuration..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
                  </div>
                </div>

                <hr className="my-4 opacity-50" />

                {/* COUPON INPUT NODE INTERFACE */}
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-bold">APPLY PROMO ENGINE TOKEN</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control text-uppercase font-monospace rounded-start-3"
                      placeholder="E.G. REAL40"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button className="btn btn-dark px-4 fw-bold rounded-end-3" type="button" onClick={handleApplyCoupon}>
                      Apply Token
                    </button>
                  </div>
                  {couponError && <div className="text-danger small mt-2 fw-semibold"><i className="bi bi-x-circle-fill"></i> {couponError}</div>}
                  {couponSuccess && <div className="text-success small mt-2 fw-semibold"><i className="bi bi-check-circle-fill"></i> {couponSuccess}</div>}
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-primary w-100 py-3 rounded-pill fw-bold text-uppercase mt-4 shadow-sm d-flex align-items-center justify-content-center gap-2">
                  {isSubmitting ? (
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                  ) : (
                    <>Proceed to Activation Protocol <i className="bi bi-arrow-right"></i></>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: Dynamic Invoice */}
          <div className="col-12 col-lg-5">
            <div className="card border-0 shadow-sm bg-white overflow-hidden h-100" style={{ borderRadius: '24px' }}>
              <div className="p-4 text-white d-flex align-items-center gap-3" style={{ background: packageGradient }}>
                <div className="d-flex align-items-center justify-content-center bg-white bg-opacity-20 rounded-3" style={{ width: '48px', height: '48px', fontSize: '20px' }}>
                  <i className={`bi ${packageIcon}`}></i>
                </div>
                <div>
                  <h6 className="fw-bold m-0 text-uppercase tracking-wider" style={{ fontSize: '0.75rem', opacity: 0.8 }}>Target Profile Blueprint</h6>
                  <h4 className="fw-bold m-0" style={{ fontSize: '1.25rem' }}>{packageTitle} System</h4>
                </div>
              </div>

              <div className="p-4 flex-grow-1 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-dark bg-opacity-10 text-dark px-2.5 py-1.5 fw-bold rounded-pill text-uppercase" style={{ fontSize: '0.65rem' }}>
                      {planType} Package Deployment
                    </span>
                    <span className="fw-bold text-secondary font-monospace">₹{basePriceNum.toLocaleString('en-IN')}</span>
                  </div>

                  <h6 className="fw-bold text-secondary tracking-wide mb-2.5" style={{ fontSize: '0.7rem' }}>INCLUDED TARGET METRICS:</h6>
                  <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                    {featuresList.map((feat, index) => (
                      <li key={index} className="d-flex align-items-start gap-2 text-dark" style={{ fontSize: '0.8rem' }}>
                        <i className="bi bi-patch-check-fill text-success flex-shrink-0" style={{ fontSize: '0.9rem' }}></i>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-top border-light">
                  <div className="d-flex justify-content-between align-items-center mb-2" style={{ fontSize: '0.85rem' }}>
                    <span className="text-muted">System Value Valuation</span>
                    <span className="font-monospace text-dark">₹{basePriceNum.toLocaleString('en-IN')}.00</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="d-flex justify-content-between align-items-center mb-2" style={{ fontSize: '0.85rem' }}>
                      <span className="text-success fw-semibold">Cloud Promo Reduction Token</span>
                      <span className="font-monospace text-success">-₹{discountAmount.toLocaleString('en-IN')}.00</span>
                    </div>
                  )}

                  <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top border-dashed">
                    <span className="fw-bold text-dark">Net Payable Invoice Matrix</span>
                    <span className="fw-bold text-primary font-monospace fs-4">₹{finalPayablePrice.toLocaleString('en-IN')}.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="w-100 min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}