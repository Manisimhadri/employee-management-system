import { useEffect, useState } from "react";
import api from "../../services/api";
import EmployeeDetailsModal from "./EmployeeDetailsModal";
import CreateEmployeeModal from "./CreateEmployeeModal";
import UpdateEmployeeModal from "./UpdateEmployeeModal";
import Toast from "../../components/ui/Toast";
import "../../styles/layout.css";

import "../../styles/toast.css";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [toast, setToast] = useState(null);
  const [detailsRefreshKey, setDetailsRefreshKey] = useState(0);

  const handleUpdateSuccess = (msg) => {
  refreshEmployees();
  setDetailsRefreshKey(prev => prev + 1); // 🔥 force details refresh
  showToast(msg);
};


  const showToast = (message, type = "success") =>{  
        setToast({ message, type }); 
        setTimeout(() => setToast(null), 3000); 
    };

  useEffect(() => {
    let mounted = true;

    api.get("/admin/employees")
      .then(res => mounted && setEmployees(res.data))
      .catch(() => mounted && setError("Failed to load employees"))
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, []);

  const refreshEmployees = () => {
    api.get("/admin/employees")
      .then(res => setEmployees(res.data));
  };

  const deleteEmployee = async (id) => {
  if (!window.confirm("Are you sure you want to delete this employee?")) return;

  try {
    await api.delete(`/admin/employees/${id}`);

    // 🔥 IMPORTANT FIX
    if (selectedEmployeeId === id) {
      setSelectedEmployeeId(null); // close details modal
    }

    refreshEmployees();
    showToast("Employee deleted successfully");
  } catch (err) {
    console.log("Failed to delete employee" + err);
    showToast("Failed to delete employee", "error");
  }
};


  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="employees-page">
      <div className="employees-header">
        <h2>Employees</h2>
        <button onClick={() => setShowCreateModal(true)}>
          + Add Employee
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
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
    <td>{emp.designation}</td>
    <td>₹{emp.salary}</td>
    <td>
      <button
          onClick={(e) => {
            e.stopPropagation(); // 🔥 IMPORTANT
            setEditEmployee(emp);
          }}
      >
      Edit
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation(); // 🔥 IMPORTANT
          deleteEmployee(emp.id);
        }}
        className="danger"
      >
        Delete
      </button>

    </td>
  </tr>
))}

        </tbody>
      </table>

      {selectedEmployeeId && (
        <EmployeeDetailsModal
          employeeId={selectedEmployeeId}
          onClose={() => setSelectedEmployeeId(null)}
          refreshKey={detailsRefreshKey}
          onSuccess={() => {
            refreshEmployees();
            setDetailsRefreshKey(prev => prev + 1); // 🔥 THIS LINE
            showToast("Employee updated successfully");
          }}
        />
      )}

      {showCreateModal && (
        <CreateEmployeeModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={(msg) => {
          refreshEmployees();
          showToast(msg);
        }}
      />
      )}

      {editEmployee && (
        <UpdateEmployeeModal
        employee={editEmployee}
        onClose={() => setEditEmployee(null)}
        onSuccess={handleUpdateSuccess}
        />
      )}  

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
