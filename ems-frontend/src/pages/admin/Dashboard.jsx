
import "../../styles/base.css";
import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/layout.css";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
  api.get("/admin/dashboard")
    .then(res => setStats(res.data))
    .catch(err => {
      console.error("Dashboard API error:", err.response?.status);
    });
}, []);


  if (!stats) {
    return <p>Loading dashboard...</p>;
  }

  return (
  <section className="dashboard">
    <section className="bento-grid">
      
      <article className="stat-card">
        <div className="stat-header">
          <span className="stat-icon">👥</span>
          <p>Total Employees</p>
        </div>
        <h2>{stats.totalEmployees}</h2>
      </article>

      <article className="stat-card">
        <div className="stat-header">
          <span className="stat-icon">💰</span>
          <p>Total Salary</p>
        </div>
        <h2>₹{stats.totalSalary}</h2>
      </article>

      <article className="stat-card">
        <div className="stat-header">
          <span className="stat-icon">🏢</span>
          <p>Departments</p>
        </div>
        <h2>{Object.keys(stats.departmentWiseCount).length}</h2>
      </article>

      <article className="stat-card">
  <div className="stat-header">
    <span className="stat-icon">✅</span>
    <p>Active Employees</p>
  </div>
  <h2>{stats.activeEmployees}</h2>
</article>

<article className="stat-card">
  <div className="stat-header">
    <span className="stat-icon">⏸️</span>
    <p>Inactive Employees</p>
  </div>
  <h2>{stats.inactiveEmployees}</h2>
</article>


    </section>
  </section>
);

}
