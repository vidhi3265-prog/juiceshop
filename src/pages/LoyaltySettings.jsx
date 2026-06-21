import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function LoyaltySettings() {
  const [stampsRequired, setStampsRequired] = useState(10);
  const [rewardName, setRewardName] = useState("Free Juice");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { data } = await supabase
      .from("loyalty_settings")
      .select("*")
      .limit(1)
      .single();

    if (data) {
      setStampsRequired(data.stamps_required);
      setRewardName(data.reward_name);
    }
  };

  const saveSettings = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("loyalty_settings")
      .select("*")
      .limit(1);

    if (data && data.length > 0) {
      await supabase
        .from("loyalty_settings")
        .update({
          stamps_required: stampsRequired,
          reward_name: rewardName,
        })
        .eq("id", data[0].id);
    } else {
      await supabase
        .from("loyalty_settings")
        .insert({
          stamps_required: stampsRequired,
          reward_name: rewardName,
        });
    }

    setLoading(false);

    alert("Settings Saved");
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "700px",
        margin: "auto",
      }}
    >
      <h1>⚙️ Loyalty Settings</h1>

      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <label>
          Stamps Required For Reward
        </label>

        <input
          type="number"
          value={stampsRequired}
          onChange={(e) =>
            setStampsRequired(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        />

        <label>
          Reward Name
        </label>

        <input
          type="text"
          value={rewardName}
          onChange={(e) =>
            setRewardName(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        />

        <button
          onClick={saveSettings}
          disabled={loading}
          style={{
            background: "#ff7b00",
            color: "white",
            border: "none",
            padding: "14px 20px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          {loading
            ? "Saving..."
            : "Save Settings"}
        </button>
      </div>

      <div
        style={{
          marginTop: "25px",
          background: "#f8f8f8",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h3>Preview</h3>

        <p>
          Customer earns:
          <strong>
            {" "}
            {stampsRequired} stamps
          </strong>
        </p>

        <p>
          Reward:
          <strong>
            {" "}
            {rewardName}
          </strong>
        </p>
      </div>
    </div>
  );
}