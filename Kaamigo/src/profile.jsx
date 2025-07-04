import React, { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaVideo, FaBriefcase, FaUserAlt, FaCrown, FaQuestion, FaRocket } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Profile() {
  const [isBooked, setIsBooked] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const handleBook = () => {
    setIsBooked(true);
    alert("Session booked with Sarah!");
  };

  const handleMessage = () => {
    setMessageSent(true);
    alert("Message sent to Sarah!");
  };

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

      {/* Profile Main Content */}
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-10 rounded-lg shadow text-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlNt7Tl2jtLg7G15M-uMxtcPRwp6xW-xSJow&s"
              alt="Profile"
              className="w-24 h-24 mx-auto rounded-full mb-6 object-cover shadow-lg"
            />
            <h2 className="font-bold text-lg p-1 text-orange-500">Sarah Chen</h2>
            <p className="text-sm text-gray-600 p-1">Graphic Designer</p>
            <div className="flex justify-center gap-5 mt-2 text-sm text-gray-500">
              <div>
                <span className="block font-bold text-black">4.9</span>Rating
              </div>
              <div>
                <span className="block font-bold text-black">1200</span>Reviews
              </div>
              <div>
                <span className="block font-bold text-black">77</span>Projects
              </div>
            </div>
            <button
              onClick={handleBook}
              className="mt-4 bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-600"
            >
              {isBooked ? "Booked!" : "Book Session"}
            </button>
            <button
              onClick={handleMessage}
              className="mt-2 border px-6 py-3 rounded text-purple-500 hover:bg-purple-100"
            >
              {messageSent ? "Message Sent" : "Send Message"}
            </button>
          </div>

          <div className="bg-white p-10 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Verification Status</h3>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>✔️ Govt ID – Verified</li>
              <li>✔️ Phone – Verified</li>
              <li>✔️ Email – Verified</li>
              <li>❌ Address – Not Verified</li>
              <li>❌ PAN/SSN – Not Verified</li>
            </ul>
          </div>
        </div>

        {/* Profile Info Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h2 className="text-xl font-bold">About Me</h2>
            <p className="text-gray-700 text-sm">
              Hi, I’m Sarah, a passionate and experienced graphic designer with
              specialization in Figma, Adobe Creative Suite, Sketch. Fluent in
              English & Mandarin. 7 yrs of experience in branding, UI/UX design,
              and digital marketing.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {Array(6).fill().map((_, i) => (
                <h3 key={i} className="text-sm text-gray-600">
                  🔹 Specialization <span className="text-purple-600 ml-2">Design & Branding</span>
                </h3>
              ))}
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Featured Reel</h3>
              <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                🎞️ Featured Video
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold mb-4 text-lg">My Services</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 text-sm">
              {["Logo Design & Branding", "UI/UX Design", "Marketing Collateral", "Illustration & Iconography"].map(title => (
                <div key={title} className="border p-6 rounded-lg text-center bg-white shadow">
                  <h4 className="font-semibold text-sm mb-1">{title}</h4>
                  <p className="text-xs text-gray-600">Detailed service description goes here.</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold mb-4 text-lg">Portfolio</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
              {Array(8).fill().map((_, i) => (
                <div key={i} className="bg-gray-100 h-32 rounded flex items-center justify-center text-sm text-gray-500">
                  Project {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-10 rounded-lg shadow">
            <h3 className="font-bold mb-4 text-lg">What Clients Say</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {["Alice Johnson", "Bob Williams"].map((client, i) => (
                <div key={client} className="border p-6 rounded space-y-2">
                  <p>
                    {i === 0
                      ? "Sarah redesigned our company logo and exceeded expectations. Highly recommended!"
                      : "Working with Sarah on branding was seamless. Clear communication and great outcomes."}
                  </p>
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlNt7Tl2jtLg7G15M-uMxtcPRwp6xW-xSJow&s"
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <p className="text-gray-500 text-xs">– {client}, Oct 2023</p>
                  </div>
                </div>
              ))}
            </div>
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
