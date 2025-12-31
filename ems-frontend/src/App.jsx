import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import { useAuth } from "./context/useAuth";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/admin/Dashboard";
import Employees from "./pages/admin/Employees";
import Profile from "./pages/employee/Profile";
import ChangePassword from "./pages/employee/ChangePassword";
import AppShell from "./components/layout/AppShell";
import ViewEmployee from "./pages/admin/ViewEmployee";

function ProtectedRoute({ children, allowedRole }) {
  const { token, role } = useAuth();

  if (!token) return <Navigate to="/login" />;

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Admin routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <AppShell>
                  <Dashboard />
                </AppShell>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/employees"
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <AppShell>
                  <Employees />
                </AppShell>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/employees/view"
            element={
            <ProtectedRoute allowedRole="ADMIN">
              <AppShell>
                <ViewEmployee />
              </AppShell>
            </ProtectedRoute>
         }
        />


          {/* Employee routes */}
          <Route
            path="/employee/personal-details"
            element={
              <ProtectedRoute allowedRole="EMPLOYEE">
                <AppShell>
                  <Profile />
                </AppShell>
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee/change-password"
            element={
              <ProtectedRoute allowedRole="EMPLOYEE">
                <AppShell>
                  <ChangePassword />
                </AppShell>
              </ProtectedRoute>
            }
          />

          {/* Default */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
