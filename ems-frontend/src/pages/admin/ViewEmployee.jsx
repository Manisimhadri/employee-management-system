import "../../styles/layout.css";

export default function ViewEmployee() {
  return (
    <section className="view-employee">
      {/* Header */}
      <header className="page-header">
        <h2>Employee Details</h2>
        <button className="link-btn">← Back</button>
      </header>

      {/* Basic Info */}
      <section className="details-card">
        <h4>Basic Information</h4>

        <div className="details-grid">
          <div>
            <label>Name</label>
            <p>John Doe</p>
          </div>

          <div>
            <label>Email</label>
            <p>john@ems.com</p>
          </div>

          <div>
            <label>Role</label>
            <p>EMPLOYEE</p>
          </div>

          <div>
            <label>Status</label>
            <span className="badge success">Active</span>
          </div>
        </div>
      </section>

      {/* Job Info */}
      <section className="details-card">
        <h4>Job Details</h4>

        <div className="details-grid">
          <div>
            <label>Department</label>
            <p>IT</p>
          </div>

          <div>
            <label>Designation</label>
            <p>Software Developer</p>
          </div>

          <div>
            <label>Salary</label>
            <p>₹45,000</p>
          </div>
        </div>
      </section>

      {/* Personal Info */}
      <section className="details-card">
        <h4>Personal Details</h4>

        <div className="details-grid">
          <div>
            <label>Father Name</label>
            <p>Ramesh Kumar</p>
          </div>

          <div>
            <label>Aadhar Number</label>
            <p>XXXX-XXXX-1234</p>
          </div>

          <div>
            <label>Date of Birth</label>
            <p>12-08-1998</p>
          </div>

          <div>
            <label>Address</label>
            <p>Hyderabad, Telangana</p>
          </div>
        </div>
      </section>
    </section>
  );
}
