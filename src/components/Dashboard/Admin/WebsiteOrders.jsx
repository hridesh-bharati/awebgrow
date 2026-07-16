// src/components/Dashboard/Admin/Orders/WebsiteOrders.jsx
import React, { useEffect, useMemo, useState } from "react";
import { toast, Toaster } from "sonner";

export default function WebsiteOrders() {
  // ==========================
  // STATES & PAGINATION
  // ==========================
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
      { label: "Total Orders", value: filteredOrders.length, themeClass: "theme-purple", icon: "bi-people-fill" },
      { label: "Pending Workflow", value: pending, themeClass: "theme-orange", icon: "bi-chat-left-dots-fill" },
      { label: "Processing Orders", value: processing, themeClass: "theme-blue", icon: "bi-lightning-charge-fill" },
      { label: "Completed Hub", value: completed, themeClass: "theme-teal", icon: "bi-check-circle-fill" },
      { label: "Cancelled Base", value: cancelled, themeClass: "theme-pink", icon: "bi-x-circle-fill" },
      {
        label: "Revenue Stream",
        value: `₹${revenue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
        themeClass: "theme-green",
        icon: "bi-currency-rupee",
        isRevenue: true
      },
    ];
  }, [filteredOrders]);

  const getStatusStyle = (status) => {
    const pairs = {
      New: { color: "#7c4dff", bg: "rgba(124, 77, 255, 0.05)" },
      Pending: { color: "#ff9100", bg: "rgba(255, 145, 0, 0.05)" },
      Processing: { color: "#00b0ff", bg: "rgba(0, 176, 255, 0.05)" },
      Completed: { color: "#00bfa5", bg: "rgba(0, 191, 165, 0.05)" },
      Cancelled: { color: "#ff4081", bg: "rgba(255, 64, 129, 0.05)" }
    };
    return pairs[status] || { color: "#6c757d", bg: "rgba(108, 117, 125, 0.05)" };
  };

  // ===============================================
  // ACTIONS (With Sonner Integration)
  // ===============================================
  const updateOrderStatus = async (id, status) => {
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
        toast.success(`Status updated to ${status}`);
      } else {
        toast.error(data.error || "Failed to update status");
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
      <div className="d-flex justify-content-center align-items-center vh-100 bg-canvas">
        <div className="spinner-border text-primary border-3" role="status" style={{ width: "1.8rem", height: "1.8rem" }} />
      </div>
    );
  }

  return (
    <div className="container-fluid bg-canvas min-vh-100" style={{ fontSize: "0.82rem" }}>
      <Toaster position="top-right" richColors />

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3 px-1">
        <div>
          <h4 className="fw-bold mb-0 text-dark" style={{ letterSpacing: "-0.6px" }}>Website Orders</h4>
          <span className="text-muted d-block" style={{ fontSize: "0.72rem" }}>Manage dynamic customer pipeline metrics</span>
        </div>
        <button className="btn btn-sm btn-white border shadow-sm d-flex align-items-center gap-1 bg-white fw-bold text-secondary" onClick={fetchOrders} disabled={refreshing}>
          <i className={`bi bi-arrow-clockwise ${refreshing ? "spin" : ""}`}></i>
          <span>Refresh</span>
        </button>
      </div>

      {/* METRICS INLINE GRID */}
      <div className="row row-cols-2 row-cols-md-3 row-cols-xl-6 g-2 mb-3">
        {stats.map((stat, idx) => (
          <div key={idx} className="col">
            <div className={`card border-0 shadow-sm rounded-3 position-relative overflow-hidden ${stat.themeClass}`} style={{ minHeight: "80px" }}>
              <div className="card-body p-2.5 d-flex flex-column justify-content-between h-100 z-1 text-white">
                <h3 className="fw-bold mb-0 tracking-tight" style={{ fontSize: stat.isRevenue ? "1.15rem" : "1.45rem" }}>{stat.value}</h3>
                <span className="fw-medium opacity-75" style={{ fontSize: "0.65rem", textTransform: "capitalize" }}>{stat.label}</span>
              </div>
              <i className={`bi ${stat.icon} position-absolute end-0 bottom-0 mb-n1 me-n1 text-white`} style={{ fontSize: "2.4rem", opacity: 0.05 }}></i>
            </div>
          </div>
        ))}
      </div>

      {/* SEARCH CARD */}
      <div className="card border-0 shadow-sm rounded-3 mb-3 bg-white">
        <div className="card-body p-2">
          <div className="input-group input-group-sm bg-light border-0 rounded-2 align-items-center px-2 py-0.5">
            <i className="bi bi-search text-muted small"></i>
            <input
              className="form-control border-0 bg-transparent shadow-none ps-2"
              placeholder="Search by Customer, Phone, Service parameters..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ fontSize: "0.78rem" }}
            />
            {search && (
              <button className="btn btn-sm p-0 text-secondary border-0" onClick={() => setSearch("")}>
                <i className="bi bi-x-circle-fill"></i>
              </button>
            )}
          </div>
        </div>
      </div>

    {/* STREAM LABELS FOR DESKTOP ALIGNMENT */}
<div className="card border-0 bg-transparent px-3 py-1 mb-1 d-none d-md-block text-secondary fw-semibold font-monospace" style={{ fontSize: "0.65rem" }}>
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
      <div className="card text-center p-5 border-0 shadow-sm bg-white rounded-3">
        <p className="fw-medium text-muted small mb-0">No active operational logs</p>
      </div>
    </div>
  ) : (
    currentOrders.map((order) => {
      const statusConfig = getStatusStyle(order.orderStatus);
      return (
        <div key={order.id} className="col-12">
          <div
            className="card border-0 shadow-sm rounded-3 position-relative order-stream-card bg-white"
            style={{
              borderLeft: `4px solid ${statusConfig.color}`,
              background: `linear-gradient(to right, ${statusConfig.bg}, #ffffff)`
            }}
          >
            {/* Mobile pe padding p-3 aur desktop pe p-2 taaki clean dikhe */}
            <div className="card-body p-3 p-md-2 d-flex flex-column flex-md-row align-items-stretch align-items-md-center justify-content-between gap-3 gap-md-0 text-dark">

              {/* TRACKING ID */}
              <div className="col-12 col-md-2 font-monospace fw-bold text-secondary d-flex align-items-center" style={{ fontSize: "0.72rem" }}>
                <i className="bi bi-hash text-muted me-1"></i>
                <span className="d-md-none text-muted fw-normal me-1">ID:</span> {/* Mobile Only Label */}
                {order.orderId || order.id?.substring(0, 8)}
              </div>

              {/* CUSTOMER DETAILS */}
              <div className="col-12 col-md-3">
                <div className="fw-bold text-dark d-flex align-items-center">
                  <i className="bi bi-person-fill text-primary me-2 fs-6"></i>
                  {order.clientName}
                </div>
                <div className="text-muted d-flex align-items-center mt-1" style={{ fontSize: "0.72rem" }}>
                  <i className="bi bi-telephone-fill text-success me-2"></i>
                  {order.clientPhone}
                </div>
              </div>

              {/* SERVICE MATRIX */}
              <div className="col-12 col-md-2">
                <div className="fw-semibold text-secondary-emphasis d-flex align-items-center">
                  <i className="bi bi-layers-half text-info me-2"></i>
                  {order.selectedService}
                </div>
                <span className="badge bg-light text-secondary border rounded-1 px-2 py-1 mt-1 d-inline-block" style={{ fontSize: "0.58rem" }}>
                  {order.packagePlan}
                </span>
              </div>

              {/* AMOUNT */}
              <div className="col-12 col-md-1 fw-bold text-dark d-flex align-items-center">
                <span className="d-md-none text-muted fw-normal small me-2">Amount:</span> {/* Mobile Only Label */}
                ₹{Number(order.finalPayableAmount).toLocaleString("en-IN")}
              </div>

              {/* PAYMENT STATUS */}
              <div className="col-12 col-md-1 d-flex align-items-center">
                <span className={`badge rounded-pill px-2 py-1 border ${
                  order.paymentStatus === "Paid" ? "bg-success-subtle text-success border-success" : "bg-warning-subtle text-dark border-warning"
                }`} style={{ fontSize: "0.65rem" }}>
                  {order.paymentStatus}
                </span>
              </div>

              {/* STATUS CONFIG DROP */}
              <div className="col-12 col-md-2">
                <select
                  className="form-select form-select-sm border-light-subtle bg-light py-1 rounded-2 text-dark fw-medium shadow-none"
                  value={order.orderStatus}
                  disabled={statusLoading === order.id}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  style={{ fontSize: "0.72rem", maxWidth: "130px", cursor: "pointer" }}
                >
                  {["New", "Pending", "Processing", "Completed", "Cancelled"].map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {/* ACTIONS PANEL (Perfectly Aligned Now) */}
              <div className="col-12 col-md-1 text-md-end d-flex justify-content-start justify-content-md-end align-items-center gap-3 mt-2 mt-md-0 border-top pt-2 pt-md-0 border-md-top-0">
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
                <button className="page-link rounded-2 border-0 px-2.5 py-1 fw-bold" style={{ fontSize: "0.72rem" }} onClick={() => setCurrentPage(page)}>{page}</button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* DETAILS MODAL */}
      {showModal && selectedOrder && (
        <div className="modal fade show d-block px-2" style={{ background: "rgba(24, 16, 60, 0.2)", backdropFilter: "blur(4px)" }} onClick={() => { setShowModal(false); setSelectedOrder(null); }}>
          <div className="modal-dialog modal-dialog-centered modal-md" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content border-0 shadow rounded-3 bg-white">
              <div className="modal-header border-0 px-3 pt-3 pb-1">
                <h6 className="modal-title fw-bold text-dark d-flex align-items-center gap-1">
                  <i className="bi bi-receipt text-primary"></i> Pipeline Metrics
                </h6>
                <button className="btn-close small shadow-none" style={{ fontSize: "0.65rem" }} onClick={() => { setShowModal(false); setSelectedOrder(null); }}></button>
              </div>
              <div className="modal-body p-3" style={{ fontSize: "0.78rem" }}>
                <div className="row g-2.5">
                  {[
                    { label: "Client Name", val: selectedOrder.clientName, icon: "bi-person" },
                    { label: "Phone Reference", val: selectedOrder.clientPhone, icon: "bi-telephone" },
                    { label: "Tracking ID", val: selectedOrder.orderId || selectedOrder.id, icon: "bi-hash", mono: true },
                    { label: "Service Structure", val: selectedOrder.selectedService, icon: "bi-layers" },
                    { label: "Plan Tier", val: selectedOrder.packagePlan, badge: true },
                    { label: "Coupon Status", val: selectedOrder.couponApplied || "NONE", mono: true },
                  ].map((field, idx) => (
                    <div key={idx} className="col-6">
                      <span className="text-muted d-block" style={{ fontSize: "0.68rem" }}>{field.label}</span>
                      {field.badge ? (
                        <span className="badge bg-primary-subtle text-primary fw-semibold rounded-1 px-1.5 py-0.5 mt-0.5 d-inline-block">{field.val}</span>
                      ) : (
                        <p className={`text-dark mb-0 ${field.mono ? "font-monospace text-muted" : "fw-semibold"}`} style={{ fontSize: field.mono ? "0.72rem" : "0.78rem" }}>
                          {field.icon && <i className={`bi ${field.icon} me-1 text-muted`}></i>}{field.val}
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

      {/* CORE INTERFACE STYLE SHEET */}
      <style jsx global>{`
        .bg-canvas { background-color: #f8f9fa !important; }
        .theme-purple  { background: linear-gradient(135deg, #7c4dff, #651fff); }
        .theme-blue    { background: linear-gradient(135deg, #00b0ff, #0091ea); }
        .theme-orange  { background: linear-gradient(135deg, #ff9100, #ff6d00); }
        .theme-pink    { background: linear-gradient(135deg, #ff4081, #f50057); }
        .theme-teal    { background: linear-gradient(135deg, #00bfa5, #00aa8d); }
        .theme-green   { background: linear-gradient(135deg, #00e676, #00c853); }

        .order-stream-card { transition: transform 0.2s ease; border: 1px solid rgba(0,0,0,0.03) !important; }
        .order-stream-card:hover { transform: translateX(3px); }
        .spin { display: inline-block; animation: spinAnimation 1s linear infinite; }
        @keyframes spinAnimation { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}