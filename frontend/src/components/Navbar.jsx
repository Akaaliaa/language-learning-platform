function Navbar({ onLogout }) {
  return (
    <div
      style={{
        minHeight: "80px",
        borderBottom: "1px solid #1e293b",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        background: "#020617",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "12px",
            background: "#2563eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
          }}
        >
          📘
        </div>

        <h1 style={{ margin: 0, fontSize: "28px", lineHeight: "1.2" }}>
          Language Learning Platform
        </h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <div style={{ fontSize: "17px", fontWeight: "bold" }}>
          Account type: <span style={{ color: "#3b82f6" }}>Admin</span>
        </div>

        <button
          onClick={onLogout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "12px 22px",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;