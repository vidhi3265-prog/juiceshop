import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [customer, setCustomer] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedCustomer =
      JSON.parse(
        localStorage.getItem("customer")
      );

    if (!savedCustomer) {
      navigate("/");
      return;
    }

    setCustomer(savedCustomer);
  }, [navigate]);

  const renderStamps = (count) => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(5, 1fr)",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            style={{
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              borderRadius: "50%",
              background:
                index < count
                  ? "#ff7b00"
                  : "#eee",
            }}
          >
            {index < count
              ? "🍹"
              : "⭕"}
          </div>
        ))}
      </div>
    );
  };

  if (!customer) {
    return null;
  }

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
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "25px",
            padding: "25px",
            boxShadow:
              "0 15px 35px rgba(0,0,0,0.15)",
          }}
        >
          <h2>
            Welcome,
            {" "}
            {customer.name}
          </h2>

          <p
            style={{
              color: "#666",
            }}
          >
            {customer.phone}
          </p>

          <div
            style={{
              marginTop: "25px",
              background:
                "linear-gradient(135deg,#111827,#1f2937)",
              color: "white",
              borderRadius: "20px",
              padding: "20px",
            }}
          >
            <h3>
              🍹 Juice Club Card
            </h3>

            {renderStamps(
              customer.stamps || 0
            )}

            <h2
              style={{
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              {customer.stamps || 0}
              /10 Stamps
            </h2>

            {(customer.stamps ||
              0) >= 10 && (
              <div
                style={{
                  textAlign:
                    "center",
                  marginTop:
                    "15px",
                  color: "#4ade80",
                  fontWeight:
                    "bold",
                }}
              >
                🎁 Free Juice
                Available
              </div>
            )}
          </div>

          <div
            style={{
              display: "grid",
              gap: "12px",
              marginTop: "25px",
            }}
          >
            <button
              onClick={() =>
                navigate(
                  "/scan"
                )
              }
              style={{
                padding: "14px",
                background:
                  "#ff7b00",
                color: "white",
                border: "none",
                borderRadius:
                  "12px",
                cursor:
                  "pointer",
              }}
            >
              📷 Scan QR
            </button>

            <button
              onClick={() =>
                navigate(
                  "/rewards"
                )
              }
              style={{
                padding: "14px",
                background:
                  "#111827",
                color: "white",
                border: "none",
                borderRadius:
                  "12px",
                cursor:
                  "pointer",
              }}
            >
              🎁 Rewards
            </button>

            <button
              onClick={() =>
                navigate(
                  "/profile"
                )
              }
              style={{
                padding: "14px",
                background:
                  "#374151",
                color: "white",
                border: "none",
                borderRadius:
                  "12px",
                cursor:
                  "pointer",
              }}
            >
              👤 Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}