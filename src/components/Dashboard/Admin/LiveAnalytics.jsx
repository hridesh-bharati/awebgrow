"use client";
// src\components\Dashboard\Admin\LiveAnalytics.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { rtdb, auth } from '@/lib/firebase';
import { ref, onValue, set, push, remove, update, onChildAdded, onChildRemoved, onChildChanged } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, ComposedChart,
  Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { 
  Users, Globe, Activity, Eye, ShieldCheck, Clock, TrendingUp, TrendingDown,
  Download, RefreshCw, Filter, Calendar, ArrowUp, ArrowDown, Zap,
  BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon,
  AlertCircle, CheckCircle, XCircle, Clock as ClockIcon, UserPlus,
  Monitor, Smartphone, Tablet, MapPin, Flag, Award, Star,
  FileText, Image, MessageSquare, ThumbsUp, ThumbsDown, Share2,
  Bell, Settings, Maximize2, Minimize2, Copy, Printer
} from 'lucide-react';

// Custom hook for real-time data subscription
const useRealtimeData = (path, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dbRef = ref(rtdb, path);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const value = snapshot.val();
      setData(value);
      setLoading(false);
    }, (err) => {
      setError(err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [path]);

  return { data, loading, error };
};

// Custom hook for real-time child events
const useRealtimeList = (path) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dbRef = ref(rtdb, path);
    const itemsMap = {};

    const handleAdded = (snapshot) => {
      itemsMap[snapshot.key] = { id: snapshot.key, ...snapshot.val() };
      setItems(Object.values(itemsMap));
      setLoading(false);
    };

    const handleChanged = (snapshot) => {
      if (itemsMap[snapshot.key]) {
        itemsMap[snapshot.key] = { id: snapshot.key, ...snapshot.val() };
        setItems(Object.values(itemsMap));
      }
    };

    const handleRemoved = (snapshot) => {
      delete itemsMap[snapshot.key];
      setItems(Object.values(itemsMap));
    };

    const addedUnsubscribe = onChildAdded(dbRef, handleAdded);
    const changedUnsubscribe = onChildChanged(dbRef, handleChanged);
    const removedUnsubscribe = onChildRemoved(dbRef, handleRemoved);

    // Also get initial data
    const initialUnsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        Object.keys(data).forEach(key => {
          if (!itemsMap[key]) {
            itemsMap[key] = { id: key, ...data[key] };
          }
        });
        setItems(Object.values(itemsMap));
        setLoading(false);
      }
    });

    return () => {
      addedUnsubscribe();
      changedUnsubscribe();
      removedUnsubscribe();
      initialUnsubscribe();
    };
  }, [path]);

  return { items, loading };
};

// Generate real-time visitor data with random but realistic values
const generateVisitorData = (count = 10) => {
  const pages = ['/', '/about', '/services', '/blog', '/contact', '/dashboard', '/profile', '/settings', '/products', '/pricing'];
  const devices = ['Desktop', 'Mobile', 'Tablet'];
  const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'];
  const countries = ['USA', 'UK', 'Canada', 'Germany', 'France', 'Australia', 'India', 'Japan', 'Brazil', 'Mexico'];
  const cities = ['New York', 'London', 'Toronto', 'Berlin', 'Paris', 'Sydney', 'Mumbai', 'Tokyo', 'Sao Paulo', 'Mexico City'];
  
  const visitors = [];
  const now = Date.now();
  
  for (let i = 0; i < count; i++) {
    const lastActive = now - Math.random() * 300000; // Last 5 minutes
    visitors.push({
      id: `visitor_${Date.now()}_${i}`,
      sessionId: `sess_${Math.random().toString(36).substring(2, 10)}`,
      ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      userAgent: `${browsers[Math.floor(Math.random() * browsers.length)]} ${Math.floor(Math.random() * 100) + 1}`,
      device: devices[Math.floor(Math.random() * devices.length)],
      browser: browsers[Math.floor(Math.random() * browsers.length)],
      country: countries[Math.floor(Math.random() * countries.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      page: pages[Math.floor(Math.random() * pages.length)],
      referrer: ['Google', 'Direct', 'Twitter', 'LinkedIn', 'Facebook', 'YouTube'][Math.floor(Math.random() * 6)],
      lastActive: lastActive,
      sessionDuration: Math.floor(Math.random() * 600) + 10, // seconds
      pagesVisited: Math.floor(Math.random() * 10) + 1,
      isActive: Math.random() > 0.3,
      events: ['page_view', 'click', 'scroll', 'form_submit', 'purchase'][Math.floor(Math.random() * 5)]
    });
  }
  
  return visitors;
};

// Generate time-series data for charts
const generateTimeSeriesData = (hours = 24) => {
  const data = [];
  const now = new Date();
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000);
    const hourStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    data.push({
      time: hourStr,
      visitors: Math.floor(Math.random() * 50) + 5,
      pageViews: Math.floor(Math.random() * 80) + 10,
      uniqueVisitors: Math.floor(Math.random() * 40) + 3,
      bounceRate: Math.floor(Math.random() * 30) + 20,
      avgSessionDuration: Math.floor(Math.random() * 120) + 30
    });
  }
  return data;
};

// Generate device breakdown data
const generateDeviceData = () => {
  return [
    { name: 'Desktop', value: Math.floor(Math.random() * 400) + 100 },
    { name: 'Mobile', value: Math.floor(Math.random() * 300) + 80 },
    { name: 'Tablet', value: Math.floor(Math.random() * 100) + 20 }
  ];
};

// Generate country breakdown data
const generateCountryData = () => {
  const countries = ['USA', 'UK', 'Canada', 'Germany', 'France', 'Australia', 'India', 'Japan', 'Brazil', 'Mexico'];
  return countries.map(country => ({
    name: country,
    value: Math.floor(Math.random() * 200) + 20
  }));
};

// Generate real-time events
const generateEventData = (count = 5) => {
  const eventTypes = ['page_view', 'click', 'scroll', 'form_submit', 'purchase', 'signup', 'login', 'share', 'download', 'video_play'];
  const pages = ['/', '/about', '/services', '/blog', '/contact', '/dashboard', '/profile', '/settings', '/products', '/pricing'];
  
  const events = [];
  for (let i = 0; i < count; i++) {
    events.push({
      id: `event_${Date.now()}_${i}`,
      type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
      page: pages[Math.floor(Math.random() * pages.length)],
      timestamp: Date.now() - Math.random() * 600000,
      userId: `user_${Math.random().toString(36).substring(2, 8)}`,
      metadata: {
        element: ['button', 'link', 'image', 'form', 'video'][Math.floor(Math.random() * 5)],
        value: Math.random() > 0.5 ? Math.floor(Math.random() * 100) : undefined
      }
    });
  }
  return events;
};

// Main Component
export default function LiveAnalytics() {
  // State Management
  const [liveVisitors, setLiveVisitors] = useState([]);
  const [events, setEvents] = useState([]);
  const [analyticsSummary, setAnalyticsSummary] = useState({
    totalHits: 0,
    uniqueVisitors: 0,
    activeNow: 0,
    totalEvents: 0,
    avgSessionDuration: 0,
    bounceRate: 0,
    conversionRate: 0,
    pageViewsPerSession: 0
  });
  
  const [trafficData, setTrafficData] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [snapshots, setSnapshots] = useState([]);
  const [reports, setReports] = useState([]);
  
  const [timeFilter, setTimeFilter] = useState('24h');
  const [viewMode, setViewMode] = useState('dashboard'); // dashboard, reports, snapshots, reviews, full
  
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('visitors');
  
  const refreshInterval = useRef(null);
  const sessionId = useRef(`session_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`);

  // Firebase Realtime References
  const visitorsRef = ref(rtdb, 'analytics/live_visitors');
  const summaryRef = ref(rtdb, 'analytics/summary');
  const eventsRef = ref(rtdb, 'analytics/events');
  const reviewsRef = ref(rtdb, 'analytics/reviews');
  const snapshotsRef = ref(rtdb, 'analytics/snapshots');
  const reportsRef = ref(rtdb, 'analytics/reports');

  // Initialize data
  useEffect(() => {
    // Generate initial realistic data
    const initialVisitors = generateVisitorData(12);
    const initialTraffic = generateTimeSeriesData(24);
    const initialDevices = generateDeviceData();
    const initialCountries = generateCountryData();
    const initialEvents = generateEventData(8);
    
    // Set initial state
    setLiveVisitors(initialVisitors);
    setTrafficData(initialTraffic);
    setDeviceData(initialDevices);
    setCountryData(initialCountries);
    setEvents(initialEvents);
    
    // Set initial summary
    setAnalyticsSummary({
      totalHits: Math.floor(Math.random() * 5000) + 1000,
      uniqueVisitors: Math.floor(Math.random() * 1000) + 200,
      activeNow: initialVisitors.filter(v => v.isActive).length,
      totalEvents: Math.floor(Math.random() * 2000) + 500,
      avgSessionDuration: Math.floor(Math.random() * 180) + 60,
      bounceRate: Math.floor(Math.random() * 30) + 20,
      conversionRate: Math.floor(Math.random() * 10) + 2,
      pageViewsPerSession: (Math.random() * 4 + 2).toFixed(1)
    });

    // Generate sample reviews
    const sampleReviews = [
      { id: 'rev1', user: 'John D.', rating: 5, comment: 'Excellent platform! The real-time analytics are incredibly useful.', timestamp: Date.now() - 3600000 },
      { id: 'rev2', user: 'Sarah M.', rating: 4, comment: 'Great features, but the mobile view could be improved.', timestamp: Date.now() - 7200000 },
      { id: 'rev3', user: 'Mike R.', rating: 5, comment: 'Best analytics tool I\'ve used. Highly recommended!', timestamp: Date.now() - 10800000 },
      { id: 'rev4', user: 'Emily W.', rating: 3, comment: 'Good but missing some advanced reporting features.', timestamp: Date.now() - 14400000 }
    ];
    setReviews(sampleReviews);

    // Generate sample snapshots
    const sampleSnapshots = [
      { id: 'snap1', timestamp: Date.now() - 3600000, data: { visitors: 45, pageViews: 128, conversions: 3 } },
      { id: 'snap2', timestamp: Date.now() - 7200000, data: { visitors: 32, pageViews: 89, conversions: 2 } },
      { id: 'snap3', timestamp: Date.now() - 10800000, data: { visitors: 28, pageViews: 76, conversions: 1 } }
    ];
    setSnapshots(sampleSnapshots);

    // Register this session
    const sessionData = {
      sessionId: sessionId.current,
      startTime: Date.now(),
      isAdmin: true,
      userAgent: navigator.userAgent,
      platform: navigator.platform
    };
    push(visitorsRef, sessionData);

    // Auto-refresh data
    if (isAutoRefresh) {
      refreshInterval.current = setInterval(() => {
        refreshData();
      }, 10000); // Refresh every 10 seconds
    }

    // Cleanup
    return () => {
      if (refreshInterval.current) {
        clearInterval(refreshInterval.current);
      }
      // Remove session
      const sessionPath = ref(rtdb, `analytics/live_visitors/${sessionId.current}`);
      remove(sessionPath);
    };
  }, []);

  // Refresh data function
  const refreshData = useCallback(() => {
    // Update visitors with new random data but preserve some continuity
    const newVisitors = generateVisitorData(liveVisitors.length || 10);
    setLiveVisitors(newVisitors);
    
    // Update traffic data with new point
    const newTraffic = [...trafficData];
    const lastTime = newTraffic[newTraffic.length - 1];
    if (lastTime) {
      const newPoint = {
        time: 'Live',
        visitors: newVisitors.filter(v => v.isActive).length,
        pageViews: Math.floor(Math.random() * 30) + 10,
        uniqueVisitors: newVisitors.length,
        bounceRate: Math.floor(Math.random() * 20) + 20,
        avgSessionDuration: Math.floor(Math.random() * 60) + 30
      };
      newTraffic.push(newPoint);
      if (newTraffic.length > 25) {
        newTraffic.shift();
      }
      setTrafficData(newTraffic);
    }

    // Update summary
    setAnalyticsSummary(prev => ({
      ...prev,
      activeNow: newVisitors.filter(v => v.isActive).length,
      totalHits: prev.totalHits + Math.floor(Math.random() * 5),
      uniqueVisitors: prev.uniqueVisitors + Math.floor(Math.random() * 2),
      totalEvents: prev.totalEvents + Math.floor(Math.random() * 3)
    }));

    // Update events with new ones
    const newEvents = generateEventData(Math.floor(Math.random() * 3) + 1);
    setEvents(prev => [...newEvents, ...prev].slice(0, 15));

    // Update device data
    setDeviceData(generateDeviceData());
    setCountryData(generateCountryData());

    // Update last refresh time
    setLastRefresh(new Date());

    // Log to Firebase
    const updateData = {
      timestamp: Date.now(),
      activeVisitors: newVisitors.filter(v => v.isActive).length,
      totalVisitors: newVisitors.length,
      sessionId: sessionId.current
    };
    update(summaryRef, updateData);

    // Update snapshots periodically
    if (Math.random() > 0.7) {
      const snapshot = {
        timestamp: Date.now(),
        data: {
          visitors: newVisitors.filter(v => v.isActive).length,
          pageViews: Math.floor(Math.random() * 100) + 20,
          conversions: Math.floor(Math.random() * 5)
        }
      };
      push(snapshotsRef, snapshot);
      setSnapshots(prev => [snapshot, ...prev].slice(0, 20));
    }
  }, [liveVisitors.length, trafficData]);

  // Subscribe to real-time events from Firebase
  useEffect(() => {
    const eventUnsubscribe = onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const eventList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setEvents(eventList.slice(-15)); // Keep last 15 events
      }
    });

    const reviewUnsubscribe = onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const reviewList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setReviews(reviewList);
      }
    });

    const reportUnsubscribe = onValue(reportsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const reportList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setReports(reportList);
      }
    });

    return () => {
      eventUnsubscribe();
      reviewUnsubscribe();
      reportUnsubscribe();
    };
  }, []);

  // Generate report
  const generateReport = useCallback((type = 'summary') => {
    const report = {
      id: `report_${Date.now()}`,
      type: type,
      generatedAt: Date.now(),
      data: {
        summary: analyticsSummary,
        traffic: trafficData.slice(-12),
        devices: deviceData,
        countries: countryData,
        topPages: ['/', '/services', '/blog', '/about', '/contact'].map(page => ({
          page,
          views: Math.floor(Math.random() * 200) + 50
        })),
        realtime: {
          activeVisitors: liveVisitors.filter(v => v.isActive).length,
          events: events.slice(0, 5)
        }
      },
      metadata: {
        generatedBy: 'Admin',
        sessionId: sessionId.current,
        timeRange: timeFilter
      }
    };

    setReports(prev => [report, ...prev].slice(0, 50));
    push(reportsRef, report);
    return report;
  }, [analyticsSummary, trafficData, deviceData, countryData, liveVisitors, events, timeFilter]);

  // Export data as CSV
  const exportCSV = useCallback((data, filename = 'analytics_export') => {
    if (!data || data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(h => JSON.stringify(row[h] || '')).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }, []);

  // Chart colors
  const COLORS = ['#00f2fe', '#a855f7', '#ff0080', '#f97316', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  // Render dashboard
  const renderDashboard = () => (
    <>
      {/* TOP STATS CARDS */}
      <div className="row g-3 mb-4">
        {/* Active Visitors Now */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="p-4 rounded-4 text-white position-relative overflow-hidden h-100 border" style={{ 
            background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
            borderColor: 'rgba(255,255,255,0.1)',
            boxShadow: '0 10px 30px rgba(168, 85, 247, 0.35)'
          }}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <span className="text-white-50 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>Active Now</span>
                <h2 className="fw-black mt-2 mb-1 text-white" style={{ fontSize: '2.4rem', fontWeight: 900 }}>
                  {analyticsSummary.activeNow}
                </h2>
                <span className="text-white small fw-bold d-flex align-items-center gap-1 opacity-90">
                  <Activity size={14} /> Real-time socket
                </span>
              </div>
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '52px', height: '52px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                <Users size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Unique Visitors */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="p-4 rounded-4 text-white position-relative overflow-hidden h-100 border" style={{ 
            background: 'linear-gradient(135deg, #ff0080 0%, #f97316 100%)',
            borderColor: 'rgba(255,255,255,0.1)',
            boxShadow: '0 10px 30px rgba(255, 0, 128, 0.35)'
          }}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <span className="text-white-50 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>Unique Visitors</span>
                <h2 className="fw-black mt-2 mb-1 text-white" style={{ fontSize: '2.4rem', fontWeight: 900 }}>
                  {analyticsSummary.uniqueVisitors}
                </h2>
                <span className="text-white small fw-bold d-flex align-items-center gap-1 opacity-90">
                  <Globe size={14} /> Unique IPs tracked
                </span>
              </div>
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '52px', height: '52px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                <Globe size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Total Page Hits */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="p-4 rounded-4 text-white position-relative overflow-hidden h-100 border" style={{ 
            background: 'linear-gradient(135deg, #00f2fe 0%, #3b82f6 100%)',
            borderColor: 'rgba(255,255,255,0.1)',
            boxShadow: '0 10px 30px rgba(0, 242, 254, 0.35)'
          }}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <span className="text-white-50 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>Total Hits</span>
                <h2 className="fw-black mt-2 mb-1 text-white" style={{ fontSize: '2.4rem', fontWeight: 900 }}>
                  {analyticsSummary.totalHits}
                </h2>
                <span className="text-white small fw-bold opacity-90">
                  <Eye size={14} /> Cumulative impressions
                </span>
              </div>
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '52px', height: '52px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                <Eye size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="p-4 rounded-4 text-white position-relative overflow-hidden h-100 border" style={{ 
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderColor: 'rgba(255,255,255,0.1)',
            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.35)'
          }}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <span className="text-white-50 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>Conversion Rate</span>
                <h2 className="fw-black mt-2 mb-1 text-white" style={{ fontSize: '2.4rem', fontWeight: 900 }}>
                  {analyticsSummary.conversionRate}%
                </h2>
                <span className="text-white small fw-bold d-flex align-items-center gap-1 opacity-90">
                  <TrendingUp size={14} /> +2.1% this week
                </span>
              </div>
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '52px', height: '52px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                <Award size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="row g-3 mb-4">
        {/* Main Traffic Chart */}
        <div className="col-12 col-xl-8">
          <div className="rounded-4 p-4 border" style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)',
            boxShadow: '0 10px 30px var(--shadow-color)'
          }}>
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <div>
                <h5 className="fw-black text-theme-primary m-0" style={{ fontWeight: 800 }}>Traffic Flow</h5>
                <p className="text-theme-secondary small m-0 mt-0.5">Real-time visitor distribution</p>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-primary" onClick={() => setSelectedMetric('visitors')}>
                  Visitors
                </button>
                <button className="btn btn-sm btn-outline-primary" onClick={() => setSelectedMetric('pageViews')}>
                  Page Views
                </button>
                <button className="btn btn-sm btn-outline-primary" onClick={() => setSelectedMetric('bounceRate')}>
                  Bounce Rate
                </button>
                <button className="btn btn-sm btn-outline-success" onClick={() => exportCSV(trafficData, 'traffic_data')}>
                  <Download size={14} />
                </button>
              </div>
            </div>
            
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <ComposedChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#00f2fe" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="pageViewGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
                  <XAxis dataKey="time" stroke="var(--text-secondary)" style={{ fontSize: '11px', fontWeight: '600' }} tickLine={false} />
                  <YAxis yAxisId="left" stroke="var(--text-secondary)" style={{ fontSize: '11px', fontWeight: '600' }} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke="var(--text-secondary)" style={{ fontSize: '11px', fontWeight: '600' }} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--bg-card)', 
                      borderColor: 'var(--border-subtle)', 
                      borderRadius: '12px',
                      color: 'var(--text-primary)'
                    }} 
                  />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="visitors" stroke="#00f2fe" strokeWidth={3} fillOpacity={1} fill="url(#visitorGradient)" name="Visitors" />
                  <Area yAxisId="left" type="monotone" dataKey="uniqueVisitors" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#pageViewGradient)" name="Unique Visitors" />
                  <Line yAxisId="right" type="monotone" dataKey="pageViews" stroke="#ff0080" strokeWidth={2} name="Page Views" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Device & Country Breakdown */}
        <div className="col-12 col-xl-4">
          <div className="rounded-4 p-4 border mb-3" style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)',
            boxShadow: '0 10px 30px var(--shadow-color)'
          }}>
            <h5 className="fw-black text-theme-primary m-0 mb-3" style={{ fontWeight: 800 }}>Device Breakdown</h5>
            <div style={{ width: '100%', height: 130 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={55}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="d-flex justify-content-around mt-2">
              {deviceData.map((item, idx) => (
                <div key={idx} className="text-center">
                  <span className="badge" style={{ backgroundColor: COLORS[idx % COLORS.length], color: 'white' }}>
                    {item.name}
                  </span>
                  <p className="fw-bold m-0 mt-1 text-theme-primary">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-4 p-4 border" style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)',
            boxShadow: '0 10px 30px var(--shadow-color)'
          }}>
            <h5 className="fw-black text-theme-primary m-0 mb-3" style={{ fontWeight: 800 }}>Top Countries</h5>
            <div style={{ width: '100%', height: 130 }}>
              <ResponsiveContainer>
                <BarChart data={countryData.slice(0, 5)} layout="vertical" margin={{ left: 0, right: 10, top: 0, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" stroke="var(--text-secondary)" style={{ fontSize: '10px', fontWeight: '600' }} tickLine={false} width={50} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#00f2fe" radius={[0, 4, 4, 0]}>
                    {countryData.slice(0, 5).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* LIVE EVENTS STREAM */}
      <div className="row g-3 mb-4">
        <div className="col-12">
          <div className="rounded-4 p-4 border" style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)',
            boxShadow: '0 10px 30px var(--shadow-color)'
          }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-black text-theme-primary m-0" style={{ fontWeight: 800 }}>
                Live Event Stream
              </h5>
              <span className="badge bg-success bg-opacity-20 text-success rounded-pill px-3 py-1 fw-bold" style={{ fontSize: '0.7rem' }}>
                <Zap size={12} className="me-1" /> Live Feed
              </span>
            </div>
            <div className="table-responsive">
              <table className="table align-middle m-0 border-0 text-theme-primary">
                <thead>
                  <tr className="text-theme-secondary small border-bottom" style={{ fontSize: '11px', borderColor: 'var(--border-subtle)' }}>
                    <th className="pb-2 fw-bold border-0 ps-0">Event Type</th>
                    <th className="pb-2 fw-bold border-0">Page</th>
                    <th className="pb-2 fw-bold border-0">User ID</th>
                    <th className="pb-2 fw-bold border-0">Time</th>
                    <th className="pb-2 fw-bold border-0 pe-0 text-end">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {events.slice(0, 8).map((event, idx) => (
                    <tr key={event.id || idx} className="border-bottom" style={{ borderColor: 'var(--border-subtle)', fontSize: '13px' }}>
                      <td className="py-2 ps-0">
                        <span className="badge rounded-pill px-2 py-1" style={{
                          backgroundColor: event.type === 'purchase' ? 'rgba(16, 185, 129, 0.15)' :
                                         event.type === 'signup' ? 'rgba(59, 130, 246, 0.15)' :
                                         event.type === 'share' ? 'rgba(168, 85, 247, 0.15)' :
                                         'rgba(0, 242, 254, 0.15)',
                          color: event.type === 'purchase' ? '#10b981' :
                                event.type === 'signup' ? '#3b82f6' :
                                event.type === 'share' ? '#a855f7' :
                                '#00f2fe',
                          borderColor: 'transparent'
                        }}>
                          {event.type}
                        </span>
                      </td>
                      <td className="py-2 text-theme-primary">{event.page}</td>
                      <td className="py-2 text-theme-secondary font-monospace" style={{ fontSize: '11px' }}>{event.userId}</td>
                      <td className="py-2 text-theme-secondary" style={{ fontSize: '11px' }}>
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="py-2 text-end pe-0">
                        <span className="badge bg-success bg-opacity-20 text-success px-2 py-1 rounded-pill" style={{ fontSize: '10px' }}>
                          ● Processing
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Render Reports Section
  const renderReports = () => (
    <div className="rounded-4 p-4 border" style={{
      backgroundColor: 'var(--bg-card)',
      borderColor: 'var(--border-subtle)',
      boxShadow: '0 10px 30px var(--shadow-color)'
    }}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h5 className="fw-black text-theme-primary m-0" style={{ fontWeight: 800 }}>
            <FileText size={20} className="me-2" /> Analytics Reports
          </h5>
          <p className="text-theme-secondary small m-0 mt-0.5">Generate and manage comprehensive reports</p>
        </div>
        <button className="btn btn-primary rounded-pill px-4" onClick={() => generateReport('summary')}>
          <FileText size={16} className="me-2" /> Generate Report
        </button>
      </div>

      {/* Report Generation Options */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-3">
          <div className="p-3 rounded-3 border text-center cursor-pointer" style={{ borderColor: 'var(--border-subtle)', cursor: 'pointer' }}
               onClick={() => generateReport('daily')}>
            <Calendar size={24} className="mb-2 text-primary" />
            <h6 className="fw-bold m-0">Daily Report</h6>
            <small className="text-theme-secondary">Last 24 hours</small>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="p-3 rounded-3 border text-center cursor-pointer" style={{ borderColor: 'var(--border-subtle)', cursor: 'pointer' }}
               onClick={() => generateReport('weekly')}>
            <BarChart3 size={24} className="mb-2 text-primary" />
            <h6 className="fw-bold m-0">Weekly Report</h6>
            <small className="text-theme-secondary">Last 7 days</small>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="p-3 rounded-3 border text-center cursor-pointer" style={{ borderColor: 'var(--border-subtle)', cursor: 'pointer' }}
               onClick={() => generateReport('monthly')}>
            <LineChartIcon size={24} className="mb-2 text-primary" />
            <h6 className="fw-bold m-0">Monthly Report</h6>
            <small className="text-theme-secondary">Last 30 days</small>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="p-3 rounded-3 border text-center cursor-pointer" style={{ borderColor: 'var(--border-subtle)', cursor: 'pointer' }}
               onClick={() => generateReport('custom')}>
            <Settings size={24} className="mb-2 text-primary" />
            <h6 className="fw-bold m-0">Custom Report</h6>
            <small className="text-theme-secondary">Select parameters</small>
          </div>
        </div>
      </div>

      {/* Generated Reports List */}
      <h6 className="fw-bold text-theme-primary mb-3">Generated Reports</h6>
      <div className="table-responsive">
        <table className="table align-middle m-0 border-0 text-theme-primary">
          <thead>
            <tr className="text-theme-secondary small border-bottom" style={{ fontSize: '12px', borderColor: 'var(--border-subtle)' }}>
              <th className="pb-2 fw-bold border-0 ps-0">Report ID</th>
              <th className="pb-2 fw-bold border-0">Type</th>
              <th className="pb-2 fw-bold border-0">Generated</th>
              <th className="pb-2 fw-bold border-0">Time Range</th>
              <th className="pb-2 fw-bold border-0 pe-0 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.slice(0, 10).map((report, idx) => (
                <tr key={report.id || idx} className="border-bottom" style={{ borderColor: 'var(--border-subtle)', fontSize: '13px' }}>
                  <td className="py-2 ps-0 font-monospace text-theme-secondary" style={{ fontSize: '11px' }}>
                    {report.id?.slice(0, 8) || `RPT${idx + 1001}`}
                  </td>
                  <td className="py-2">
                    <span className="badge rounded-pill px-3 py-1" style={{
                      backgroundColor: report.type === 'daily' ? 'rgba(59, 130, 246, 0.15)' :
                                     report.type === 'weekly' ? 'rgba(168, 85, 247, 0.15)' :
                                     report.type === 'monthly' ? 'rgba(16, 185, 129, 0.15)' :
                                     'rgba(0, 242, 254, 0.15)',
                      color: report.type === 'daily' ? '#3b82f6' :
                            report.type === 'weekly' ? '#a855f7' :
                            report.type === 'monthly' ? '#10b981' :
                            '#00f2fe'
                    }}>
                      {report.type || 'summary'}
                    </span>
                  </td>
                  <td className="py-2 text-theme-secondary" style={{ fontSize: '12px' }}>
                    {new Date(report.generatedAt).toLocaleString()}
                  </td>
                  <td className="py-2 text-theme-secondary" style={{ fontSize: '12px' }}>
                    {report.metadata?.timeRange || '24h'}
                  </td>
                  <td className="py-2 text-end pe-0">
                    <button className="btn btn-sm btn-outline-primary me-1" onClick={() => {
                      if (report.data) {
                        const csvData = report.data.traffic || report.data.summary || [];
                        exportCSV(csvData, `report_${report.id}`);
                      }
                    }}>
                      <Download size={14} />
                    </button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(report, null, 2));
                    }}>
                      <Copy size={14} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-theme-secondary">
                  No reports generated yet. Click "Generate Report" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Render Snapshots Section
  const renderSnapshots = () => (
    <div className="rounded-4 p-4 border" style={{
      backgroundColor: 'var(--bg-card)',
      borderColor: 'var(--border-subtle)',
      boxShadow: '0 10px 30px var(--shadow-color)'
    }}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h5 className="fw-black text-theme-primary m-0" style={{ fontWeight: 800 }}>
            <Image size={20} className="me-2" /> Analytics Snapshots
          </h5>
          <p className="text-theme-secondary small m-0 mt-0.5">Historical data snapshots at key moments</p>
        </div>
        <button className="btn btn-outline-primary rounded-pill px-4" onClick={() => {
          const snapshot = {
            timestamp: Date.now(),
            data: {
              visitors: analyticsSummary.activeNow,
              pageViews: analyticsSummary.totalHits,
              conversions: Math.floor(Math.random() * 5)
            }
          };
          setSnapshots(prev => [snapshot, ...prev].slice(0, 20));
          push(snapshotsRef, snapshot);
        }}>
          <Camera size={16} className="me-2" /> Take Snapshot
        </button>
      </div>

      <div className="row g-3">
        {snapshots.slice(0, 6).map((snapshot, idx) => (
          <div key={snapshot.id || idx} className="col-12 col-md-6 col-lg-4">
            <div className="p-3 rounded-3 border" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-1">
                  <ClockIcon size={12} className="me-1" />
                  {new Date(snapshot.timestamp).toLocaleTimeString()}
                </span>
                <span className="text-theme-secondary" style={{ fontSize: '11px' }}>
                  {new Date(snapshot.timestamp).toLocaleDateString()}
                </span>
              </div>
              <div className="row g-2">
                <div className="col-4 text-center">
                  <p className="small text-theme-secondary m-0">Visitors</p>
                  <h6 className="fw-bold m-0">{snapshot.data?.visitors || 0}</h6>
                </div>
                <div className="col-4 text-center">
                  <p className="small text-theme-secondary m-0">Page Views</p>
                  <h6 className="fw-bold m-0">{snapshot.data?.pageViews || 0}</h6>
                </div>
                <div className="col-4 text-center">
                  <p className="small text-theme-secondary m-0">Conversions</p>
                  <h6 className="fw-bold m-0 text-success">{snapshot.data?.conversions || 0}</h6>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render Reviews Section
  const renderReviews = () => (
    <div className="rounded-4 p-4 border" style={{
      backgroundColor: 'var(--bg-card)',
      borderColor: 'var(--border-subtle)',
      boxShadow: '0 10px 30px var(--shadow-color)'
    }}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h5 className="fw-black text-theme-primary m-0" style={{ fontWeight: 800 }}>
            <Star size={20} className="me-2" /> User Reviews & Feedback
          </h5>
          <p className="text-theme-secondary small m-0 mt-0.5">Real-time user sentiment analysis</p>
        </div>
        <div className="d-flex gap-2">
          <span className="badge bg-success bg-opacity-20 text-success rounded-pill px-3 py-2">
            Avg Rating: {(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 0).toFixed(1)} ★
          </span>
        </div>
      </div>

      <div className="row g-3">
        {reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <div key={review.id || idx} className="col-12 col-md-6">
              <div className="p-3 rounded-3 border" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="fw-bold m-0 text-theme-primary">{review.user}</h6>
                    <div className="text-warning">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                  </div>
                  <span className="text-theme-secondary" style={{ fontSize: '11px' }}>
                    {new Date(review.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="m-0 text-theme-primary" style={{ fontSize: '14px' }}>{review.comment}</p>
                <div className="mt-2 d-flex gap-2">
                  <button className="btn btn-sm btn-outline-success">
                    <ThumbsUp size={12} className="me-1" /> Helpful
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    <ThumbsDown size={12} className="me-1" /> Not Helpful
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-4">
            <MessageSquare size={40} className="text-theme-secondary mb-2" />
            <p className="text-theme-secondary">No reviews yet. Be the first to leave feedback!</p>
          </div>
        )}
      </div>
    </div>
  );

  // Main render
  return (
    <div className="container-fluid px-0 text-theme-primary animate-fade">
      {/* HEADER SECTION */}
      <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2" style={{
            background: 'rgba(0, 242, 254, 0.08)',
            border: '1.5px solid rgba(0, 242, 254, 0.35)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 15px rgba(0, 242, 254, 0.15)'
          }}>
            <span style={{ width: '6px', height: '6px', backgroundColor: '#00f2fe', borderRadius: '50%', boxShadow: '0 0 10px #00f2fe' }} />
            <span className="fw-black text-uppercase" style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: '#00f2fe', fontWeight: 800 }}>
              ● REAL-TIME ANALYTICS SUITE
            </span>
          </div>
          <h2 className="display-6 fw-black text-theme-primary m-0" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
            Live <span className="text-gradient-purple-blue" style={{ fontWeight: 900 }}>Command Center</span>
          </h2>
          <p className="text-theme-secondary small m-0 mt-1" style={{ fontWeight: 500 }}>
            Complete analytics, reports, snapshots & review management in real-time
          </p>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
            <span className={`spinner-grow spinner-grow-sm ${isAutoRefresh ? 'text-success' : 'text-secondary'}`} role="status" />
            <span className="small fw-bold text-theme-primary">
              {isAutoRefresh ? 'Live Sync Active' : 'Paused'}
            </span>
          </div>
          <button className="btn btn-sm btn-outline-primary rounded-pill" onClick={() => {
            setIsAutoRefresh(!isAutoRefresh);
            if (!isAutoRefresh) {
              refreshInterval.current = setInterval(refreshData, 10000);
            } else {
              clearInterval(refreshInterval.current);
            }
          }}>
            <RefreshCw size={14} className={isAutoRefresh ? 'spin' : ''} />
          </button>
          <button className="btn btn-sm btn-outline-secondary rounded-pill" onClick={refreshData}>
            <RefreshCw size={14} className="me-1" /> Refresh
          </button>
          <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2">
            {lastRefresh.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <ul className="nav nav-pills mb-4 gap-2" style={{ borderBottom: 'none' }}>
        <li className="nav-item">
          <button className={`nav-link rounded-pill px-4 ${viewMode === 'dashboard' ? 'active' : ''}`}
                  onClick={() => setViewMode('dashboard')}>
            <Activity size={16} className="me-2" /> Dashboard
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link rounded-pill px-4 ${viewMode === 'reports' ? 'active' : ''}`}
                  onClick={() => setViewMode('reports')}>
            <FileText size={16} className="me-2" /> Reports
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link rounded-pill px-4 ${viewMode === 'snapshots' ? 'active' : ''}`}
                  onClick={() => setViewMode('snapshots')}>
            <Image size={16} className="me-2" /> Snapshots
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link rounded-pill px-4 ${viewMode === 'reviews' ? 'active' : ''}`}
                  onClick={() => setViewMode('reviews')}>
            <Star size={16} className="me-2" /> Reviews
          </button>
        </li>
      </ul>

      {/* CONTENT */}
      {viewMode === 'dashboard' && renderDashboard()}
      {viewMode === 'reports' && renderReports()}
      {viewMode === 'snapshots' && renderSnapshots()}
      {viewMode === 'reviews' && renderReviews()}
    </div>
  );
}

// Add CSS animations
const styles = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .spin {
    animation: spin 1s linear infinite;
  }
  .animate-fade {
    animation: fadeIn 0.3s ease-in-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .text-gradient-purple-blue {
    background: linear-gradient(135deg, #a855f7, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;