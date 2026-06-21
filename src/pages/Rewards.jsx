import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Rewards() {
  const [customer, setCustomer] =
    useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedCustomer = JSON.parse(
      localStorage.getItem("customer")
    );

    if (savedCustomer) {
      setCustomer(savedCustomer);
    }
  }, []);

  const redeemReward = async () => {
    if (!customer) return;

    const confirmRedeem = window.confirm(
      "Redeem Free Juice?"
    );

    if (!confirmRedeem) return;

    const { error } = await supabase
      .from("customers")
      .update({
        stamps: 0,
      })
      .eq("id", customer.id);

    if (error) {
      alert(error.message);
      return;
    }

    const updatedCustomer = {
      ...customer,
      stamps: 0,
    };

    localStorage.setItem(
      "customer",
      JSON.stringify(updatedCustomer)
    );

    setCustomer(updatedCustomer);

    alert(
      "🎉 Free Juice Redeemed Successfully!"
    );
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
          padding: "25px",
          borderRadius: "25px",
          boxShadow:
            "0 15px 35px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
          }}
        >
          🎁 Rewards
        </h1>

        <h2
          style={{
            textAlign: "center",
          }}
        >
          {customer.stamps}/10 Stamps
        </h2>

        {customer.stamps >= 10 ? (
          <>
            <div
              style={{
                marginTop: "20px",
                padding: "20px",
                background: "#22c55e",
                color: "white",
                borderRadius: "15px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              🎉 FREE JUICE AVAILABLE
            </div>

            <button
              onClick={redeemReward}
              style={{
                width: "100%",
                padding: "14px",
                marginTop: "15px",
                background: "#ff7b00",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              Redeem Reward
            </button>
          </>
        ) : (
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              background: "#f3f4f6",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            🍹 Collect 10 stamps to unlock
            a FREE Juice.
          </div>
        )}

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
            marginTop: "20px",
          }}
        >
          🏠 Back To Home
        </button>
      </div>
    </div>
  );
}