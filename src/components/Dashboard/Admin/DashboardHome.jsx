"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { rtdb as db } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Bar
} from 'recharts';
import {
  Users, FolderCheck, Box, ArrowUpRight
} from 'lucide-react';

const CHART_COLORS = ['#ff0080', '#a855f7', '#00f2fe', '#10b981'];

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
    { name: 'Jun', ActiveClusters: metrics.activeProjects || 12, TargetLayers: metrics.packagesCount },
  ];

  if (isAppLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'transparent' }}>
        <div className="spinner-border text-primary" role="status"></div>
        <span className="ms-3 text-theme-primary fw-semibold">Syncing Dynamic Workspace...</span>
      </div>
    );
  }

  return (
    <div className="container-fluid px-0 animate-fade">

      {/* TOP HEADER WITH BADGE */}
      <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <div 
            className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2"
            style={{
              background: 'rgba(255, 0, 128, 0.08)',
              border: '1.5px solid rgba(255, 0, 128, 0.35)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 15px rgba(255, 0, 128, 0.15)'
            }}
          >
            <span style={{ width: '6px', height: '6px', backgroundColor: '#ff0080', borderRadius: '50%', boxShadow: '0 0 10px #ff0080' }} />
            <span className="fw-black text-uppercase" style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: '#ff77bc', fontWeight: 800 }}>
              ✦ REAL-TIME MONITORING
            </span>
          </div>

          <h2 className="display-6 fw-black text-theme-primary m-0" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
            System <span className="text-gradient-pink-orange" style={{ fontWeight: 900 }}>Metrics</span>
          </h2>
          <p className="text-theme-secondary small m-0 mt-1" style={{ fontWeight: 500 }}>
            Platform overview indicators. <span className="fw-bold text-success">● Live Sync</span>
          </p>
        </div>
      </div>

      {/* TOP METRIC CARDS */}
      <div className="row g-3 mb-4">
        {/* Total Users */}
        <div className="col-12 col-md-4">
          <div 
            className="p-4 rounded-4 text-white position-relative overflow-hidden h-100"
            style={{ 
              background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
              boxShadow: '0 10px 30px rgba(168, 85, 247, 0.35)'
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-white-50 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>Total Users</span>
                <h2 className="fw-black mt-2 mb-1 text-white" style={{ fontSize: '2.2rem', fontWeight: 900 }}>{metrics.totalUsers}</h2>
                <span className="text-white small fw-bold d-flex align-items-center gap-1 opacity-90" style={{ fontSize: '12px' }}>
                  <ArrowUpRight size={14} /> Live DB
                </span>
              </div>
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}
              >
                <Users size={22} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Projects */}
        <div className="col-6 col-md-4">
          <div 
            className="p-4 rounded-4 text-white position-relative overflow-hidden h-100"
            style={{ 
              background: 'linear-gradient(135deg, #ff0080 0%, #f97316 100%)',
              boxShadow: '0 10px 30px rgba(255, 0, 128, 0.35)'
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-white-50 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>Active Projects</span>
                <h2 className="fw-black mt-2 mb-1 text-white" style={{ fontSize: '2.2rem', fontWeight: 900 }}>{metrics.activeProjects}</h2>
                <span className="text-white small fw-bold d-flex align-items-center gap-1 opacity-90" style={{ fontSize: '12px' }}>
                  <ArrowUpRight size={14} /> Live
                </span>
              </div>
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center d-none d-sm-flex"
                style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}
              >
                <FolderCheck size={22} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Packages */}
        <div className="col-6 col-md-4">
          <div 
            className="p-4 rounded-4 text-white position-relative overflow-hidden h-100"
            style={{ 
              background: 'linear-gradient(135deg, #00f2fe 0%, #3b82f6 100%)',
              boxShadow: '0 10px 30px rgba(0, 242, 254, 0.35)'
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-white-50 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>Packages</span>
                <h2 className="fw-black mt-2 mb-1 text-white" style={{ fontSize: '2rem', fontWeight: 900 }}>{metrics.packagesCount} L</h2>
                <span className="text-white small fw-bold opacity-90" style={{ fontSize: '12px' }}>v2.0 Core</span>
              </div>
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center d-none d-sm-flex"
                style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}
              >
                <Box size={22} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="row g-4 mb-4">
        {/* Left Area Chart */}
        <div className="col-12 col-lg-8">
          <div 
            className="rounded-4 p-4 h-100 border"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
              boxShadow: '0 10px 30px var(--shadow-color)'
            }}
          >
            <div className="mb-4">
              <h5 className="fw-black text-theme-primary m-0" style={{ fontWeight: 800 }}>Infrastructure &amp; Deployment Scales</h5>
              <p className="text-theme-secondary small m-0 mt-0.5" style={{ fontWeight: 500 }}>Monthly analysis of active core clusters and workspace setups.</p>
            </div>
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer>
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCluster" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff0080" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#ff0080" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" style={{ fontSize: '12px', fontWeight: '600' }} tickLine={false} />
                  <YAxis stroke="var(--text-secondary)" style={{ fontSize: '12px', fontWeight: '600' }} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--bg-card)', 
                      borderColor: 'var(--border-subtle)', 
                      borderRadius: '12px',
                      color: 'var(--text-primary)'
                    }} 
                  />
                  <Area type="monotone" dataKey="ActiveClusters" stroke="#ff0080" strokeWidth={3} fillOpacity={1} fill="url(#colorCluster)" name="Active Clusters" />
                  <Bar dataKey="TargetLayers" barSize={14} fill="#a855f7" radius={[4, 4, 0, 0]} name="Target Layers" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Pie Chart */}
        <div className="col-12 col-lg-4">
          <div 
            className="rounded-4 p-4 h-100 border d-flex flex-column justify-content-between"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
              boxShadow: '0 10px 30px var(--shadow-color)'
            }}
          >
            <div>
              <h5 className="fw-black text-theme-primary m-0" style={{ fontWeight: 800 }}>Order Pipeline Ratios</h5>
              <p className="text-theme-secondary small m-0 mt-0.5" style={{ fontWeight: 500 }}>Live segmentation of order success analytics.</p>
            </div>
            
            <div className="d-flex align-items-center justify-content-center my-3" style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={78}
                    paddingAngle={orders.length > 0 ? 5 : 0}
                    dataKey="value"
                  >
                    {orders.length > 0 ? (
                      orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))
                    ) : (
                      <Cell fill="var(--border-subtle)" />
                    )}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--bg-card)', 
                      borderColor: 'var(--border-subtle)', 
                      borderRadius: '12px',
                      color: 'var(--text-primary)'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-2 mt-2">
              {orders.length > 0 ? (
                orderStatusData.map((data, index) => (
                  <div key={index} className="d-flex align-items-center gap-1.5" style={{ fontSize: '11px' }}>
                    <span className="rounded-circle d-inline-block" style={{ width: '8px', height: '8px', backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />
                    <span className="text-theme-secondary fw-semibold">{data.name}</span>
                  </div>
                ))
              ) : (
                <span className="text-theme-secondary small fst-italic">No dynamic nodes configured</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* LIVE ORDERS TABLE */}
      <div 
        className="rounded-4 p-4 border"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-subtle)',
          boxShadow: '0 10px 30px var(--shadow-color)'
        }}
      >
        <h5 className="fw-black text-theme-primary mb-3" style={{ fontWeight: 800 }}>Live Active Pipelines (Orders)</h5>
        <div className="table-responsive">
          <table className="table align-middle m-0 border-0 text-theme-primary">
            <thead>
              <tr className="text-theme-secondary small border-bottom" style={{ fontSize: '12px', borderColor: 'var(--border-subtle)' }}>
                <th className="pb-3 fw-bold border-0 ps-0 text-theme-secondary">TRACKING ID</th>
                <th className="pb-3 fw-bold border-0 text-theme-secondary">CUSTOMER</th>
                <th className="pb-3 fw-bold border-0 text-theme-secondary">SERVICE</th>
                <th className="pb-3 fw-bold border-0 text-theme-secondary">AMOUNT</th>
                <th className="pb-3 fw-bold border-0 text-end pe-0 text-theme-secondary">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id}  className="border-bottom" style={{ borderColor: 'var(--border-subtle)', fontSize: '14px' }}>
                    <td className="py-3 ps-0 text-theme-secondary small font-monospace fw-semibold">
                      #{order.orderId || order.id?.substring(0, 8)}
                    </td>
                    <td className="py-3">
                      <div className="fw-bold text-theme-primary">{order.clientName}</div>
                      <div className="text-theme-secondary small" style={{ fontSize: '11px' }}>{order.clientPhone}</div>
                    </td>
                    <td className="py-3">
                      <span className="fw-medium text-theme-primary">{order.selectedService}</span>
                      <div className="text-theme-secondary small" style={{ fontSize: '10px' }}>{order.packagePlan}</div>
                    </td>
                    <td className="py-3 fw-black text-theme-primary" style={{ fontWeight: 800 }}>
                      ₹{Number(order.finalPayableAmount || 0).toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 text-end pe-0">
                      <span className={`badge px-3 py-1.5 rounded-pill text-white fw-bold ${
                        order.orderStatus === 'Completed' ? 'bg-success bg-opacity-20' :
                        order.orderStatus === 'Pending' ? 'bg-warning bg-opacity-20' :
                        order.orderStatus === 'Cancelled' ? 'bg-danger bg-opacity-20' : 'bg-primary bg-opacity-20'
                      }`} style={{ fontSize: '11px' }}>
                        {order.orderStatus || 'New'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-theme-secondary fw-medium">
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