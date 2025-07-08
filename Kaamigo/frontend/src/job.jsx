import React, { useState, useEffect, useMemo } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  FaVideo,
  FaBriefcase,
  FaUserAlt,
  FaCrown,
  FaQuestion,
  FaRocket,
  FaMicrophone,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import PostGigModal from "./postgig";

/* ── helper to detect SpeechRecognition ── */
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition || null;

export default function Jobs() {
  /* ───────── state ───────── */
  const [showModal, setShowModal] = useState(false);

  /* lock scroll while modal open */
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showModal]);

  /* demo gigs data */
  const [gigs] = useState(
    Array(12)
      .fill()
      .map((_, i) => ({
        id: i,
        title: `Job Title #${i + 1}`,
        location: "XYZ",
        budgetMin: "XX",
        budgetMax: "YY",
        jobType: "Contract",
        description: "Brief description of the job role and requirements.",
        postedAt: "3 days ago",
      }))
  );

  /* ───────── search state ───────── */
  const [query, setQuery] = useState("");
  const handleTextSearch = (e) => setQuery(e.target.value);

  /* voice search */
  const [listening, setListening] = useState(false);
  const hasMic = Boolean(SpeechRecognition);

  const startVoiceSearch = () => {
    if (!hasMic) return;
    const recog = new SpeechRecognition();
    recog.lang = "en-US";
    recog.interimResults = false;
    recog.onstart = () => setListening(true);
    recog.onerror = () => setListening(false);
    recog.onend = () => setListening(false);
    recog.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setQuery(transcript);
    };
    recog.start();
  };

  /* filter gigs memoized */
  const filteredGigs = useMemo(() => {
    if (!query.trim()) return gigs;
    return gigs.filter((g) =>
      g.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, gigs]);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-50 to-orange-100 font-[Inter]">
      {/* ───────── Sidebar ───────── */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r shadow-xl p-6 space-y-6 rounded-r-xl">
        <h2 className="text-2xl font-extrabold text-purple-700 mb-6">📍 Kaamigo</h2>
        <nav className="space-y-3">
          {[
            { label: "Explore", path: "/explore", icon: <LuLayoutDashboard /> },
            { label: "Reels", path: "/explore/reels", icon: <FaVideo /> },
            { label: "Jobs", path: "/explore/jobs", icon: <FaBriefcase /> },
            { label: "Profile", path: "/explore/profile", icon: <FaUserAlt /> },
            { label: "Features", path: "/explore/features", icon: <FaRocket /> },
            { label: "How it Works", path: "/explore/how-it-works", icon: <FaQuestion /> },
            { label: "Premium", path: "/explore/featurebtn", icon: <FaCrown /> },
          ].map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-300 shadow-sm ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-purple-100 hover:text-purple-800"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ───────── Main content ───────── */}
      <main className="flex-1 p-6 space-y-10">
        {/* header */}
        <div className="flex flex-wrap lg:justify-between gap-2 mb-8">
          <h2 className="text-3xl font-bold text-orange-500">Jobs Board</h2>

          <div className="flex gap-2">
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-gradient-to-r from-orange-500 to-yellow-500">
              Browse Jobs
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="bg-white text-orange-600 px-4 py-2 border border-orange-500 rounded-lg hover:bg-gradient-to-r from-orange-500 to-yellow-500 hover:text-white"
            >
              Post a Gig
            </button>
          </div>
        </div>

        {/* search + filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative w-full lg:w-1/3">
            <input
              type="text"
              value={query}
              onChange={handleTextSearch}
              placeholder="Search by title or keyword..."
              className="px-4 py-5 pr-10 border rounded-full w-full"
            />
            {hasMic && (
              <button
                type="button"
                onClick={startVoiceSearch}
                aria-label="voice search"
                className={`absolute right-6 top-1/2 -translate-y-1/2 text-purple-600 ${
                  listening ? "animate-pulse" : ""
                }`}
              >
                <FaMicrophone size={25} />
              </button>
            )}
          </div>

          {/* (filters left as placeholders) */}
          <div className="flex flex-wrap border-y p-3 gap-2 w-full lg:w-2/3">
            <select className="flex-1 min-w-[120px] px-4 py-2 border rounded-lg">
              <option>Category</option>
            </select>
            <select className="flex-1 min-w-[120px] px-4 py-2 border rounded-lg">
              <option>Budget</option>
            </select>
            <select className="flex-1 min-w-[120px] px-4 py-2 border rounded-lg">
              <option>Location</option>
            </select>
            <select className="flex-1 min-w-[120px] px-4 py-2 bg-gray-50 border rounded-lg">
              <option>Job Type</option>
            </select>
          </div>
        </div>

        {/* job cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGigs.map((gig) => (
            <div
              key={gig.id}
              className="bg-white p-7 shadow-lg rounded-lg space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Company logo"
                    className="w-12 h-12 rounded-full"
                  />
                  <h3 className="font-semibold text-lg">{gig.title}</h3>
                  <p className="text-purple-600 font-bold">
                    ${gig.budgetMin} – ${gig.budgetMax}
                  </p>
                </div>
                <p className="text-sm text-orange-500">{gig.jobType}</p>
                <p className="text-sm text-orange-500">
                  Location: {gig.location}
                </p>
                <p className="text-sm text-gray-700 mt-2">{gig.description}</p>
              </div>
              <div className="flex justify-between items-center pt-2">
                <p className="text-sm text-gray-400">{gig.postedAt}</p>
                <button className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
          {filteredGigs.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No gigs match “{query}”
            </p>
          )}
        </div>

        {/* subscribe box */}
        <div className="mt-12 bg-gradient-to-r from-indigo-100 via-purple-100 to-violet-200 p-6 rounded-lg text-center shadow">
          <h3 className="font-bold text-lg mb-2">Kaamigo</h3>
          <p className="text-sm text-gray-600 mb-4">Stay up to date</p>
          <div className="flex justify-center gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 border rounded-l-lg"
            />
            <button className="bg-orange-600 text-white px-4 py-2 rounded-r-lg hover:bg-gradient-to-r from-orange-500 to-yellow-500">
              Subscribe
            </button>
          </div>
        </div>

        {/* scroll to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-4 right-4 bg-orange-600 text-white px-3 py-2 rounded-full shadow hover:bg-gradient-to-r from-orange-400 to-yellow-500 transition duration-300"
        >
          Go Back
        </button>

        {/* modal */}
        <PostGigModal open={showModal} onClose={() => setShowModal(false)} />
      </main>
    </div>
  );
}
