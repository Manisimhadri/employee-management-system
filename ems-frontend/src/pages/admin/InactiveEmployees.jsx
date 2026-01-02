import { useEffect, useState } from "react";
import {
  getInactiveEmployees,
  restoreEmployee,
  permanentlyDeleteEmployee
} from "../../services/api";
import EmployeeDetailsModal from "./EmployeeDetailsModal";
import Toast from "../../components/ui/Toast";

import "../../styles/layout.css";
import "../../styles/toast.css";

export default function InactiveEmployees() {
  const [employees, setEmployees] = useState([]);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  // ---------- LOAD INACTIVE EMPLOYEES ----------
  const loadInactiveEmployees = () => {
    setLoading(true);
    getInactiveEmployees()
      .then(res => setEmployees(res.data))
      .catch(() =>
        setToast({ type: "error", message: "Failed to load inactive employees" })
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getInactiveEmployees()
      .then(res => setEmployees(res.data))
      .catch(() =>
        setToast({ type: "error", message: "Failed to load inactive employees" })
      )
      .finally(() => setLoading(false));
  }, []);

  // ---------- RESTORE ----------
  const handleRestore = (id) => {
    restoreEmployee(id)
      .then(() => {
        setToast({ type: "success", message: "Employee restored successfully" });
        loadInactiveEmployees();
      })
      .catch(() =>
        setToast({ type: "error", message: "Failed to restore employee" })
      );
  };

  // ---------- PERMANENT DELETE ----------
  const permanentlyDelete = (id) => {
    const confirm = window.confirm(
      "This action is irreversible. Do you want to permanently delete this employee?"
    );

    if (!confirm) return;

    permanentlyDeleteEmployee(id)
  .then(() => {
    // 🔥 REMOVE FROM UI IMMEDIATELY
    setEmployees(prev =>
      prev.filter(emp => emp.id !== id)
    );

    setToast({
      type: "success",
      message: "Employee permanently deleted"
    });
  })
  .catch(() =>
    setToast({
      type: "error",
      message: "Failed to permanently delete employee"
    })
  );

  };

  // ---------- UI ----------
  return (
    <section className="employees-page">
      <div className="employees-header">
        <h2>Inactive Employees</h2>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : employees.length === 0 ? (
        <p>No inactive employees</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map(emp => (
              <tr
                key={emp.id}
                className="clickable-row"
                onClick={() => setSelectedEmployeeId(emp.id)}
              >
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <button
                    className="btn restore"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRestore(emp.id);
                    }}
                  >
                    Restore
                  </button>

                  <button
                    className="btn danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      permanentlyDelete(emp.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ---------- DETAILS MODAL ---------- */}
      {selectedEmployeeId && (
        <EmployeeDetailsModal
          employeeId={selectedEmployeeId}
          onClose={() => setSelectedEmployeeId(null)}
        />
      )}

      {/* ---------- TOAST ---------- */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}
