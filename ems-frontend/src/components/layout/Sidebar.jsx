import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, User, Key, LogOut,UserX } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import adminLogo from "../../assets/admin-logo.png";
import employeeLogo from "../../assets/employee-logo.png";


export default function Sidebar() {
  const { logout, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar-container">
      <div className="sidebar-brand">
      <img
          src={role === "ADMIN" ? adminLogo : employeeLogo}
          alt="EMS Logo"
          className="sidebar-logo"
      />
      </div>


      <nav className="sidebar-nav">
        {role === "ADMIN" && (
          <>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/admin/employees"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <Users size={18} />
              <span>Employees</span>
            </NavLink>

            <NavLink
              to="/admin/inactive-employees"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <UserX size={18} />
              <span>Inactive Employees</span>
            </NavLink>

          </>
        )}

        {role === "EMPLOYEE" && (
          <>
            <NavLink
              to="/employee/personal-details"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <User size={18} />
              <span>Profile</span>
            </NavLink>

            <NavLink
              to="/employee/change-password"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <Key size={18} />
              <span>Change Password</span>
            </NavLink>
          </>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}
