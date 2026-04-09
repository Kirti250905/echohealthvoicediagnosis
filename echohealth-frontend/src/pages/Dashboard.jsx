// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  FiRepeat, FiMusic, FiMic, FiDownloadCloud
} from 'react-icons/fi';

const COLORS = ['#2563EB', '#10B981', '#FBBF24'];

export default function Dashboard() {
  const [readings, setReadings] = useState(null);

  useEffect(() => {
    const stored = window.localStorage.getItem('latestReadings');
    if (stored) setReadings(JSON.parse(stored));
  }, []);

  // If no data yet, show a friendly placeholder
  if (!readings) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-800 to-orange-400 text-white p-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to EchoHealth</h1>
        <p className="text-lg mb-6">Upload and analyze your voice to see rich insights here.</p>
        <a
          href="/diagnosis"
          className="inline-flex items-center bg-white text-purple-800 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-2xl transition"
        >
          <FiMic size={20} className="mr-2" />
          Go to Voice Diagnosis
        </a>
      </div>
    );
  }

  // Prepare chart data
  const barData = [
    { name: 'Jitter', value: readings.jitter },
    { name: 'Shimmer', value: readings.shimmer },
    { name: 'HNR', value: readings.hnr },
    { name: 'Voiced Ratio', value: readings.voiced_ratio },
  ];
  const pieData = readings.formants
    ? [
        { name: 'F1', value: readings.formants.F1 },
        { name: 'F2', value: readings.formants.F2 },
        { name: 'F3', value: readings.formants.F3 },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* ===== Header ===== */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Hello, Kirti!</h1>
          <p className="text-gray-600">Here's your latest voice health snapshot.</p>
        </div>
        <button
          onClick={() => window.location.href = '/diagnosis'}
          className="mt-4 md:mt-0 inline-flex items-center bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
        >
          <FiDownloadCloud size={20} className="mr-2" />
          New Analysis
        </button>
      </header>

      {/* ===== Stat Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Jitter (%)', value: readings.jitter.toFixed(2), icon: <FiRepeat size={24} className="text-indigo-500" /> },
          { label: 'Shimmer (%)', value: readings.shimmer.toFixed(2), icon: <FiMusic size={24} className="text-green-500" /> },
          { label: 'HNR (dB)', value: readings.hnr.toFixed(2), icon: <FiMic size={24} className="text-yellow-500" /> },
          { label: 'Voiced Ratio (%)', value: readings.voiced_ratio.toFixed(2), icon: <FiRepeat size={24} className="text-pink-500" /> },
        ].map(({ label, value, icon }) => (
          <div key={label} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex items-center space-x-4">
            <div className="p-3 bg-indigo-50 rounded-full">
              {icon}
            </div>
            <div>
              <p className="text-gray-500">{label}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Quick Actions ===== */}
      <section className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Re-run Analysis', icon: <FiMic />, onClick: () => window.location.href = '/diagnosis' },
            { label: 'Download Report', icon: <FiDownloadCloud />, onClick: () => window.open(`${BACKEND}/predict_report/${window.localStorage.getItem('latestToken')}`, '_blank') },
            // Add more as needed...
          ].map(({ label, icon, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="text-blue-600 mb-2">{icon}</div>
              <span className="text-gray-700">{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ===== Charts Section ===== */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Voice Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        {pieData.length > 0 && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Formants Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    </div>
);
}
