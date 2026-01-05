import { useState } from "react";
import api from "../../services/api";

export default function CreateEmployeeModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    designation: "",
    salary: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= Field-wise Validation ================= */
  const handleChange = (e) => {
    let { name, value } = e.target;

    switch (name) {
      case "name":
      case "department":
      case "designation":
        value = value.replace(/[^a-zA-Z\s]/g, "").slice(0, 50);
        break;

      case "email":
        value = value.trim();
        break;

      case "salary":
        value = value.replace(/\D/g, "");
        break;

      default:
        break;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= Submit Validation ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 🔴 Empty field check
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.department ||
      !form.designation ||
      !form.salary
    ) {
      setError("Please fill in all fields");
      return;
    }

    // 🔴 Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Enter a valid email address");
      return;
    }

    // 🔴 Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(form.password)) {
      setError(
        "Password must be at least 8 characters with uppercase, lowercase, and number"
      );
      return;
    }

    // 🔴 Salary validation
    if (Number(form.salary) <= 0) {
      setError("Salary must be greater than zero");
      return;
    }

    try {
      setLoading(true);
      await api.post("/admin/employees", {
        ...form,
        salary: Number(form.salary)
      });

      onSuccess("Employee created successfully");
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to create employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Create Employee</h3>

        <form onSubmit={handleSubmit} className="form">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
          />

          <input
            name="designation"
            placeholder="Designation"
            value={form.designation}
            onChange={handleChange}
          />

          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={form.salary}
            onChange={handleChange}
          />

          {error && <p className="error">{error}</p>}

          <div className="modal-actions">
            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </button>
            <button
              type="button"
              className="secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
