"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { rtdb as db } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';
import Link from 'next/link'; // होम बटन के लिए Link इम्पोर्ट किया
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Bar
} from 'recharts';
import {
  Users, FolderCheck, Box, ArrowUpRight, Home
} from 'lucide-react';

const CHART_COLORS = ['#3b00a8', '#2563EB', '#F59E0B', '#EF4444'];

export default function DashboardHome() {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    activeProjects: 0,
    packagesCount: 8
  });
  const [orders, setOrders] = useState([]);

  const [loadingStates, setLoadingStates] = useState({
    users: true,
    orders: true,
    projects: true
  });

  useEffect(() => {
    const usersRef = ref(db, 'users');
    const ordersRef = ref(db, 'orders');
    const projectsRef = ref(db, 'projects');

    const unsubscribeUsers = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const count = Object.keys(snapshot.val()).length;
        setMetrics(prev => ({ ...prev, totalUsers: count }));
      }
      setLoadingStates(prev => ({ ...prev, users: false }));
    });

    const unsubscribeOrders = onValue(ordersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const ordersList = [];
        Object.keys(data).forEach((key) => {
          ordersList.push({ id: key, ...data[key] });
        });
        ordersList.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setOrders(ordersList);
      } else {
        setOrders([]);
      }
      setLoadingStates(prev => ({ ...prev, orders: false }));
    });

    const unsubscribeProjects = onValue(projectsRef, (snapshot) => {
      if (snapshot.exists()) {
        const count = Object.keys(snapshot.val()).length;
        setMetrics(prev => ({ ...prev, activeProjects: count }));
      }
      setLoadingStates(prev => ({ ...prev, projects: false }));
    });

    return () => {
      unsubscribeUsers();
      unsubscribeOrders();
      unsubscribeProjects();
    };
  }, []);

  const isAppLoading = loadingStates.users || loadingStates.orders || loadingStates.projects;

  const orderStatusData = useMemo(() => {
    let newOrCompleted = 0, pending = 0, processing = 0, cancelled = 0;

    orders.forEach((order) => {
      const status = order.orderStatus;
      if (["Completed", "New"].includes(status)) newOrCompleted++;
      else if (status === "Pending") pending++;
      else if (status === "Processing") processing++;
      else if (status === "Cancelled") cancelled++;
    });

    if (orders.length === 0) {
      return [{ name: 'No Orders', value: 1 }];
    }

    return [
      { name: 'Completed / New', value: newOrCompleted },
      { name: 'Pending Workflow', value: pending },
      { name: 'Processing Orders', value: processing },
      { name: 'Cancelled Base', value: cancelled },
    ].filter(item => item.value > 0);
  }, [orders]);

  const chartData = [
    { name: 'Jan', ActiveClusters: 4, TargetLayers: 3 },
    { name: 'Feb', ActiveClusters: 6, TargetLayers: 5 },
    { name: 'Mar', ActiveClusters: 7, TargetLayers: 6 },
    { name: 'Apr', ActiveClusters: 9, TargetLayers: 7 },
    { name: 'May', ActiveClusters: 10, TargetLayers: 8 },
    { name: 'Jun', ActiveClusters: metrics.activeProjects, TargetLayers: metrics.packagesCount },
  ];

  if (isAppLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'transparent' }}>
        <div className="spinner-border text-primary" role="status"></div>
        <span className="ms-3 text-dark fw-semibold">Syncing Dynamic Workspace...</span>
      </div>
    );
  }

  return (
    <div className="container-fluid px-0 animate-fade">

      {/* टॉप हेडर */}
      <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div className="d-flex align-items-center gap-3">
          <div>
            <h2 className="fw-bold text-primary m-0 tracking-tight" style={{ letterSpacing: '-0.5px' }}>
              System Metrics
            </h2>
            <p className="text-dark small m-0 mt-1" style={{ opacity: 0.85 }}>Platform overview indicators. <span className="fw-bold text-success">● Live Sync</span></p>
          </div>
        </div>
      </div>

      {/* प्रीमियम कलरफुल कार्ड्स (मोबाइल रिस्पॉन्सिव ग्रिड) */}
      <div className="row g-3 mb-4">
        {/* 1st Card: Mobile full, Desktop col-4 */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 p-sm-4 text-white h-100"
            style={{ background: 'linear-gradient(135deg, #6366f1 0%, #3b00a8 100%)' }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-white-50 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>Total Users</span>
                <h2 className="fw-extrabold mt-2 mb-1 text-white" style={{ fontSize: '2rem' }}>{metrics.totalUsers}</h2>
                <span className="text-white small fw-bold d-flex align-items-center gap-1 opacity-90" style={{ fontSize: '12px' }}>
                  <ArrowUpRight size={14} /> Live DB
                </span>
              </div>
              <div className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: '46px', height: '46px', minWidth: '46px' }}>
                <Users size={20} style={{ color: '#3b00a8' }} />
              </div>
            </div>
          </div>
        </div>

        {/* 2nd Card: Mobile half, Desktop col-4 */}
        <div className="col-6 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 p-sm-4 text-white h-100"
            style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-white-50 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>Active Projects</span>
                <h2 className="fw-extrabold mt-2 mb-1 text-white" style={{ fontSize: '2rem' }}>{metrics.activeProjects}</h2>
                <span className="text-white small fw-bold d-flex align-items-center gap-1 opacity-90" style={{ fontSize: '12px' }}>
                  <ArrowUpRight size={14} /> Live
                </span>
              </div>
              <div className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm d-none d-sm-flex"
                style={{ width: '46px', height: '46px', minWidth: '46px' }}>
                <FolderCheck size={20} style={{ color: '#1d4ed8' }} />
              </div>
            </div>
          </div>
        </div>

        {/* 3rd Card: Mobile half, Desktop col-4 */}
        <div className="col-6 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 p-sm-4 text-white h-100"
            style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)' }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-white-50 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>Packages</span>
                <h2 className="fw-extrabold mt-2 mb-1 text-white" style={{ fontSize: '1.8rem' }}>{metrics.packagesCount} L</h2>
                <span className="text-white small fw-bold opacity-90" style={{ fontSize: '12px' }}>v2.0 Core</span>
              </div>
              <div className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm d-none d-sm-flex"
                style={{ width: '46px', height: '46px', minWidth: '46px' }}>
                <Box size={20} style={{ color: '#d97706' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* चार्ट्स सेक्शन */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-8">
          <div className="card border-0 rounded-4 p-4 h-100 bg-white shadow-sm">
            <div className="mb-3">
              <h5 className="fw-bold text-dark m-0">Infrastructure & Deployment Scales</h5>
              <p className="text-muted small m-0">Monthly analysis of active core clusters and workspace setups.</p>
            </div>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCluster" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b00a8" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#3b00a8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" />
                  <XAxis dataKey="name" stroke="#475569" style={{ fontSize: '12px', fontWeight: '500' }} tickLine={false} />
                  <YAxis stroke="#475569" style={{ fontSize: '12px', fontWeight: '500' }} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="ActiveClusters" stroke="#3b00a8" strokeWidth={3} fillOpacity={1} fill="url(#colorCluster)" name="Active Clusters" />
                  <Bar dataKey="TargetLayers" barSize={14} fill="#2563EB" radius={[4, 4, 0, 0]} name="Target Layers" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card border-0 rounded-4 p-4 h-100 bg-white shadow-sm">
            <div className="mb-3">
              <h5 className="fw-bold text-dark m-0">Order Pipeline Ratios</h5>
              <p className="text-muted small m-0">Live segmentation of order success analytics.</p>
            </div>
            <div className="d-flex align-items-center justify-content-center" style={{ width: '100%', height: 220 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={orders.length > 0 ? 5 : 0}
                    dataKey="value"
                  >
                    {orders.length > 0 ? (
                      orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))
                    ) : (
                      <Cell fill="#e2e8f0" />
                    )}
                  </Pie>
                  <Tooltip enabled={orders.length > 0} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-3 mt-2">
              {orders.length > 0 ? (
                orderStatusData.map((data, index) => (
                  <div key={index} className="d-flex align-items-center gap-1" style={{ fontSize: '12px' }}>
                    <span className="rounded-circle d-inline-block" style={{ width: '10px', height: '10px', backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />
                    <span className="text-muted fw-semibold">{data.name}</span>
                  </div>
                ))
              ) : (
                <span className="text-muted small fst-italic">No dynamic nodes configured</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* लाइव ऑर्डर्स लिस्ट */}
      <div className="card border-0 rounded-4 p-4 bg-white shadow-sm">
        <h5 className="fw-bold text-dark mb-3">Live Active Pipelines (Orders)</h5>
        <div className="table-responsive">
          <table className="table align-middle m-0 border-0">
            <thead>
              <tr className="text-secondary small border-bottom" style={{ fontSize: '12px', borderColor: '#cbd5e1' }}>
                <th className="pb-3 fw-bold border-0 ps-0">TRACKING ID</th>
                <th className="pb-3 fw-bold border-0">CUSTOMER</th>
                <th className="pb-3 fw-bold border-0">SERVICE</th>
                <th className="pb-3 fw-bold border-0">AMOUNT</th>
                <th className="pb-3 fw-bold border-0 text-end pe-0">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} style={{ fontSize: '14px' }} className="border-bottom">
                    <td className="py-3 ps-0 text-muted small font-monospace fw-semibold">
                      #{order.orderId || order.id?.substring(0, 8)}
                    </td>
                    <td className="py-3">
                      <div className="fw-bold text-dark">{order.clientName}</div>
                      <div className="text-muted small" style={{ fontSize: '11px' }}>{order.clientPhone}</div>
                    </td>
                    <td className="py-3">
                      <span className="fw-medium">{order.selectedService}</span>
                      <div className="text-muted small" style={{ fontSize: '10px' }}>{order.packagePlan}</div>
                    </td>
                    <td className="py-3 fw-bold text-dark">
                      ₹{Number(order.finalPayableAmount || 0).toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 text-end pe-0">
                      <span className={`badge px-3 py-2 rounded-pill fw-bold bg-opacity-10 ${order.orderStatus === 'Completed' ? 'bg-success text-success' :
                          order.orderStatus === 'Pending' ? 'bg-warning text-warning' :
                            order.orderStatus === 'Cancelled' ? 'bg-danger text-danger' : 'bg-primary text-primary'
                        }`} style={{ fontSize: '11px' }}>
                        {order.orderStatus || 'New'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted fw-medium">
                    No orders found in real-time database cluster.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}