import React, { useState, useRef } from 'react';
import { ReactMic } from 'react-mic';
import {
  FiUpload,
  FiStopCircle,
  FiPlayCircle,
  FiDownloadCloud
} from 'react-icons/fi';
import { PulseLoader } from 'react-spinners';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';

export default function Diagnosis() {
  const [file, setFile] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState(null);
  const audioRef = useRef();

  const onStop = ({ blob, blobURL }) => {
    const f = new File([blob], 'recording.wav', { type: 'audio/wav' });
    setFile(f);
    setAudioURL(blobURL);
    setMeta(null);
  };

  const handleUpload = e => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setAudioURL(URL.createObjectURL(f));
    setMeta(null);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying(!playing);
  };

  const analyze = async () => {
    if (!file) return alert('Please upload or record audio first.');
    setLoading(true);
    setMeta(null);

    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch(`${BACKEND}/predict_meta/`, {
        method: 'POST',
        body: form
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const json = await res.json();
      setMeta(json);

      // Save to localStorage for Dashboard
      window.localStorage.setItem('latestReadings', JSON.stringify(json.acoustic_readings));
      window.localStorage.setItem('latestToken', json.token);
    } catch (e) {
      console.error(e);
      alert('Analysis failed. Check backend.');
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    const token = window.localStorage.getItem('latestToken');
    if (!token) return;
    window.open(`${BACKEND}/predict_report/${token}`, '_blank');
  };

  const truncate = (s, n = 300) =>
    s.length > n ? s.slice(0, n) + '...' : s;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Voice Diagnosis</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2 bg-white p-6 rounded-xl border-2 border-blue-300 space-y-4">
          <label className="cursor-pointer flex flex-col items-center space-y-2">
            <FiUpload size={32} className="text-blue-500" />
            <span>Upload Recording</span>
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleUpload}
            />
          </label>

          <div className="flex items-center text-gray-400">
            <hr className="flex-1" />
            <span className="px-2">OR</span>
            <hr className="flex-1" />
          </div>

          <ReactMic
            record={recording}
            className="w-full h-32"
            strokeColor="#0ea5e9"
            backgroundColor="#f1f5f9"
            onStop={onStop}
            mimeType="audio/wav"
          />

          <div className="flex justify-center">
            <button
              onClick={() => {
                setRecording(!recording);
                setAudioURL(null);
                setMeta(null);
              }}
              className={`px-6 py-2 rounded-full text-white font-semibold ${
                recording ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {recording ? 'Stop Recording' : 'Start Recording'}
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">About Voice Analysis</h2>
          <p className="text-gray-600 mb-4">
            Our AI analyzes your voice for potential pathologies based on acoustic metrics.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
            <li>Quiet environment</li>
            <li>Maintain 6–8 inches from the mic</li>
            <li>Speak at a normal volume & pace</li>
            <li>Record continuously for 10–30 seconds</li>
          </ul>
          <div className="bg-blue-100 p-3 rounded text-sm text-gray-800">
            <strong>Hindi:</strong> "नील कमल गहरे पानी में खिलता है..."<br />
            <strong>English:</strong> “The farmer sowed seeds in the fields with care and patience.”
          </div>
        </div>
      </div>

      {audioURL && (
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h3 className="font-medium mb-2">Preview</h3>
          <audio
            ref={audioRef}
            src={audioURL}
            className="w-full"
            controls
            onEnded={() => setPlaying(false)}
          />
          <button
            onClick={togglePlay}
            className="mt-2 text-blue-600 hover:underline flex items-center"
          >
            {playing ? <FiStopCircle /> : <FiPlayCircle />}
            <span className="ml-1">{playing ? 'Pause' : 'Play'}</span>
          </button>
        </div>
      )}

    
      <div className="flex justify-center mb-8">
        <button
          onClick={analyze}
          disabled={loading || !file}
          className={`flex items-center px-6 py-3 bg-blue-600 text-white rounded-full ${
            loading ? 'bg-blue-400' : 'hover:bg-blue-700'
          }`}
        >
          {loading ? <PulseLoader size={8} color="#fff" /> : <FiDownloadCloud className="mr-2" />}
          <span>{loading ? 'Analyzing...' : 'Analyze Voice'}</span>
        </button>
      </div>

      {meta && (
        <div className="bg-white p-6 rounded-2xl shadow max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Results</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Summary</h3>
              <p className="bg-gray-100 p-4 rounded text-sm leading-relaxed">
                {truncate(meta.llm_diagnosis)}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Acoustic Metrics</h3>
              <ul className="bg-gray-100 p-4 rounded text-sm space-y-1">
                {Object.entries(meta.acoustic_readings).map(([k, v]) => (
                  k !== 'formants' && (
                    <li key={k}>
                      <strong>{k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}:</strong>{' '}
                      {typeof v === 'number' ? v.toFixed(2) : v}
                    </li>
                  )
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={downloadReport}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              <FiDownloadCloud className="mr-2" /> Download Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
