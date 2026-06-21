import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [customer, setCustomer] =
    useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedCustomer = JSON.parse(
      localStorage.getItem("customer")
    );

    if (!savedCustomer) {
      navigate("/");
      return;
    }

    setCustomer(savedCustomer);
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("customer");
    navigate("/");
  };

  if (!customer) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#ff7b00,#ff9f43)",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          background: "white",
          borderRadius: "25px",
          padding: "25px",
          boxShadow:
            "0 15px 35px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          👤 My Profile
        </h1>

        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "#ff7b00",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              color: "white",
              margin: "0 auto",
            }}
          >
            👤
          </div>
        </div>

        <div
          style={{
            background: "#f8fafc",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "20px",
          }}
        >
          <p>
            <strong>Name:</strong>{" "}
            {customer.name}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {customer.phone}
          </p>

          <p>
            <strong>Current Stamps:</strong>{" "}
            {customer.stamps || 0}/10
          </p>
        </div>

        <button
          onClick={() =>
          navigate("/customer-history")}
          style={{
            width: "100%",
            padding: "14px",
            background: "#111827",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          📜 My History
        </button>

        <button
          onClick={() =>
            navigate("/home")
          }
          style={{
            width: "100%",
            padding: "14px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          🏠 Back To Home
        </button>

        <button
          onClick={logout}
          style={{
            width: "100%",
            padding: "14px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}