import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [customers, setCustomers] = useState(0);
  const [receipts, setReceipts] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [stamps, setStamps] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const { data: customerData } = await supabase
      .from("customers")
      .select("*");

    const { data: receiptData } = await supabase
      .from("receipts")
      .select("*");

    setCustomers(customerData?.length || 0);
    setReceipts(receiptData?.length || 0);

    let totalRevenue = 0;
    let totalStamps = 0;

    receiptData?.forEach((item) => {
      totalRevenue += Number(item.amount || 0);
    });

    customerData?.forEach((item) => {
      totalStamps += Number(item.stamps || 0);
    });

    setRevenue(totalRevenue);
    setStamps(totalStamps);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>🍹 Juice Club Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div style={cardStyle}>
          <h2>{customers}</h2>
          <p>Total Customers</p>
        </div>

        <div style={cardStyle}>
          <h2>{receipts}</h2>
          <p>Total Receipts</p>
        </div>

        

        <div style={cardStyle}>
          <h2>{stamps}</h2>
          <p>Total Active Stamps</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: "25px",
  borderRadius: "15px",
  textAlign: "center",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};