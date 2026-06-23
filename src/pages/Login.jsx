import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      alert("Please fill all fields");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");

    const canadianRegex =
      /^(403|587|825|368|780|236|250|604|672|778|204|431|584|506|428|709|879|902|782|226|249|289|343|365|416|437|519|548|613|647|683|705|742|753|807|905|263|367|438|450|514|579|581|819|873|306|474|639)\d{7}$/;

    if (!canadianRegex.test(cleanPhone)) {
      alert("Please enter a valid  phone number");
      return;
    }

    setLoading(true);

    const { data: existingCustomer } = await supabase
      .from("customers")
      .select("*")
      .eq("phone", cleanPhone)
      .maybeSingle();

    if (existingCustomer) {
      localStorage.setItem(
        "customer",
        JSON.stringify(existingCustomer)
      );

      setLoading(false);
      navigate("/home");
      return;
    }

    const { data, error } = await supabase
      .from("customers")
      .insert([
        {
          name: name.trim(),
          phone: cleanPhone,
          stamps: 0,
        },
      ])
      .select()
      .single();

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    localStorage.setItem("customer", JSON.stringify(data));
    navigate("/home");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#ff7b00,#ff9f43)",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "25px",
          padding: "30px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
          🍹 Juice Club
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "25px",
          }}
        >
          Loyalty Rewards Program
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "12px",
              borderRadius: "12px",
              border: "1px solid #ddd",
              boxSizing: "border-box",
            }}
          />

          <input
            type="tel"
            placeholder=" Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "20px",
              borderRadius: "12px",
              border: "1px solid #ddd",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: "#ff7b00",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {loading ? "Please Wait..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}