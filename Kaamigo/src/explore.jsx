import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaVideo, FaBriefcase, FaUserAlt, FaCrown, FaQuestion, FaRocket } from "react-icons/fa";
import MapWithRadius from "./mapWithRedius";

export default function Explore() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50 flex font-[Inter]">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r shadow-xl p-6 space-y-6">
        <h2 className="text-2xl font-extrabold text-purple-700 tracking-wide">📍 Kaamigo</h2>
        <nav className="space-y-2">
          {[{ label: "Explore", path: "/explore", icon: <LuLayoutDashboard /> },
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
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  isActive ? "bg-purple-600 text-white shadow-lg" : "text-gray-700 hover:bg-purple-100 hover:text-purple-800"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Filters */}
          <aside className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Discover Freelancers</h2>
              <input
                type="text"
                placeholder="Search by name, skill..."
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-purple-500"
              />
              <button className="mt-3 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition">
                Apply Filters
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Filter Options</h2>
              <select className="w-full p-2 border rounded-lg text-sm">
                <option>Category</option>
              </select>
              <select className="w-full p-2 border rounded-lg text-sm">
                <option>Status</option>
              </select>
              <input
                type="text"
                placeholder="Location"
                className="w-full p-2 border rounded-lg text-sm"
              />
              <div>
                <label className="block text-sm font-medium mb-1">Rating</label>
                <input type="range" min="1" max="5" className="w-full accent-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price Range</label>
                <input type="range" min="0" max="500" className="w-full accent-orange-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Nearby Freelancers</h2>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-3" />
                  <div>
                    <p className="font-semibold text-sm">Name #{i + 1}</p>
                    <p className="text-sm text-gray-500">Web Designer</p>
                    <a href="#" className="text-sm text-purple-600 hover:underline">
                      View Profile
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Map Section */}
          <section className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Freelancers Around You (5km)</h2>
              <div className="h-[400px] rounded-lg overflow-hidden">
                <MapWithRadius />
              </div>
              <div className="text-center mt-4">
                <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                  View All Freelancers
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Featured Freelancers */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Featured Freelancers Nearby</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-md">
                <div className="h-24 bg-gray-200 rounded mb-2" />
                <p className="font-semibold text-sm">Freelancer #{i + 1}</p>
                <p className="text-xs text-gray-500">Web Developer</p>
                <a href="#" className="text-xs text-purple-600 hover:underline">
                  View Profile
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Back to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-4 right-4 bg-orange-600 text-white px-4 py-2 rounded-full shadow hover:bg-gradient-to-r from-orange-400 to-yellow-500 transition duration-300"
        >
          Go Back
        </button>
      </main>
    </div>
  );
}
