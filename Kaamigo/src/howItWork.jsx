import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaVideo, FaBriefcase, FaUserAlt, FaCrown, FaQuestion, FaRocket } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function HowItWorks() {
  const navigate = useNavigate();
  const [ctaClicked, setCtaClicked] = useState(false);

  const handleExploreClick = () => {
    setCtaClicked(true);
    setTimeout(() => navigate("/explore"), 1000);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-orange-50 to-yellow-100 font-century-gothic">
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
      <main className="flex-1 p-6">
        {/* Top Banner */}
        <div className="bg-gradient-to-b from-yellow-100 to-orange-300 text-center py-10 px-4 rounded-lg mb-10">
          <h2 className="text-3xl font-bold">
            Discover How <span className="text-orange-600">Kaamigo</span> Connects You
          </h2>
          <p className="text-base text-gray-600 mt-2">
            Learn the simple, effective steps to find the perfect freelancer or land your next exciting gig.
          </p>
        </div>

        {/* For Freelancers */}
        <div className="mb-10">
          <h3 className="text-2xl text-purple-600 font-bold mb-8 text-center">
            For Freelancers
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                title: "Create Your Profile",
                desc: "Showcase your skills, experience, and portfolio to attract potential clients.",
                icon: "👤",
              },
              {
                title: "Record Short Reels",
                desc: "Capture attention with engaging video reels demonstrating your expertise and personality.",
                icon: "📹",
              },
              {
                title: "Get Discovered Locally",
                desc: "Appear on the map for nearby clients seeking your services, making connections easy.",
                icon: "📍",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-10 rounded-lg shadow text-center hover:shadow-md transition duration-300"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="font-semibold text-lg mb-2 text-orange-500">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* For Customers */}
        <div className="mb-10">
          <h3 className="text-2xl text-purple-600 font-bold mb-8 text-center">
            For Customers
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                title: "Find Nearby Talent",
                desc: "Browse the map or watch reels to discover skilled freelancers in your area.",
                icon: "🔍",
              },
              {
                title: "Connect & Chat",
                desc: "Directly message freelancers to discuss project details and get quotes.",
                icon: "💬",
              },
              {
                title: "Hire & Get Work Done",
                desc: "Securely hire the best fit for your needs and track job progress seamlessly.",
                icon: "📁",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-10 rounded-lg shadow text-center hover:shadow-md transition duration-300"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="font-semibold text-lg mb-2 text-orange-500">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Footer */}
        <div className="bg-gradient-to-r from-purple-100 to-purple-300 text-center py-10 px-4 rounded-lg">
          <h4 className="text-2xl text-purple-600 font-bold mb-4">
            Ready to Get Started?
          </h4>
          <p className="text-sm text-gray-700 mb-4">
            Join Kaamigo today and transform the way you work or find talent.
          </p>
          <button
            onClick={handleExploreClick}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
          >
            {ctaClicked ? "Redirecting..." : "Explore Opportunities"}
          </button>
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
