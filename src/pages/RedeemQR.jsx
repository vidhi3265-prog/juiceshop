import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function RedeemQR() {
  const { token } = useParams();

  const [message, setMessage] = useState("Checking QR...");

  useEffect(() => {
    redeemQR();
  }, []);

  const redeemQR = async () => {
    const { data: receipt, error } = await supabase
      .from("receipts")
      .select("*")
      .eq("qr_token", token)
      .single();

    if (error || !receipt) {
      setMessage("Invalid QR Code");
      return;
    }

    if (receipt.used) {
      setMessage("QR Already Redeemed");
      return;
    }

    const { data: customer } = await supabase
      .from("customers")
      .select("*")
      .eq("id", receipt.customer_id)
      .single();

    const newStamps = customer.stamps + 1;

    await supabase
      .from("customers")
      .update({
        stamps: newStamps,
      })
      .eq("id", customer.id);

    await supabase
      .from("receipts")
      .update({
        used: true,
      })
      .eq("id", receipt.id);

    setMessage(
      `Stamp Added Successfully! Current Stamps: ${newStamps}/10`
    );
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
      }}
    >
      <h1>🍹 Juice Loyalty</h1>
      <h2>{message}</h2>
    </div>
  );
}