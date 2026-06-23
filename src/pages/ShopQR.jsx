import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { supabase } from "../lib/supabase";

export default function ShopQR() {
  const [shopToken, setShopToken] =
    useState("");

  useEffect(() => {
    loadQR();

    const channel = supabase
      .channel("shop_qr_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "shop_qr",
        },
        (payload) => {
          console.log(
            "QR updated:",
            payload
          );

          if (payload.new?.qr_token) {
            setShopToken(
              payload.new.qr_token
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadQR = async () => {
    const { data, error } =
      await supabase
        .from("shop_qr")
        .select("*")
        .eq("active", true)
        .maybeSingle();

    console.log("SHOP QR =", data);
    console.log("QR ERROR =", error);

    if (data) {
      setShopToken(data.qr_token);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#ff7b00,#ff9f43)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "25px",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
          boxShadow:
            "0 15px 35px rgba(0,0,0,0.15)",
        }}
      >
        <h1>🍹 Juice Club</h1>

        <h3
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Scan To Collect Stamp
        </h3>

        {shopToken ? (
          <div
            style={{
              background: "#fff",
              padding: "20px",
              display: "inline-block",
              borderRadius: "20px",
            }}
          >
            <QRCode
              value={shopToken}
              size={250}
            />
          </div>
        ) : (
          <p>Loading QR...</p>
        )}

        <p
          style={{
            marginTop: "25px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Show this QR at checkout
        </p>

        <div
          style={{
            marginTop: "20px",
            padding: "12px",
            background: "#f5f5f5",
            borderRadius: "10px",
            wordBreak: "break-all",
          }}
        >
          QR Token:
          <br />
          <strong>{shopToken}</strong>
        </div>
      </div>
    </div>
  );
}