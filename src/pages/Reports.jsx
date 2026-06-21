import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  FaUsers,
  FaGift,
} from "react-icons/fa";

export default function Reports() {
  const [totalCustomers, setTotalCustomers] =
    useState(0);

  const [rewardCustomers, setRewardCustomers] =
    useState(0);

  const [topCustomers, setTopCustomers] =
    useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    const { data: customers } =
      await supabase
        .from("customers")
        .select("*");

    setTotalCustomers(
      customers?.length || 0
    );

    const rewardReady =
      customers?.filter(
        (customer) =>
          customer.stamps >= 10
      ).length || 0;

    setRewardCustomers(
      rewardReady
    );

    const sortedCustomers = [
      ...(customers || []),
    ].sort(
      (a, b) =>
        (b.stamps || 0) -
        (a.stamps || 0)
    );

    setTopCustomers(
      sortedCustomers.slice(0, 10)
    );
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      <h1>
        📈 Loyalty Reports
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <Card
          icon={<FaUsers />}
          title="Total Customers"
          value={totalCustomers}
        />

        <Card
          icon={<FaGift />}
          title="Reward Eligible"
          value={rewardCustomers}
        />
      </div>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "20px",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h2>
          🏆 Top Customers
        </h2>

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
              <th>Name</th>
              <th>Phone</th>
              <th>Stamps</th>
            </tr>
          </thead>

          <tbody>
            {topCustomers.map(
              (customer) => (
                <tr
                  key={
                    customer.id
                  }
                >
                  <td>
                    {
                      customer.name
                    }
                  </td>

                  <td>
                    {
                      customer.phone
                    }
                  </td>

                  <td>
                    {
                      customer.stamps
                    }
                    /10
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({
  icon,
  title,
  value,
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        padding: "25px",
        textAlign: "center",
        boxShadow:
          "0 10px 25px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          fontSize: "30px",
          marginBottom: "10px",
        }}
      >
        {icon}
      </div>

      <h2>{value}</h2>

      <p
        style={{
          color: "#666",
        }}
      >
        {title}
      </p>
    </div>
  );
}