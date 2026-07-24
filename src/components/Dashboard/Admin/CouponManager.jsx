'use client';

import React, { useState, useEffect } from 'react';
import { websitePackagesData } from '@/components/Home/PricingPackages';

export default function CouponManager() {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('');
  const [errorLog, setErrorLog] = useState('');

  // Fetch from Firebase via API
  const fetchCoupons = async () => {
    try {
      const res = await fetch('/api/coupons');
      const data = await res.json();
      if (data.success) setCoupons(data.coupons);
    } catch (err) {
      console.error("Error fetching coupons:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleOpenCouponEngine = (service) => {
    setSelectedService(service);
    setErrorLog('');
    setNewCouponCode('');
    setNewDiscount('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const basePriceNum = selectedService ? parseInt(selectedService.startingPrice.replace(/[^0-9]/g, '')) : 0;
  const discountPercentNum = parseInt(newDiscount) || 0;
  const liveDiscountInRs = (basePriceNum * discountPercentNum) / 100;
  const liveFinalPrice = basePriceNum - liveDiscountInRs;

  const handleAddNewCoupon = async (e) => {
    e.preventDefault();
    setErrorLog('');

    const cleanCode = newCouponCode.trim().toUpperCase();
    const cleanDiscount = parseInt(newDiscount);

    if (!cleanCode || !cleanDiscount) {
      setErrorLog('All inputs are required.');
      return;
    }

    const exists = coupons.some(c => c.code === cleanCode && c.serviceId === selectedService.id);
    if (exists) {
      setErrorLog(`Coupon "${cleanCode}" already exists for this architecture.`);
      return;
    }

    try {
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId: selectedService.id, code: cleanCode, discount: cleanDiscount })
      });
      const data = await res.json();
      
      if (data.success) {
        fetchCoupons(); // Refresh list dynamically
        setNewCouponCode('');
        setNewDiscount('');
      } else {
        setErrorLog(data.error);
      }
    } catch (err) {
      setErrorLog("Failed to push token node to database.");
    }
  };

  const handleDeleteCoupon = async (targetId) => {
    try {
      const res = await fetch(`/api/coupons/${targetId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchCoupons();
    } catch (err) {
      console.error("Delete sequence failed:", err);
    }
  };

  return (
    <div className="w-100 p-0 position-relative text-white animate-fade" style={{ minHeight: '80vh', background: 'transparent' }}>
      
      {/* MAIN REGISTRY CARD */}
      <div 
        className="border shadow-lg p-4 rounded-4" 
        style={{ 
          backgroundColor: 'var(--bg-card, rgba(15, 16, 26, 0.85))', 
          borderColor: 'var(--border-subtle, rgba(255, 255, 255, 0.08))', 
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)' 
        }}
      >
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4 pb-3 border-bottom" style={{ borderColor: 'var(--border-subtle, rgba(255, 255, 255, 0.08))' }}>
          <div>
            <h4 className="fw-black text-white m-0 d-flex align-items-center gap-2" style={{ fontWeight: 800 }}>
              <i className="bi bi-tag-fill" style={{ color: '#a855f7' }}></i> Firebase Coupon Registry Terminal
            </h4>
            <p className="text-secondary small m-0 mt-1" style={{ color: '#9ca3af', fontWeight: 500 }}>Real-time database sync dashboard across production modules.</p>
          </div>
          {isLoading ? (
            <span className="spinner-border spinner-border-sm" style={{ color: '#a855f7' }}></span>
          ) : (
            <span className="badge bg-success bg-opacity-20 text-twhite border border-success border-opacity-20 rounded-pill px-3 py-2 small fw-bold">
              ⚡ LIVE WITH FIREBASE
            </span>
          )}
        </div>

        {/* DARK THEME TABLE VIEW */}
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle m-0 border-0" style={{ fontSize: '0.88rem', backgroundColor: 'transparent' }}>
            <thead>
              <tr style={{ fontSize: '0.75rem', borderColor: 'var(--border-subtle, rgba(255, 255, 255, 0.08))', letterSpacing: '0.05em' }}>
                <th className="py-3 px-4 border-0 text-secondary bg-transparent">CORE SERVICE</th>
                <th className="py-3 border-0 text-secondary bg-transparent">VERTICAL</th>
                <th className="py-3 border-0 text-secondary bg-transparent">BASE VALUATION</th>
                <th className="py-3 border-0 text-secondary bg-transparent">FIREBASE ACTIVE COUPONS</th>
                <th className="py-3 text-end px-4 border-0 text-secondary bg-transparent">INTERFACE</th>
              </tr>
            </thead>
            <tbody>
              {websitePackagesData.map((service) => {
                const serviceCouponList = coupons.filter(c => c.serviceId === service.id);

                return (
                  <tr key={service.id} style={{ borderColor: 'var(--border-subtle, rgba(255, 255, 255, 0.08))', backgroundColor: 'transparent' }}>
                    <td className="py-3 px-4 fw-bold text-white bg-transparent">{service.title} Platform</td>
                    <td className="py-3 bg-transparent">
                      <span className="badge border px-2.5 py-1 text-secondary" style={{ backgroundColor: 'var(--bg-pill, rgba(255, 255, 255, 0.03))', borderColor: 'var(--border-subtle, rgba(255, 255, 255, 0.08))', fontSize: '0.75rem' }}>
                        {service.subTitle || service.category || "Website"}
                      </span>
                    </td>
                    <td className="py-3 fw-bold text-white bg-transparent">₹{parseInt(service.startingPrice.replace(/[^0-9]/g, '')).toLocaleString('en-IN')}</td>
                    <td className="py-3 bg-transparent">
                      {serviceCouponList.length > 0 ? (
                        <div className="d-flex flex-wrap gap-1.5">
                          {serviceCouponList.map(c => (
                            <span key={c.id} className="badge bg-success bg-opacity-20 text-success border border-success border-opacity-20 font-monospace" style={{ fontSize: '0.72rem' }}>
                              {c.code} ({c.discount}%)
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-secondary small opacity-75 fst-italic" style={{ fontSize: '0.78rem' }}>No backend configurations</span>
                      )}
                    </td>
                    <td className="py-3 text-end px-4 bg-transparent">
                      <button 
                        onClick={() => handleOpenCouponEngine(service)} 
                        className="btn btn-sm rounded-pill px-3 py-1 fw-bold text-white border"
                        style={{ fontSize: '0.75rem', backgroundColor: 'rgba(168, 85, 247, 0.15)', borderColor: 'rgba(168, 85, 247, 0.3)' }}
                      >
                        Manage Coupons
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL VIEW BLOCK WITH DARK CYBERPUNK THEME */}
      {isModalOpen && selectedService && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(2, 2, 5, 0.85)', backdropFilter: 'blur(8px)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border shadow-lg text-white" style={{ backgroundColor: 'var(--bg-card, rgba(15, 16, 26, 0.95))', borderColor: 'var(--border-subtle, rgba(255, 255, 255, 0.08))', borderRadius: '24px', overflow: 'hidden' }}>
              
              <div className="modal-header text-white p-4 border-bottom" style={{ background: selectedService.gradient, borderColor: 'var(--border-subtle, rgba(255, 255, 255, 0.08))' }}>
                <h5 className="modal-title fw-black m-0" style={{ fontWeight: 800 }}>{selectedService.title} Cloud Node Sheets</h5>
                <button type="button" className="btn-close btn-close-white shadow-none" onClick={handleCloseModal}></button>
              </div>

              <div className="modal-body p-4">
                <div className="row g-4">
                  
                  {/* ADD COUPON FORM */}
                  <div className="col-12 col-md-5">
                    <div className="p-3.5 rounded-4 border h-100 d-flex flex-column justify-content-between" style={{ backgroundColor: 'var(--bg-pill, rgba(255, 255, 255, 0.02))', borderColor: 'var(--border-subtle, rgba(255, 255, 255, 0.08))' }}>
                      <form onSubmit={handleAddNewCoupon}>
                        <div className="mb-3">
                          <label className="form-label text-secondary small fw-bold">COUPON CODE KEY</label>
                          <input 
                            type="text" 
                            required 
                            value={newCouponCode} 
                            onChange={(e) => setNewCouponCode(e.target.value)} 
                            className="form-control text-uppercase font-monospace text-white border" 
                            placeholder="E.G. REAL40" 
                            style={{ backgroundColor: 'var(--bg-card, rgba(15, 16, 26, 0.85))', borderColor: 'var(--border-subtle, rgba(255, 255, 255, 0.08))', color: '#fff' }}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label text-secondary small fw-bold">REDUCTION DISCOUNT (%)</label>
                          <input 
                            type="number" 
                            required 
                            min="1" 
                            max="100" 
                            value={newDiscount} 
                            onChange={(e) => setNewDiscount(e.target.value)} 
                            className="form-control font-monospace text-white border" 
                            placeholder="30" 
                            style={{ backgroundColor: 'var(--bg-card, rgba(15, 16, 26, 0.85))', borderColor: 'var(--border-subtle, rgba(255, 255, 255, 0.08))', color: '#fff' }}
                          />
                        </div>
                        {errorLog && <div className="alert alert-danger py-2 small bg-danger bg-opacity-20 text-white border border-danger border-opacity-20">{errorLog}</div>}
                        <button type="submit" className="btn w-100 py-2.5 fw-bold text-uppercase rounded-pill mt-2 border-0 text-white shadow-sm" style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}>Push to Database</button>
                      </form>
                    </div>
                  </div>

                  {/* CONNECTED COUPONS LIST */}
                  <div className="col-12 col-md-7">
                    <div className="p-3.5 rounded-4 border h-100" style={{ backgroundColor: 'var(--bg-pill, rgba(255, 255, 255, 0.02))', borderColor: 'var(--border-subtle, rgba(255, 255, 255, 0.08))' }}>
                      <h6 className="fw-bold mb-3 text-white"><i className="bi bi-shield-check text-success"></i> Connected Database Matrices</h6>
                      <div className="overflow-auto pe-1" style={{ maxHeight: '240px' }}>
                        {coupons.filter(c => c.serviceId === selectedService.id).map(coupon => (
                          <div key={coupon.id} className="p-2.5 mb-2 rounded-3 border d-flex justify-content-between align-items-center" style={{ backgroundColor: 'var(--bg-card, rgba(15, 16, 26, 0.85))', borderColor: 'var(--border-subtle, rgba(255, 255, 255, 0.08))' }}>
                            <div>
                              <span className="badge font-monospace border me-2" style={{ backgroundColor: 'var(--bg-pill, rgba(255, 255, 255, 0.03))', borderColor: 'var(--border-subtle, rgba(255, 255, 255, 0.08))', color: '#c084fc' }}>{coupon.code}</span>
                              <span className="text-success fw-bold small">{coupon.discount}% Off</span>
                            </div>
                            <button onClick={() => handleDeleteCoupon(coupon.id)} className="btn btn-sm btn-outline-danger border-0 rounded-circle"><i className="bi bi-trash-fill"></i></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}