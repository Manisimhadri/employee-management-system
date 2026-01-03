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

  /* ===== Fetch Job Details ===== */
  useEffect(() => {
    api
      .get("/employee/job-details")
      .then((res) => setJob(res.data))
      .catch(() => showToast("Failed to load job details", "error"));
  }, []);

  /* ===== Fetch Personal Details ===== */
  useEffect(() => {
    api
      .get("/employee/personal-details")
      .then((res) => {
        setPersonal(res.data);
        setForm(res.data);
      })
      .catch(() => showToast("Failed to load details", "error"))
      .finally(() => setLoading(false));
  }, []);

  /* ===== Centralized Validation ===== */
  const handleChange = (e) => {
    let { name, value } = e.target;

    switch (name) {
      case "aadharNumber":
        value = value.replace(/\D/g, "").slice(0, 12);
        break;

      case "fatherName":
      case "motherName":
        value = value.replace(/[^a-zA-Z\s]/g, "").slice(0, 50);
        break;

      case "emergencyContact":
        value = value.replace(/\D/g, "").slice(0, 10);
        if (value.length === 1 && !/^[6-9]$/.test(value)) return;
        break;

      case "address":
        value = value.slice(0, 200);
        break;

      default:
        break;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ===== Save Validation ===== */
  const handleSave = async () => {
  // 🔴 Empty field validation
  if (
    !form.aadharNumber ||
    !form.fatherName ||
    !form.motherName ||
    !form.dateOfBirth ||
    !form.emergencyContact ||
    !form.address
  ) {
    showToast("Please enter all personal details", "error");
    return;
  }

  // 🔴 Aadhar validation
  if (form.aadharNumber.length !== 12) {
    showToast("Aadhar must be 12 digits", "error");
    return;
  }

  // 🔴 Emergency contact validation
  if (form.emergencyContact.length !== 10) {
    showToast("Emergency contact must be 10 digits", "error");
    return;
  }

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
      {/* ===== Header ===== */}
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
            <span>Date of Birth</span>
            <strong>{personal.dateOfBirth || "—"}</strong>
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
              maxLength={12}
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
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth || ""}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
            />

            <input
              type="tel"
              name="emergencyContact"
              value={form.emergencyContact || ""}
              onChange={handleChange}
              placeholder="Emergency Contact"
              maxLength={10}
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
