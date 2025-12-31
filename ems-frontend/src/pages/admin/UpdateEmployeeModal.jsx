import { useState } from "react";
import api from "../../services/api";

export default function UpdateEmployeeModal({ employee, onClose, onSuccess }) {
  const [form, setForm] = useState({
    department: employee.department || "",
    designation: employee.designation || "",
    salary: employee.salary || ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.put(`/admin/employees/${employee.id}`, {
        ...form,
        salary: Number(form.salary)
      });

      onSuccess("Employee updated successfully"); // refresh employees list
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to update employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Update Employee</h3>

        <form onSubmit={handleSubmit} className="form">
          <input
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            required
          />
          <input
            name="designation"
            placeholder="Designation"
            value={form.designation}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={form.salary}
            onChange={handleChange}
            required
          />

          {error && <p className="error">{error}</p>}

          <div className="modal-actions">
            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update"}
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
