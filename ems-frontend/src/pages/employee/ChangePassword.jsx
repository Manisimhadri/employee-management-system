import { useState } from "react";
import api from "../../services/api";
import Toast from "../../components/ui/Toast";
import "../../styles/toast.css";

export default function ChangePassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put("/employee/change-password", form);
      showToast("Password changed successfully");
      setForm({ oldPassword: "", newPassword: "" });
    } catch {
      showToast("Old password is incorrect", "error");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
  if (!password) return { label: "", level: 0 };

  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: "Weak", level: 1 };
  if (score === 2) return { label: "Medium", level: 2 };
  if (score === 3) return { label: "Strong", level: 3 };
  return { label: "Very Strong", level: 4 };
};

const strength = getPasswordStrength(form.newPassword);
const [showNewPassword, setShowNewPassword] = useState(false);

  return (
  <section className="change-password-page">

    {/* ===== Header ===== */}
    <div className="change-password-header">
      <h2>Change Password</h2>
      <p className="subtitle">
        Keep your account secure by updating your password regularly
      </p>
    </div>

    {/* ===== Change Password Card ===== */}
    <form onSubmit={handleSubmit} className="change-password-card">

      <div className="field-group">
        <label>Old Password</label>
        <input
          type="password"
          name="oldPassword"
          placeholder="Enter old password"
          value={form.oldPassword}
          onChange={handleChange}
          required
        />
      </div>

      <div className="field-group">
  <label>New Password</label>

  <div className="password-input-wrapper">
    <input
      type={showNewPassword ? "text" : "password"}
      name="newPassword"
      placeholder="Enter new password"
      value={form.newPassword}
      onChange={handleChange}
      required
    />

    <button
      type="button"
      className="toggle-password"
      onClick={() => setShowNewPassword(prev => !prev)}
      aria-label={showNewPassword ? "Hide password" : "Show password"}
    >
      {showNewPassword ? "Hide" : "Show"}
    </button>
  </div>

  {/* Password Strength Indicator */}
  {form.newPassword && (
    <div className="password-strength">
      <div className={`strength-bar level-${strength.level}`}></div>
      <span className={`strength-text level-${strength.level}`}>
        {strength.label}
      </span>
    </div>
  )}
</div>


      <button
        type="submit"
        className="btn-primary full-width"
        disabled={loading}
      >
        {loading ? "Changing Password..." : "Change Password"}
      </button>
    </form>

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
