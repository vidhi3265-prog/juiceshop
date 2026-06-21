import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function CustomerHistory() {
  const [customer, setCustomer] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedCustomer = JSON.parse(
      localStorage.getItem("customer")
    );

    if (savedCustomer) {
      setCustomer(savedCustomer);
      loadHistory(savedCustomer.id);
    }
  }, []);

  const loadHistory = async (
    customerId
  ) => {
    const { data } = await supabase
      .from("scan_history")
      .select("*")
      .eq("customer_id", customerId)
      .order("scan_date", {
        ascending: false,
      });

    if (data) {
      setHistory(data);
    }
  };

  if (!customer) {
    return (
      <div
        style={{
          padding: "30px",
        }}
      >
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
        <h1>
          📜 Loyalty History
        </h1>

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

        <h2>
          🍹 Stamp Activity
        </h2>

        {history.length === 0 ? (
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
              borderCollapse:
                "collapse",
            }}
          >
            <thead>
              <tr>
                <th>Date</th>
                <th>Stamp</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td>
                    {new Date(
                      item.scan_date
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    Stamp #
                    {item.stamp_number}
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