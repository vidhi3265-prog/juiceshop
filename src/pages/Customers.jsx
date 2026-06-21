import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setCustomers(data);
    }
  };

  const addCustomer = async (e) => {
    e.preventDefault();

    if (!name || !phone) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("customers")
      .insert([
        {
          name,
          phone,
          stamps: 0,
        },
      ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setName("");
    setPhone("");

    fetchCustomers();

    alert("Customer Added Successfully");
  };

  const addStamp = async (id) => {
    const customer = customers.find(
      (c) => c.id === id
    );

    if (!customer) return;

    const newStamps = customer.stamps + 1;

    const { error } = await supabase
      .from("customers")
      .update({
        stamps: newStamps,
      })
      .eq("id", id);

    if (!error) {
      fetchCustomers();
    }

    if (newStamps >= 10) {
      alert(
        `🎉 ${customer.name} earned a FREE JUICE!`
      );
    }
  };

  const redeemReward = async (id) => {
    const confirmRedeem = window.confirm(
      "Redeem Free Juice?"
    );

    if (!confirmRedeem) return;

    await supabase
      .from("customers")
      .update({
        stamps: 0,
      })
      .eq("id", id);

    fetchCustomers();
  };

  const editCustomer = async (customer) => {
    const newName = prompt(
      "Edit Name",
      customer.name
    );

    if (!newName) return;

    const newPhone = prompt(
      "Edit Phone",
      customer.phone
    );

    if (!newPhone) return;

    await supabase
      .from("customers")
      .update({
        name: newName,
        phone: newPhone,
      })
      .eq("id", customer.id);

    fetchCustomers();
  };

  const deleteCustomer = async (id) => {
    const confirmDelete = window.confirm(
      "Delete Customer?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("customers")
      .delete()
      .eq("id", id);

    fetchCustomers();
  };

  const renderStamps = (count) => {
    return (
      <div
        style={{
          display: "flex",
          gap: "4px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {[...Array(10)].map((_, index) => (
          <span
            key={index}
            style={{
              fontSize: "22px",
            }}
          >
            {index < count ? "🍹" : "⭕"}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <h1>🍹 Juice Loyalty Customers</h1>

      <form onSubmit={addCustomer}>
        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
          }}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#ff7b00",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          {loading
            ? "Adding..."
            : "Add Customer"}
        </button>
      </form>

      <hr />
<button onClick={() => navigate("/home")}>
  🏠 Back To Home
</button>
      <h2>Customer Loyalty Cards</h2>

      <table
        border="1"
        width="100%"
        cellPadding="12"
        style={{
          borderCollapse: "collapse",
          background: "white",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Loyalty Card</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>

              <td>{customer.phone}</td>

              <td>
                {renderStamps(customer.stamps)}

                <div
                  style={{
                    marginTop: "8px",
                    fontWeight: "bold",
                  }}
                >
                  {customer.stamps}/10
                </div>

                {customer.stamps >= 10 && (
                  <div
                    style={{
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    🎁 FREE JUICE READY
                  </div>
                )}
              </td>

              <td>
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={() =>
                      addStamp(customer.id)
                    }
                  >
                    ➕ Stamp
                  </button>

                  <button
                    onClick={() =>
                      redeemReward(customer.id)
                    }
                  >
                    🎁 Redeem
                  </button>

                  <button
                    onClick={() =>
                      editCustomer(customer)
                    }
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteCustomer(customer.id)
                    }
                  >
                    🗑️ Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}