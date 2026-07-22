"use client";

import React, { useEffect, useMemo, useState } from "react";
import { toast, Toaster } from "sonner";

export default function WebsiteOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusLoading, setStatusLoading] = useState("");
  const [deleteLoading, setDeleteLoading] = useState("");
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const lastIndex = currentPage * ordersPerPage;
  const firstIndex = lastIndex - ordersPerPage;
  const currentOrders = filteredOrders.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [showModal]);

  // ==========================
  // FETCH ORDERS
  // ==========================
  const fetchOrders = async () => {
    try {
      if (orders.length === 0) setLoading(true);
      setRefreshing(true);

      const response = await fetch("/api/orders");
      const data = await response.json();

      if (data.success) {
        setOrders(data.orders || []);
        setFilteredOrders(data.orders || []);
        setCurrentPage(1);
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to fetch orders.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ==========================
  // SEARCH & FILTER
  // ==========================
  useEffect(() => {
    setCurrentPage(1);
    if (!search.trim()) {
      setFilteredOrders(orders);
      return;
    }

    const keyword = search.toLowerCase();
    const result = orders.filter((order) =>
      order.clientName?.toLowerCase().includes(keyword) ||
      order.clientPhone?.toLowerCase().includes(keyword) ||
      order.selectedService?.toLowerCase().includes(keyword) ||
      order.packagePlan?.toLowerCase().includes(keyword) ||
      order.orderId?.toLowerCase().includes(keyword) ||
      order.id?.toLowerCase().includes(keyword)
    );

    setFilteredOrders(result);
  }, [search, orders]);

  // ===============================================
  // METRICS CONFIG
  // ===============================================
  const stats = useMemo(() => {
    let revenue = 0, pending = 0, processing = 0, completed = 0, cancelled = 0;

    filteredOrders.forEach((order) => {
      revenue += Number(order.finalPayableAmount || 0);
      if (["Pending", "New"].includes(order.orderStatus)) pending++;
      else if (order.orderStatus === "Processing") processing++;
      else if (order.orderStatus === "Completed") completed++;
      else if (order.orderStatus === "Cancelled") cancelled++;
    });

    return [
      { label: "Total Orders", value: filteredOrders.length, gradient: "linear-gradient(135deg, #a855f7, #6366f1)", icon: "bi-people-fill" },
      { label: "Pending Workflow", value: pending, gradient: "linear-gradient(135deg, #f97316, #fb923c)", icon: "bi-chat-left-dots-fill" },
      { label: "Processing Orders", value: processing, gradient: "linear-gradient(135deg, #00f2fe, #3b82f6)", icon: "bi-lightning-charge-fill" },
      { label: "Completed Hub", value: completed, gradient: "linear-gradient(135deg, #10b981, #059669)", icon: "bi-check-circle-fill" },
      { label: "Cancelled Base", value: cancelled, gradient: "linear-gradient(135deg, #ff0080, #f43f5e)", icon: "bi-x-circle-fill" },
      {
        label: "Revenue Stream",
        value: `₹${revenue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
        gradient: "linear-gradient(135deg, #22c55e, #10b981)",
        icon: "bi-currency-rupee",
        isRevenue: true
      },
    ];
  }, [filteredOrders]);

  const getStatusStyle = (status) => {
    const pairs = {
      New: { color: "#c084fc", bg: "rgba(192, 132, 252, 0.1)" },
      Pending: { color: "#fb923c", bg: "rgba(251, 146, 60, 0.1)" },
      Processing: { color: "#38bdf8", bg: "rgba(56, 189, 248, 0.1)" },
      Completed: { color: "#34d399", bg: "rgba(52, 211, 153, 0.1)" },
      Cancelled: { color: "#f43f5e", bg: "rgba(244, 63, 94, 0.1)" }
    };
    return pairs[status] || { color: "#9ca3af", bg: "rgba(156, 163, 175, 0.1)" };
  };

  // ===============================================
  // ACTIONS (Fixed duplicate toast triggers)
  // ===============================================
  const updateOrderStatus = async (id, status) => {
    // Prevent duplicate triggers if already loading this order
    if (statusLoading === id) return;

    try {
      setStatusLoading(id);
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, orderStatus: status }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, orderStatus: status } : o));
        toast.success(`Status updated to ${status}`, { id: `status-${id}` });
      } else {
        toast.error(data.error || "Failed to update status", { id: `status-err-${id}` });
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error updating status");
    } finally {
      setStatusLoading("");
    }
  };

  const deleteOrder = async (id) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      setDeleteLoading(id);
      const res = await fetch(`/api/orders?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setOrders(prev => prev.filter(o => o.id !== id));
        toast.success("Order record completely removed");
      } else {
        toast.error(data.error || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Internal configuration deletion error");
    } finally {
      setDeleteLoading("");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-theme-primary">
        <div className="spinner-border text-primary border-3" role="status" style={{ width: "1.8rem", height: "1.8rem" }} />
      </div>
    );
  }

  return (
    <div className="container-fluid px-0 text-theme-primary" style={{ fontSize: "0.82rem" }}>
      {/* Ensure single toaster instance with explicit stacking rules */}
      <Toaster position="top-right" richColors expand={false} duration={3000} />

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3 px-1">
        <div>
          <h4 className="fw-black mb-0 text-theme-primary" style={{ fontWeight: 800, letterSpacing: "-0.5px" }}>Website Orders</h4>
          <span className="text-theme-secondary d-block" style={{ fontSize: "0.72rem", fontWeight: 500 }}>Manage dynamic customer pipeline metrics</span>
        </div>
        <button 
          className="btn btn-sm btn-secondary-glow border d-flex align-items-center gap-1.5 fw-bold" 
          onClick={fetchOrders} 
          disabled={refreshing}
        >
          <i className={`bi bi-arrow-clockwise ${refreshing ? "spin" : ""}`}></i>
          <span>Refresh</span>
        </button>
      </div>

      {/* METRICS INLINE GRID */}
      <div className="row row-cols-2 row-cols-md-3 row-cols-xl-6 g-2 mb-3">
        {stats.map((stat, idx) => (
          <div key={idx} className="col">
            <div 
              className="card border-0 shadow-sm rounded-3 position-relative overflow-hidden" 
              style={{ minHeight: "80px", background: stat.gradient }}
            >
              <div className="card-body p-2.5 d-flex flex-column justify-content-between h-100 z-1 text-white">
                <h3 className="fw-black mb-0" style={{ fontSize: stat.isRevenue ? "1.15rem" : "1.45rem", fontWeight: 900 }}>{stat.value}</h3>
                <span className="fw-bold opacity-80" style={{ fontSize: "0.65rem", textTransform: "capitalize" }}>{stat.label}</span>
              </div>
              <i className={`bi ${stat.icon} position-absolute end-0 bottom-0 mb-n1 me-n1 text-white`} style={{ fontSize: "2.4rem", opacity: 0.15 }}></i>
            </div>
          </div>
        ))}
      </div>

      {/* SEARCH CARD */}
      <div 
        className="rounded-3 border mb-3 p-2" 
        style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-subtle)" }}
      >
        <div 
          className="input-group input-group-sm rounded-2 align-items-center px-2 py-0.5 border"
          style={{ backgroundColor: "var(--bg-pill)", borderColor: "var(--border-subtle)" }}
        >
          <i className="bi bi-search text-theme-secondary small"></i>
          <input
            className="form-control border-0 bg-transparent shadow-none ps-2 text-theme-primary"
            placeholder="Search by Customer, Phone, Service parameters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ fontSize: "0.78rem" }}
          />
          {search && (
            <button className="btn btn-sm p-0 text-theme-secondary border-0" onClick={() => setSearch("")}>
              <i className="bi bi-x-circle-fill"></i>
            </button>
          )}
        </div>
      </div>

      {/* STREAM LABELS FOR DESKTOP ALIGNMENT */}
      <div 
        className="px-3 py-2 mb-2 d-none d-md-block text-theme-secondary fw-bold font-monospace border-bottom" 
        style={{ fontSize: "0.68rem", borderColor: "var(--border-subtle)", letterSpacing: "0.05em" }}
      >
        <div className="row align-items-center">
          <div className="col-md-2">TRACKING ID</div>
          <div className="col-md-3">CUSTOMER</div>
          <div className="col-md-2">SERVICE MATRIX</div>
          <div className="col-md-1">AMOUNT</div>
          <div className="col-md-1">PAYMENT</div>
          <div className="col-md-2">STATUS CONFIG</div>
          <div className="col-md-1 text-end">ACTIONS</div>
        </div>
      </div>

      {/* ORDERS MAP AREA */}
      <div className="row g-2">
        {filteredOrders.length === 0 ? (
          <div className="col-12">
            <div 
              className="text-center p-5 rounded-3 border"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-subtle)" }}
            >
              <p className="fw-medium text-theme-secondary small mb-0">No active operational logs found</p>
            </div>
          </div>
        ) : (
          currentOrders.map((order) => {
            const statusConfig = getStatusStyle(order.orderStatus);
            return (
              <div key={order.id} className="col-12">
                <div
                  className="rounded-3 border p-3 p-md-2 position-relative text-theme-primary"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border-subtle)",
                    borderLeft: `4px solid ${statusConfig.color}`,
                    boxShadow: "0 4px 15px var(--shadow-color)"
                  }}
                >
                  <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center justify-content-between gap-2.5 gap-md-0">

                    {/* TRACKING ID */}
                    <div className="col-12 col-md-2 font-monospace fw-bold text-theme-secondary d-flex align-items-center" style={{ fontSize: "0.75rem" }}>
                      <i className="bi bi-hash text-theme-secondary me-1"></i>
                      <span className="d-md-none text-theme-secondary fw-normal me-1">ID:</span>
                      <span style={{ color: "#c084fc" }}>{order.orderId || order.id?.substring(0, 8)}</span>
                    </div>

                    {/* CUSTOMER DETAILS */}
                    <div className="col-12 col-md-3">
                      <div className="fw-black text-theme-primary d-flex align-items-center" style={{ fontWeight: 800 }}>
                        <i className="bi bi-person-fill text-primary me-2 fs-6"></i>
                        {order.clientName}
                      </div>
                      <div className="text-theme-secondary d-flex align-items-center mt-0.5" style={{ fontSize: "0.72rem", fontWeight: 500 }}>
                        <i className="bi bi-telephone-fill text-success me-2"></i>
                        {order.clientPhone}
                      </div>
                    </div>

                    {/* SERVICE MATRIX */}
                    <div className="col-12 col-md-2">
                      <div className="fw-semibold text-theme-primary d-flex align-items-center">
                        <i className="bi bi-layers-half me-2" style={{ color: "#00f2fe" }}></i>
                        {order.selectedService}
                      </div>
                      <span 
                        className="badge border rounded-1 px-2 py-0.5 mt-1 d-inline-block text-theme-secondary" 
                        style={{ fontSize: "0.58rem", backgroundColor: "var(--bg-pill)", borderColor: "var(--border-subtle)" }}
                      >
                        {order.packagePlan}
                      </span>
                    </div>

                    {/* AMOUNT */}
                    <div className="col-12 col-md-1 fw-black text-theme-primary d-flex align-items-center" style={{ fontWeight: 800 }}>
                      <span className="d-md-none text-theme-secondary fw-normal small me-2">Amount:</span>
                      ₹{Number(order.finalPayableAmount || 0).toLocaleString("en-IN")}
                    </div>

                    {/* PAYMENT STATUS */}
                    <div className="col-12 col-md-1 d-flex align-items-center">
                      <span className={`badge rounded-pill px-2.5 py-1 border ${
                        order.paymentStatus === "Paid" 
                          ? "bg-success bg-opacity-20 text-white border-success border-opacity-20" 
                          : "bg-warning bg-opacity-20 text-white border-warning border-opacity-20"
                      }`} style={{ fontSize: "0.65rem" }}>
                        {order.paymentStatus || "Unpaid"}
                      </span>
                    </div>

                    {/* STATUS CONFIG DROP */}
                    <div className="col-12 col-md-2">
                      <select
                        className="form-select form-select-sm border py-1 rounded-2 text-theme-primary fw-semibold shadow-none"
                        value={order.orderStatus}
                        disabled={statusLoading === order.id}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        style={{ 
                          fontSize: "0.72rem", 
                          maxWidth: "130px", 
                          cursor: "pointer",
                          backgroundColor: "var(--bg-pill)",
                          borderColor: "var(--border-subtle)",
                          color: "var(--text-primary)"
                        }}
                      >
                        {["New", "Pending", "Processing", "Completed", "Cancelled"].map(st => (
                          <option key={st} value={st} style={{ backgroundColor: "var(--bg-card)", color: "var(--text-primary)" }}>{st}</option>
                        ))}
                      </select>
                    </div>

                    {/* ACTIONS PANEL */}
                    <div className="col-12 col-md-1 text-md-end d-flex justify-content-start justify-content-md-end align-items-center gap-3 mt-2 mt-md-0 pt-2 pt-md-0 border-top border-md-top-0" style={{ borderColor: "var(--border-subtle)" }}>
                      <span
                        role="button"
                        className="text-primary cursor-pointer d-inline-flex align-items-center"
                        title="View Details"
                        onClick={() => { setSelectedOrder(order); setShowModal(true); }}
                      >
                        <i className="bi bi-eye-fill fs-5"></i>
                      </span>

                      <span
                        role="button"
                        className="text-success cursor-pointer d-inline-flex align-items-center"
                        title="WhatsApp Connect"
                        onClick={() => window.open(`https://wa.me/${order.clientPhone}?text=Hello ${order.clientName}`, "_blank")}
                      >
                        <i className="bi bi-whatsapp fs-5"></i>
                      </span>

                      <span
                        role="button"
                        className="text-danger cursor-pointer d-inline-flex align-items-center"
                        title="Delete Order"
                        onClick={() => deleteOrder(order.id)}
                      >
                        {deleteLoading === order.id ? (
                          <span className="spinner-border spinner-border-sm text-danger" role="status"></span>
                        ) : (
                          <i className="bi bi-trash-fill fs-5"></i>
                        )}
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <nav className="my-3">
          <ul className="pagination pagination-sm justify-content-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                <button 
                  className="page-link rounded-2 border-0 px-2.5 py-1 fw-bold text-theme-primary" 
                  style={{ 
                    fontSize: "0.72rem",
                    backgroundColor: currentPage === page ? "#a855f7" : "var(--bg-pill)",
                    color: currentPage === page ? "#ffffff" : "var(--text-primary)"
                  }} 
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* DETAILS MODAL */}
      {showModal && selectedOrder && (
        <div 
          className="modal fade show d-block px-2" 
          style={{ background: "rgba(0, 0, 0, 0.75)", backdropFilter: "blur(8px)" }} 
          onClick={() => { setShowModal(false); setSelectedOrder(null); }}
        >
          <div className="modal-dialog modal-dialog-centered modal-md" onClick={(e) => e.stopPropagation()}>
            <div 
              className="modal-content border text-theme-primary rounded-4"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-subtle)", boxShadow: "0 20px 60px var(--shadow-color)" }}
            >
              <div className="modal-header border-bottom px-4 pt-3 pb-3" style={{ borderColor: "var(--border-subtle)" }}>
                <h6 className="modal-title fw-black text-theme-primary d-flex align-items-center gap-2" style={{ fontWeight: 800 }}>
                  <i className="bi bi-receipt text-primary"></i> Pipeline Metrics
                </h6>
                <button className="btn-close btn-close-white shadow-none" onClick={() => { setShowModal(false); setSelectedOrder(null); }}></button>
              </div>
              <div className="modal-body p-4" style={{ fontSize: "0.82rem" }}>
                <div className="row g-3">
                  {[
                    { label: "Client Name", val: selectedOrder.clientName, icon: "bi-person" },
                    { label: "Phone Reference", val: selectedOrder.clientPhone, icon: "bi-telephone" },
                    { label: "Tracking ID", val: selectedOrder.orderId || selectedOrder.id, icon: "bi-hash", mono: true },
                    { label: "Service Structure", val: selectedOrder.selectedService, icon: "bi-layers" },
                    { label: "Plan Tier", val: selectedOrder.packagePlan, badge: true },
                    { label: "Coupon Status", val: selectedOrder.couponApplied || "NONE", mono: true },
                  ].map((field, idx) => (
                    <div key={idx} className="col-6">
                      <span className="text-theme-secondary d-block mb-0.5" style={{ fontSize: "0.72rem", fontWeight: 500 }}>{field.label}</span>
                      {field.badge ? (
                        <span className="badge text-white fw-bold rounded-pill px-2.5 py-1 d-inline-block" style={{ background: "linear-gradient(135deg, #a855f7, #3b82f6)", fontSize: "0.68rem" }}>{field.val}</span>
                      ) : (
                        <p className={`text-theme-primary mb-0 ${field.mono ? "font-monospace text-theme-secondary" : "fw-bold"}`} style={{ fontSize: field.mono ? "0.75rem" : "0.82rem" }}>
                          {field.icon && <i className={`bi ${field.icon} me-1.5 text-theme-secondary`}></i>}{field.val}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DYNAMIC SPIN ANIMATION */}
      <style jsx>{`
        .spin { display: inline-block; animation: spinAnimation 1s linear infinite; }
        @keyframes spinAnimation { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}