import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Settings() {
  const [shopName, setShopName] = useState("");
  const [currency, setCurrency] = useState("CAD");
  const [footerText, setFooterText] = useState("");
  const [rewardMessage, setRewardMessage] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { data } = await supabase
      .from("settings")
      .select("*")
      .limit(1)
      .single();

    if (data) {
      setShopName(data.shop_name || "");
      setCurrency(data.currency || "CAD");
      setFooterText(data.footer_text || "");
      setRewardMessage(data.reward_message || "");
    }
  };

  const saveSettings = async () => {
    const { data } = await supabase
      .from("settings")
      .select("*");

    if (data && data.length > 0) {
      await supabase
        .from("settings")
        .update({
          shop_name: shopName,
          currency: currency,
          footer_text: footerText,
          reward_message: rewardMessage,
        })
        .eq("id", data[0].id);
    } else {
      await supabase
        .from("settings")
        .insert({
          shop_name: shopName,
          currency: currency,
          footer_text: footerText,
          reward_message: rewardMessage,
        });
    }

    if (password.trim() !== "") {
      localStorage.setItem(
        "ownerPassword",
        password
      );
    }

    alert("Settings Saved Successfully");
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      <h1>⚙️ Settings</h1>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "20px",
          maxWidth: "800px",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <label>Shop Name</label>

        <input
          type="text"
          value={shopName}
          onChange={(e) =>
            setShopName(e.target.value)
          }
          style={inputStyle}
        />

        <label>Currency</label>

        <select
          value={currency}
          onChange={(e) =>
            setCurrency(e.target.value)
          }
          style={inputStyle}
        >
          <option value="CAD">
            CAD ($)
          </option>

          <option value="USD">
            USD ($)
          </option>

          <option value="INR">
            INR (₹)
          </option>
        </select>

        <label>Receipt Footer Text</label>

        <textarea
          value={footerText}
          onChange={(e) =>
            setFooterText(e.target.value)
          }
          style={{
            ...inputStyle,
            height: "100px",
          }}
        />

        <label>Reward Message</label>

        <textarea
          value={rewardMessage}
          onChange={(e) =>
            setRewardMessage(e.target.value)
          }
          style={{
            ...inputStyle,
            height: "100px",
          }}
        />

        <label>Change Owner Password</label>

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={saveSettings}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "12px",
            background: "#ff7b00",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: "1px solid #ddd",
};