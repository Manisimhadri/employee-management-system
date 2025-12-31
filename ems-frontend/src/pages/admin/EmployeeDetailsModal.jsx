import { useEffect, useState } from "react";
import api from "../../services/api";

export default function EmployeeDetailsModal({ employeeId,refreshKey, onClose }) {
  const [employee, setEmployee] = useState(null);
  const [personal, setPersonal] = useState(null);

  useEffect(() => {
  api.get(`/admin/employees/${employeeId}`)
    .then(res => setEmployee(res.data));

  api.get(`/admin/employees/${employeeId}/personal-details`)
    .then(res => setPersonal(res.data))
    .catch(() => setPersonal(null));
}, [employeeId, refreshKey]); // ✅ IMPORTANT


  if (!employee) return null;

  return (
  <div className="modal-overlay">
    <div className="modal emp-details-modal">

      {/* Header */}
      <div className="emp-header">
        <div className="emp-avatar">
          {employee.name.charAt(0)}
        </div>

        <div>
          <h3>{employee.name}</h3>
          <p className="emp-role">
            {employee.designation} · {employee.department}
          </p>
          <p className="emp-email">{employee.email}</p>
        </div>
      </div>

      {/* Job Details */}
      <div className="emp-section">
        <h4>Job Details</h4>

        <div className="emp-row">
          <span>Department</span>
          <strong>{employee.department}</strong>
        </div>

        <div className="emp-row">
          <span>Designation</span>
          <strong>{employee.designation}</strong>
        </div>

        <div className="emp-row highlight">
          <span>Salary</span>
          <strong>₹{employee.salary}</strong>
        </div>
      </div>

      {/* Personal Details */}
      <div className="emp-section">
        <h4>Personal Details</h4>

        {personal ? (
          <>
            <div className="emp-row">
              <span>Aadhar</span>
              <strong>{personal.aadharNumber}</strong>
            </div>
            <div className="emp-row">
              <span>Father</span>
              <strong>{personal.fatherName}</strong>
            </div>
            <div className="emp-row">
              <span>Mother</span>
              <strong>{personal.motherName}</strong>
            </div>
            <div className="emp-row">
              <span>DOB</span>
              <strong>{personal.dateOfBirth}</strong>
            </div>
            <div className="emp-row">
              <span>Emergency Contact</span>
              <strong>{personal.emergencyContact}</strong>
            </div>
            <div className="emp-row">
              <span>Address</span>
              <strong>{personal.address}</strong>
            </div>
          </>
        ) : (
          <p className="empty-text">No personal details available.</p>
        )}
      </div>

      {/* Actions */}
      <div className="modal-actions">
        <button onClick={onClose} className="btn-outline">
          Close
        </button>
      </div>

    </div>
  </div>
);

}
