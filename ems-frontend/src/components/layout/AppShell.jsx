import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell({ children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", height: "100vh" }}>
      <Sidebar />
      <div>
        <Topbar />
        <main className="app-main">
            {children}
        </main>

      </div>
    </div>
  );
}
