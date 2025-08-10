import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axiosInstance from "../../Lib/axios";

const Overview = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalEnrollments: 0,
    popularCourses: [],
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data } = await axiosInstance.get("/dashboard-stats");
        console.log("Dashboard API response:", data);

        setStats({
          totalCourses: data.totalCourses || 0,
          totalEnrollments: data.totalEnrollments || 0,
          popularCourses: data.popularCourses || [],
        });
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      }
    }
    fetchStats();
  }, []);

  // Dataset for totals chart
  const totalsData = [
    { name: "Total Courses", value: stats.totalCourses, color: "#10b981" }, // green
    { name: "Total Enrollments", value: stats.totalEnrollments, color: "#f59e0b" }, // amber
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard!</h1>

      {/* Totals Chart */}
      <h2 className="text-xl font-semibold mb-2">Overall Totals</h2>
      <div style={{ width: "100%", minHeight: "150px" }}>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart
            data={totalsData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={200} />
            <Tooltip />
            <Bar dataKey="value" fill="#10b981">
              {totalsData.map((entry, index) => (
                <cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Popular Courses Chart */}
      <h2 className="text-xl font-semibold mb-2 mt-6">Most Popular Courses</h2>
      <div style={{ width: "100%", minHeight: "300px" }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={stats.popularCourses}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" />
            <YAxis type="category" dataKey="title" width={200} />
            <Tooltip />
            <Bar dataKey="enrollmentCount" fill="#4f46e5" /> {/* purple */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Overview;
