// ApplyGigModal.jsx
import { useState } from "react";

export default function ApplyGigModal({ open, onClose, jobTitle }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const inputBox =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-400";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Application submitted!\n\n${JSON.stringify(form, null, 2)}`);
    onClose(); // close modal
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-purple-600 mb-4">
          Apply for: {jobTitle}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className={inputBox}
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className={inputBox}
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className={inputBox}
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <textarea
            className={`${inputBox} resize-none`}
            name="message"
            rows={3}
            placeholder="Your message"
            value={form.message}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
