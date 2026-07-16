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
    <div className="w-100 p-2 position-relative" style={{ minHeight: '80vh', background: 'transparent' }}>
      <div className="card border-0 shadow-sm p-4 bg-white" style={{ borderRadius: '24px' }}>
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4 pb-2 border-bottom border-light">
          <div>
            <h4 className="fw-bold text-dark m-0 d-flex align-items-center gap-2">
              <i className="bi bi-tag-fill text-primary"></i> Firebase Coupon Registry Terminal
            </h4>
            <p className="text-muted small m-0 mt-1">Real-time database sync dashboard across production modules.</p>
          </div>
          {isLoading ? (
            <span className="spinner-border spinner-border-sm text-primary"></span>
          ) : (
            <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-10 rounded-pill px-3 py-2 small fw-bold">
              ⚡ LIVE WITH FIREBASE
            </span>
          )}
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle custom-dashboard-table mb-0" style={{ fontSize: '0.88rem' }}>
            <thead className="table-light text-secondary uppercase fw-bold" style={{ fontSize: '0.72rem' }}>
              <tr>
                <th className="py-3 px-4" style={{ borderRadius: '12px 0 0 12px' }}>CORE SERVICE</th>
                <th className="py-3">VERTICAL</th>
                <th className="py-3">BASE VALUATION</th>
                <th className="py-3">FIREBASE ACTIVE COUPONS</th>
                <th className="py-3 text-end px-4" style={{ borderRadius: '0 12px 12px 0' }}>INTERFACE</th>
              </tr>
            </thead>
            <tbody>
              {websitePackagesData.map((service) => {
                const serviceCouponList = coupons.filter(c => c.serviceId === service.id);

                return (
                  <tr key={service.id}>
                    <td className="py-3.5 px-4 fw-bold text-dark">{service.title} Platform</td>
                   <td className="py-3.5">
  <span className="badge bg-light text-secondary border px-2.5 py-1.5">
    {service.subTitle || service.category || "Website"}
  </span>
</td>
                    <td className="py-3.5 fw-bold">₹{parseInt(service.startingPrice.replace(/[^0-9]/g, '')).toLocaleString('en-IN')}</td>
                    <td className="py-3.5">
                      {serviceCouponList.length > 0 ? (
                        <div className="d-flex flex-wrap gap-1.5">
                          {serviceCouponList.map(c => (
                            <span key={c.id} className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-10 font-monospace">
                              {c.code} ({c.discount}%)
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted small opacity-60 italic">No backend configurations</span>
                      )}
                    </td>
                    <td className="py-3.5 text-end px-4">
                      <button onClick={() => handleOpenCouponEngine(service)} className="btn btn-sm btn-dark px-3 py-1.5 fw-bold rounded-pill">
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

      {/* Modal View Block */}
      {isModalOpen && selectedService && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <div className="modal-header text-white p-4 border-0" style={{ background: selectedService.gradient }}>
                <h5 className="modal-title fw-bold m-0">{selectedService.title} Cloud Node Sheets</h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body p-4 bg-light bg-opacity-50">
                <div className="row g-4">
                  <div className="col-12 col-md-5">
                    <div className="bg-white p-3.5 rounded-4 border border-light h-100 d-flex flex-column justify-content-between">
                      <form onSubmit={handleAddNewCoupon}>
                        <div className="mb-2.5">
                          <label className="form-label text-secondary small fw-bold">COUPON CODE KEY</label>
                          <input type="text" required value={newCouponCode} onChange={(e) => setNewCouponCode(e.target.value)} className="form-control text-uppercase font-monospace" placeholder="E.G. REAL40" />
                        </div>
                        <div className="mb-3">
                          <label className="form-label text-secondary small fw-bold">REDUCTION DISCOUNT (%)</label>
                        <input type="number" required min="1" max="100" value={newDiscount} onChange={(e) => setNewDiscount(e.target.value)} className="form-control font-monospace" placeholder="30" />
                        </div>
                        {errorLog && <div className="alert alert-danger py-2 small">{errorLog}</div>}
                        <button type="submit" className="btn btn-primary w-100 py-2 fw-bold text-uppercase rounded-3">Push to Database</button>
                      </form>
                    </div>
                  </div>
                  <div className="col-12 col-md-7">
                    <div className="bg-white p-3.5 rounded-4 border border-light h-100">
                      <h6 className="fw-bold mb-3"><i className="bi bi-shield-check text-success"></i> Connected Database Matrices</h6>
                      <div className="overflow-auto" style={{ maxHeight: '240px' }}>
                        {coupons.filter(c => c.serviceId === selectedService.id).map(coupon => (
                          <div key={coupon.id} className="p-2.5 mb-2 rounded-3 border bg-light d-flex justify-content-between align-items-center">
                            <div>
                              <span className="badge bg-white text-dark font-monospace border me-2">{coupon.code}</span>
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