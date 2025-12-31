import { useAuth } from "../../context/useAuth";
import ThemeToggle from "../ui/ThemeToggle";

const Topbar = () => {
  const {role} = useAuth();
  return (
    <div className="topbar">
      <div className="topbar-left"></div>
      <div className="topbar-center">
        <h1>{role === "ADMIN" ? "Admin Dashboard" : "Employee Dashboard"}</h1>
      </div>

      <div className="topbar-right">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Topbar;
