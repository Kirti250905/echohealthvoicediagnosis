// src/pages/Landing.jsx
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  FiMic, FiMusic, FiZap, FiBookOpen, FiHash, FiRepeat,
  FiClipboard, FiCheck, FiUsers, FiTrendingUp, FiMapPin,
  FiChevronDown
} from 'react-icons/fi';
import {
  FaFacebook, FaInstagram, FaTwitter, FaYoutube,
  FaAppStoreIos, FaGooglePlay
} from 'react-icons/fa';
import { ReactMic } from 'react-mic';

import Navbar from '../components/Navbar';
import HeroVideo from '../assets/hero-video.mp4';
import Wqr from '../assets/wqr.png';
import EchoLogo from '../assets/logoechohealth.png';

export default function Landing() {
  const { loginWithRedirect } = useAuth0();
  const [copied, setCopied] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [recording, setRecording] = useState(false);
  const smsCode = 'join put-rice';
  const whatsappNumber = '+14155238886';

  const handleCopy = () => {
    navigator.clipboard.writeText(smsCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    { title: 'Voice Analysis', Icon: FiMic },
    { title: 'Early Intervention', Icon: FiMusic },
    { title: 'Exercises Recommendation', Icon: FiZap },
    { title: 'RAG Based Chatbot', Icon: FiBookOpen },
    { title: 'Telehealth Ready', Icon: FiHash },
    { title: 'Seek Medical Help', Icon: FiRepeat },
  ];

  const faqs = [
    { question: 'What is EchoHealth based on?', answer: 'EchoHealth uses ML models to analyze acoustic features and detect disorders early.' },
    { question: 'How do I start voice analysis?', answer: 'Click “Start Your Voice Journey”, record your sample, and view results instantly.' },
    { question: 'Is my data secure?', answer: 'All recordings are encrypted in transit and at rest; only you can access them.' },
    { question: 'Can I download reports?', answer: 'Yes—you can instantly generate and download your PDF report via WhatsApp or QR.' },
  ];

  const onStop = (recordedBlob) => {
    console.log('Recorded Blob: ', recordedBlob);
    // Here you can handle the recordedBlob, e.g., send it to a server or process it
  };

  return (
    <div className="w-full overflow-x-hidden overflow-y-auto text-gray-800">
     {/* Hero Section */}
<section className="relative min-h-screen bg-gradient-to-br from-purple-800 to-orange-400 overflow-hidden">
  <div className="absolute inset-0 bg-black/30" />
  <Navbar />
  
  <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-screen px-8 lg:px-20 py-16 text-white">
    
    {/* Text Block */}
    <div className="max-w-2xl space-y-8 leading-[1.2]">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight whitespace-normal leading-none">
        Empowering Your Vocal Health With Advanced
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
          AI‑Driven Diagnosis
        </span>
      </h1>
      <p className="text-lg lg:text-xl text-white/90">
        EchoHealth leverages cutting‑edge AI to analyze your voice,
        detect disorders early, and guide your vocal recovery journey.
      </p>
      <button
        onClick={() => loginWithRedirect()}
        className="mt-4 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition"
      >
        Start Your Voice Journey
      </button>
    </div>

    {/* Video Block */}
    <div className="mt-12 lg:mt-0 lg:ml-16 w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/20 bg-black">
      <video
        src={HeroVideo}
        className="w-full h-full object-cover"
        controls autoPlay loop muted playsInline
      />
    </div>

  </div>
</section>
      {/* Features Section */}
      <section className="py-20 bg-gray-50 relative">
        <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-30 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full opacity-20 transform translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 border-2 border-cyan-400 rounded-3xl p-10 bg-white shadow-lg">
          <h2 className="text-3xl font-extrabold text-center mb-4">Let EchoHealth help you</h2>
          <p className="text-center text-gray-600 mb-8">
            A comprehensive AI‑powered platform to analyze, monitor, and improve your vocal health — instantly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ title, Icon }, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center space-y-4 bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition"
              >
                <div className="p-4 bg-gradient-to-br from-cyan-300 to-blue-300 rounded-full text-white">
                  <Icon size={28} />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QR Section */}
      <section className="py-20 bg-gray-50 relative">
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-cyan-300 to-blue-300 rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 transform translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 border-2 border-cyan-400 rounded-3xl p-10 bg-white shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Get Reports Instantly</h2>
            <p className="text-gray-600 text-lg">
              Generate comprehensive reports and act immediately on your voice health.
            </p>
            <div className="flex max-w-md w-full">
              <input
                type="text"
                readOnly
                value={smsCode}
                className="flex-1 bg-white border border-gray-300 rounded-l-lg px-5 py-3 focus:outline-none text-gray-800"
              />
              <button
                onClick={handleCopy}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-r-lg flex items-center justify-center"
              >
                {copied ? <FiCheck size={20} /> : <FiClipboard size={20} />}
              </button>
            </div>
            <a
              href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(smsCode)}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-block text-blue-600 font-medium hover:underline"
            >
              Chat on WhatsApp &rarr;
            </a>
          </div>
          <div className="flex justify-center">
            <img
              src={Wqr}
              alt="EchoHealth WhatsApp QR"
              className="w-64 h-64 rounded-2xl shadow hover:shadow-md transition-transform hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="py-20 bg-gray-50 relative">
        <div className="absolute top-0 left-0 w-36 h-36 bg-gradient-to-br from-green-300 to-teal-400 rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-44 h-44 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full opacity-20 transform translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 border-2 border-cyan-400 rounded-3xl p-10 bg-white shadow-lg">
          <h2 className="text-3xl font-extrabold text-center mb-4">Our Impact</h2>
          <p className="text-center text-gray-600 mb-12">
            Empowering voices around the world—with data, AI, and real‑world care.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FiUsers, value: '10K+', label: 'Users Served' },
              { icon: FiMic, value: '50K+', label: 'Analyses Completed' },
              { icon: FiTrendingUp, value: '85%', label: 'Avg. Improvement Rate' },
              { icon: FiMapPin, value: '25', label: 'Countries Reached' },
            ].map(({ icon: Icon, value, label }, i) => (
              <div key={i} className="flex flex-col items-center space-y-2">
                <div className="p-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full text-white">
                  <Icon size={28} />
                </div>
                <span className="text-3xl font-extrabold">{value}</span>
                <span className="text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 mb-10">
            Your most common questions about EchoHealth, answered.
          </p>
          {faqs.map((faq, idx) => (
            <div key={idx} className="mb-4 border rounded-xl overflow-hidden">
              <button
                className="w-full px-6 py-4 bg-white text-left flex justify-between items-center"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <span className="font-medium">{faq.question}</span>
                <FiChevronDown
                  className={`transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-6 py-3 bg-gray-100 text-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="space-y-4">
            <img src={EchoLogo} alt="EchoHealth Logo" className="w-40 h-auto" />
            <div className="flex space-x-4">
              <FaAppStoreIos size={32} className="text-white hover:text-gray-100" />
              <FaGooglePlay size={32} className="text-white hover:text-gray-100" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">For Individuals</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Subscriptions</a></li>
              <li><a href="#" className="hover:underline">Gift a Plan</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">For Organizations</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Schools</a></li>
              <li><a href="#" className="hover:underline">Companies</a></li>
              <li><a href="#" className="hover:underline">API Access</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Company</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Help</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">FAQs</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">Activate Code</a></li>
              <li><a href="#" className="hover:underline">Redeem Code</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-4">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} EchoHealth. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <FaFacebook size={20} />
              <FaInstagram size={20} />
              <FaTwitter size={20} />
              <FaYoutube size={20} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
