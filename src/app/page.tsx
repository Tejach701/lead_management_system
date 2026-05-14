"use client";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Lead submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          businessType: "",
          message: "",
        });
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
    setLoading(false);
  };
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 px-6 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT SIDE */}
          <div>
            <p className="text-blue-600 font-semibold uppercase tracking-widest mb-4">
              Smart Lead Tracking Platform
            </p>
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Grow Your Business
              <span className="block text-blue-600">
                With Better Lead Management
              </span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Capture leads, organize customer inquiries, manage statuses,
              and streamline communication from a modern dashboard.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-md border">
                <h2 className="text-3xl font-bold text-blue-600">
                  100+
                </h2>
                <p className="text-gray-600 mt-2">
                  Leads Managed
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-md border">
                <h2 className="text-3xl font-bold text-green-600">
                  Fast
                </h2>
                <p className="text-gray-600 mt-2">
                  Response Workflow
                </p>
              </div>
            </div>
          </div>
          {/* RIGHT SIDE FORM */}
          <div className="bg-white shadow-2xl rounded-3xl p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Submit a Lead
            </h2>
            <p className="text-gray-500 mb-8">
              Fill in the details below to create a new lead.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                 onChange={(e) =>
  setFormData({
    ...formData,
    email: e.target.value.toLowerCase(),
  })
}
                  className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Phone Number
                </label>
                <PhoneInput
  country={"in"}
  value={formData.phone}
  onChange={(phone) =>
    setFormData({
      ...formData,
      phone,
    })
  }
  inputStyle={{
    width: "100%",
    height: "56px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
  }}
  containerStyle={{
    width: "100%",
  }}
/>
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Business Type
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">
                    Select Business Type
                  </option>
                  <option value="IT">IT</option>
                  <option value="Retail">Retail</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                   <option value="others">Others</option>

                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded-xl h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-4 rounded-xl shadow-lg"
              >
                {loading ? "Submitting..." : "Submit Lead"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

