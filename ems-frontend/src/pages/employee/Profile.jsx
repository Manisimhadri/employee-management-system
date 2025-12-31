import { useEffect, useState } from "react";
import api from "../../services/api";
import Toast from "../../components/ui/Toast";

export default function Profile() {
  const [personal, setPersonal] = useState({});
  const [form, setForm] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  const [job, setJob] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => { api.get("/employee/job-details") 
    .then(res => setJob(res.data)) .catch(() => showToast("Failed to load job details", "error")); }, []);

  useEffect(() => {
    api.get("/employee/personal-details")
      .then(res => {
        setPersonal(res.data);
        setForm(res.data);
      })
      .catch(() => showToast("Failed to load details", "error"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    try {
      await api.put("/employee/personal-details", form);
      setPersonal(form);
      setEditMode(false);
      showToast("Personal details updated successfully");
    } catch {
      showToast("Update failed", "error");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
  <section className="profile-page">

    {/* ===== Profile Header ===== */}
    <div className="profile-header">
      <h2>My Profile</h2>
      <p className="profile-subtitle">
        View and manage your personal information
      </p>
    </div>

    {/* ===== Job Details ===== */}
    {job && (
      <div className="profile-card">
        <h3>Job Details</h3>

        <div className="profile-row">
          <span>Name</span>
          <strong>{job.name}</strong>
        </div>

        <div className="profile-row">
          <span>Email</span>
          <strong>{job.email}</strong>
        </div>

        <div className="profile-row">
          <span>Department</span>
          <strong>{job.department}</strong>
        </div>

        <div className="profile-row">
          <span>Designation</span>
          <strong>{job.designation}</strong>
        </div>
      </div>
    )}

    {/* ===== Personal Details (READ MODE) ===== */}
    {!editMode && (
      <div className="profile-card">
        <h3>Personal Details</h3>

        <div className="profile-row">
          <span>Aadhar</span>
          <strong>{personal.aadharNumber || "—"}</strong>
        </div>

        <div className="profile-row">
          <span>Father Name</span>
          <strong>{personal.fatherName || "—"}</strong>
        </div>

        <div className="profile-row">
          <span>Mother Name</span>
          <strong>{personal.motherName || "—"}</strong>
        </div>

        <div className="profile-row">
          <span>Emergency Contact</span>
          <strong>{personal.emergencyContact || "—"}</strong>
        </div>

        <div className="profile-row">
          <span>Address</span>
          <strong>{personal.address || "—"}</strong>
        </div>

        <button
          className="btn-outline"
          onClick={() => setEditMode(true)}
        >
          Edit Personal Details
        </button>
      </div>
    )}

    {/* ===== Personal Details (EDIT MODE) ===== */}
    {editMode && (
      <div className="profile-card">
        <h3>Edit Personal Details</h3>

        <div className="form-grid">
          <input
            name="aadharNumber"
            value={form.aadharNumber || ""}
            onChange={handleChange}
            placeholder="Aadhar Number"
          />
          <input
            name="fatherName"
            value={form.fatherName || ""}
            onChange={handleChange}
            placeholder="Father Name"
          />
          <input
            name="motherName"
            value={form.motherName || ""}
            onChange={handleChange}
            placeholder="Mother Name"
          />
          <input
            name="emergencyContact"
            value={form.emergencyContact || ""}
            onChange={handleChange}
            placeholder="Emergency Contact"
          />
          <input
            name="address"
            value={form.address || ""}
            onChange={handleChange}
            placeholder="Address"
          />
        </div>

        <div className="actions">
          <button className="btn-primary" onClick={handleSave}>
            Save Changes
          </button>
          <button
            className="btn-secondary"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    )}

    {toast && <Toast {...toast} />}

  </section>
);

}
