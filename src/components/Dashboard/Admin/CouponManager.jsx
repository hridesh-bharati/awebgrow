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
    <div className="w-100 p-0 position-relative text-theme-primary animate-fade" style={{ minHeight: '80vh', background: 'transparent' }}>
      
      {/* MAIN REGISTRY CARD */}
      <div 
        className="border-0 shadow-sm p-4 rounded-4" 
        style={{ 
          backgroundColor: 'var(--bg-card)', 
          borderColor: 'var(--border-subtle)', 
          boxShadow: '0 10px 30px var(--shadow-color)' 
        }}
      >
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4 pb-3 border-bottom" style={{ borderColor: 'var(--border-subtle)' }}>
          <div>
            <h4 className="fw-black text-theme-primary m-0 d-flex align-items-center gap-2" style={{ fontWeight: 800 }}>
              <i className="bi bi-tag-fill text-primary"></i> Firebase Coupon Registry Terminal
            </h4>
            <p className="text-theme-secondary small m-0 mt-1" style={{ fontWeight: 500 }}>Real-time database sync dashboard across production modules.</p>
          </div>
          {isLoading ? (
            <span className="spinner-border spinner-border-sm text-primary"></span>
          ) : (
            <span className="badge bg-success bg-opacity-20 text-success border border-success border-opacity-20 rounded-pill px-3 py-2 small fw-bold">
              ⚡ LIVE WITH FIREBASE
            </span>
          )}
        </div>

        {/* THEME-AWARE TABLE VIEW */}
        <div className="table-responsive">
          <table className="table align-middle m-0 text-theme-primary border-0" style={{ fontSize: '0.88rem' }}>
            <thead>
              <tr className="text-theme-secondary fw-bold border-bottom" style={{ fontSize: '0.75rem', borderColor: 'var(--border-subtle)', letterSpacing: '0.05em' }}>
                <th className="py-3 px-4 border-0">CORE SERVICE</th>
                <th className="py-3 border-0">VERTICAL</th>
                <th className="py-3 border-0">BASE VALUATION</th>
                <th className="py-3 border-0">FIREBASE ACTIVE COUPONS</th>
                <th className="py-3 text-end px-4 border-0">INTERFACE</th>
              </tr>
            </thead>
            <tbody>
              {websitePackagesData.map((service) => {
                const serviceCouponList = coupons.filter(c => c.serviceId === service.id);

                return (
                  <tr key={service.id} className="border-bottom" style={{ borderColor: 'var(--border-subtle)' }}>
                    <td className="py-3 px-4 fw-bold text-theme-primary">{service.title} Platform</td>
                    <td className="py-3">
                      <span className="badge border px-2.5 py-1 text-theme-secondary" style={{ backgroundColor: 'var(--bg-pill)', borderColor: 'var(--border-subtle)', fontSize: '0.75rem' }}>
                        {service.subTitle || service.category || "Website"}
                      </span>
                    </td>
                    <td className="py-3 fw-bold text-theme-primary">₹{parseInt(service.startingPrice.replace(/[^0-9]/g, '')).toLocaleString('en-IN')}</td>
                    <td className="py-3">
                      {serviceCouponList.length > 0 ? (
                        <div className="d-flex flex-wrap gap-1.5">
                          {serviceCouponList.map(c => (
                            <span key={c.id} className="badge bg-success bg-opacity-20 text-success border border-success border-opacity-20 font-monospace" style={{ fontSize: '0.72rem' }}>
                              {c.code} ({c.discount}%)
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-theme-secondary small opacity-75 fst-italic" style={{ fontSize: '0.78rem' }}>No backend configurations</span>
                      )}
                    </td>
                    <td className="py-3 text-end px-4">
                      <button 
                        onClick={() => handleOpenCouponEngine(service)} 
                        className="btn btn-sm btn-outline-light rounded-pill px-3 py-1 fw-bold"
                        style={{ fontSize: '0.75rem', backgroundColor: 'var(--bg-pill)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
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

      {/* MODAL VIEW BLOCK WITH CYBERPUNK THEME */}
      {isModalOpen && selectedService && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(2, 2, 5, 0.8)', backdropFilter: 'blur(8px)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border shadow-lg text-theme-primary" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)', borderRadius: '24px', overflow: 'hidden' }}>
              
              <div className="modal-header text-white p-4 border-bottom" style={{ background: selectedService.gradient, borderColor: 'var(--border-subtle)' }}>
                <h5 className="modal-title fw-black m-0" style={{ fontWeight: 800 }}>{selectedService.title} Cloud Node Sheets</h5>
                <button type="button" className="btn-close btn-close-white shadow-none" onClick={handleCloseModal}></button>
              </div>

              <div className="modal-body p-4">
                <div className="row g-4">
                  
                  {/* ADD COUPON FORM */}
                  <div className="col-12 col-md-5">
                    <div className="p-3.5 rounded-4 border h-100 d-flex flex-column justify-content-between" style={{ backgroundColor: 'var(--bg-pill)', borderColor: 'var(--border-subtle)' }}>
                      <form onSubmit={handleAddNewCoupon}>
                        <div className="mb-3">
                          <label className="form-label text-theme-secondary small fw-bold">COUPON CODE KEY</label>
                          <input 
                            type="text" 
                            required 
                            value={newCouponCode} 
                            onChange={(e) => setNewCouponCode(e.target.value)} 
                            className="form-control text-uppercase font-monospace text-theme-primary border" 
                            placeholder="E.G. REAL40" 
                            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label text-theme-secondary small fw-bold">REDUCTION DISCOUNT (%)</label>
                          <input 
                            type="number" 
                            required 
                            min="1" 
                            max="100" 
                            value={newDiscount} 
                            onChange={(e) => setNewDiscount(e.target.value)} 
                            className="form-control font-monospace text-theme-primary border" 
                            placeholder="30" 
                            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                          />
                        </div>
                        {errorLog && <div className="alert alert-danger py-2 small">{errorLog}</div>}
                        <button type="submit" className="btn btn-primary w-100 py-2 fw-bold text-uppercase rounded-3 mt-2" style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', border: 'none' }}>Push to Database</button>
                      </form>
                    </div>
                  </div>

                  {/* CONNECTED COUPONS LIST */}
                  <div className="col-12 col-md-7">
                    <div className="p-3.5 rounded-4 border h-100" style={{ backgroundColor: 'var(--bg-pill)', borderColor: 'var(--border-subtle)' }}>
                      <h6 className="fw-bold mb-3 text-theme-primary"><i className="bi bi-shield-check text-success"></i> Connected Database Matrices</h6>
                      <div className="overflow-auto pe-1" style={{ maxHeight: '240px' }}>
                        {coupons.filter(c => c.serviceId === selectedService.id).map(coupon => (
                          <div key={coupon.id} className="p-2.5 mb-2 rounded-3 border d-flex justify-content-between align-items-center" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
                            <div>
                              <span className="badge font-monospace border me-2" style={{ backgroundColor: 'var(--bg-pill)', borderColor: 'var(--border-subtle)', color: '#c084fc' }}>{coupon.code}</span>
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