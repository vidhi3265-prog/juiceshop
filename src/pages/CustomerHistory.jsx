import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function CustomerHistory() {
  const [customer, setCustomer] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCustomer = JSON.parse(
      localStorage.getItem("customer")
    );

    console.log(
      "Saved Customer =",
      savedCustomer
    );

    if (savedCustomer) {
      setCustomer(savedCustomer);
      loadHistory(savedCustomer.id);
    } else {
      setLoading(false);
    }
  }, []);

  const loadHistory = async (customerId) => {
    try {
      const { data, error } =
        await supabase
          .from("scan_history")
          .select("*")
          .order("id", {
            ascending: false,
          });

      console.log(
        "ALL HISTORY =",
        data
      );

      console.log(
        "HISTORY ERROR =",
        error
      );

      if (error) {
        console.error(error);
        return;
      }

      setHistory(data || []);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  if (!customer) {
    return (
      <div style={{ padding: "30px" }}>
        Customer not found
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "white",
          borderRadius: "25px",
          padding: "25px",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h1>📜 Loyalty History</h1>

        <div
          style={{
            background: "#f8fafc",
            padding: "15px",
            borderRadius: "12px",
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
            {customer.stamps}/10
          </p>
        </div>

        <h2>🍹 Stamp Activity</h2>

        {loading ? (
          <p>Loading...</p>
        ) : history.length === 0 ? (
          <div
            style={{
              padding: "20px",
              background: "#f3f4f6",
              borderRadius: "12px",
            }}
          >
            No stamp history found.
          </div>
        ) : (
          <table
            width="100%"
            border="1"
            cellPadding="10"
            style={{
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Scan UID</th>
                <th>Customer ID</th>
                <th>Stamp</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.scan_uid}</td>
                  <td>{item.customer_id}</td>
                  <td>
                    Stamp #{item.stamp_number}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}