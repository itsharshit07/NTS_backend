import React, { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaVideo, FaBriefcase, FaUserAlt, FaCrown, FaQuestion, FaRocket } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Jobs() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-50 to-orange-100 font-[Inter]">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r shadow-xl p-6 space-y-6 rounded-r-xl">
        <h2 className="text-2xl font-extrabold text-purple-700 mb-6">📍 Kaamigo</h2>
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

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-10">
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-2 w-full lg:justify-between ">
            <h2 className="text-3xl font-bold text-orange-500">
              Jobs Board
            </h2>
            <div className="flex gap-2">
              <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-gradient-to-r from-orange-500 to-yellow-500">
                Browse Jobs
              </button>
              <button className="bg-white text-orange-600 px-4 py-2 border border-orange-500 rounded-lg hover:bg-gradient-to-r from-orange-500 to-yellow-500 hover:text-white">
                Post a Gig
              </button>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by title or keyword..."
              className="px-4 py-2 border rounded-full w-full lg:w-1/3"
            />
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(12)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="bg-white p-7 shadow-lg rounded-lg space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="Company Logo"
                      className="w-12 h-12 rounded-full"
                    />
                    <h3 className="font-semibold text-lg">
                      Job Title #{index + 1}
                    </h3>
                    <p className="text-purple-600 font-bold">$XX - $YY</p>
                  </div>
                  <p className="text-sm text-orange-500">Contract/Part Time</p>
                  <p className="text-sm text-orange-500">Location: XYZ</p>
                  <p className="text-sm text-gray-700 mt-2">
                    Brief description of the job role and requirements goes here.
                  </p>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <p className="text-sm text-gray-400">Posted 3 days ago</p>
                  <button className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
        </div>

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

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-4 right-4 bg-orange-600 text-white px-3 py-2 rounded-full shadow hover:bg-gradient-to-r from-orange-400 to-yellow-500 transition duration-300"
        >
          Go Back
        </button>
      </main>
    </div>
  );
}
