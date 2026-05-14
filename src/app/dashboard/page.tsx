"use client";

import { useEffect, useState } from "react";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  businessType: string;
  message: string;
  status: string;
  autoReply: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch("/api/leads");
      const data = await response.json();

      setLeads(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6">
          Leads Dashboard
        </h1>

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6"
        />

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-black text-white">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Business</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Reply</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b"
                >
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">{lead.email}</td>
                  <td className="p-3">{lead.phone}</td>
                  <td className="p-3">{lead.businessType}</td>
                  <td className="p-3">
  <select
    value={lead.status}
    onChange={async (e) => {
      await fetch("/api/leads", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: lead.id,
          status: e.target.value,
        }),
      });

      fetchLeads();
    }}
    className="border p-2 rounded"
  >
    <option value="New">New</option>
    <option value="Contacted">Contacted</option>
    <option value="Closed">Closed</option>
  </select>
</td>
                  <td className="p-3">{lead.autoReply}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}