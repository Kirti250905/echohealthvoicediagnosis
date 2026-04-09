import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const tabs = [
  'All Exercises',
  'Breathing',
  'Warm-up',
  'Strengthening',
  'Clarity',
  'Resonance',
];

const videos = [
  {
    id: 'SEdCYhnStrk',
    title: 'Top Breathing Exercises to Improve Your Singing Voice',
    description: 'Dr. Dan’s best breathing drills for singers.',
    duration: '5:03',
    difficulty: 'All Levels',
    category: 'Breathing',
  },
  {
    id: '9-1Padxsmio',
    title: 'How To Warm Up Your Voice',
    description: 'Justin Stoney’s complete 5-minute warm-up routine.',
    duration: '5:10',
    difficulty: 'Beginner',
    category: 'Warm-up',
  },
  {
    id: 's6tefJAsskw',
    title: '10 Minute Vocal Strength Workout (No Talking)',
    description: 'A fun, tough routine to build vocal power.',
    duration: '10:00',
    difficulty: 'Intermediate',
    category: 'Strengthening',
  },
  {
    id: '6aBumRJqzMc',
    title: 'Clarity & Diction + Mouth Exercises',
    description: 'Drills to sharpen your articulation and projection.',
    duration: '4:20',
    difficulty: 'All Levels',
    category: 'Clarity',
  },
  {
    id: '9tIeMkEeJRo',
    title: 'Daily Vocal Resonance Exercises for Singers',
    description: 'Five resonance drills to make your tone shine.',
    duration: '3:45',
    difficulty: 'Beginner',
    category: 'Resonance',
  },
];

export default function Exercises() {
  const [activeTab, setActiveTab] = useState('All Exercises');
  const filtered = activeTab === 'All Exercises'
    ? videos
    : videos.filter(v => v.category === activeTab);

  return (
    <div className="flex min-h-screen bg-gray-50">


      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Voice Exercises</h1>
        <p className="text-gray-600 mb-6">
          Follow guided exercises to improve your vocal health and technique.
        </p>

        {/* Tabs */}
        <ul className="flex flex-wrap mb-6 space-x-3">
          {tabs.map(tab => (
            <li
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer px-4 py-2 rounded-full border text-sm font-medium transition 
                ${
                  tab === activeTab
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                }`}
            >
              {tab}
            </li>
          ))}
        </ul>

        {/* Videos */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((vid, i) => (
            <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative">
                <iframe
                  src={`https://www.youtube.com/embed/${vid.id}`}
                  title={vid.title}
                  className="w-full h-48"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-0.5 rounded">
                  {vid.duration}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{vid.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{vid.description}</p>
                <div className="mt-3 space-y-1 text-sm text-gray-500">
                  <div><strong>Difficulty:</strong> {vid.difficulty}</div>
                  <div><strong>Category:</strong> {vid.category}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
