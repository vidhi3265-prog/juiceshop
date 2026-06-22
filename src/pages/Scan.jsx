import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Scan() {
  const scannerRef = useRef(null);

  const [message, setMessage] =
    useState("Scan Shop QR");

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    scannerRef.current =
      new Html5Qrcode("reader");

    startScanner();

    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = async () => {
    try {
      await scannerRef.current.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: 250,
        },
        onScanSuccess,
        () => {}
      );
    } catch (err) {
      console.error(err);
      setMessage(
        "Camera could not start"
      );
    }
  };

  const stopScanner = async () => {
    try {
      if (
        scannerRef.current &&
        scannerRef.current.isScanning
      ) {
        await scannerRef.current.stop();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onScanSuccess = async (
    decodedText
  ) => {
    if (loading) return;

    setLoading(true);

    try {
      const customer =
        JSON.parse(
          localStorage.getItem(
            "customer"
          )
        );

      if (!customer) {
        setMessage(
          "Please login first"
        );
        return;
      }
const {
  data: shopQR,
  error: shopQRError,
} = await supabase
  .from("shop_qr")
  .select("*")
  .eq("active", true)
  .maybeSingle();

console.log("shopQR =", shopQR);
console.log("shopQRError =", shopQRError);

if (shopQRError) {
  setMessage(shopQRError.message);
  return;
}

if (!shopQR) {
  setMessage("No active Shop QR found");
  return;
}

console.log(
  "DATABASE QR =",
  shopQR.qr_token
);

      if (
        decodedText !==
        shopQR.qr_token
      ) {
        setMessage(
          "Invalid QR Code"
        );
        return;
      }

      const newStamp =
        (customer.stamps || 0) + 1;

      const { error } =
        await supabase
          .from("customers")
          .update({
            stamps: newStamp,
          })
          .eq(
            "id",
            customer.id
          );

      if (error) {
        console.error(error);
        setMessage(
          "Failed to update stamp"
        );
        return;
      }

      const scanUID =
  "SCN-" + Date.now();

await supabase
  .from("scan_history")
  .insert([
    {
      scan_uid: scanUID,
      customer_id:
        customer.id,
      stamp_number:
        newStamp,
    },
  ]);

  const newToken =
  "JUICE-" +
  Math.random()
    .toString(36)
    .substring(2, 12);

await supabase
  .from("shop_qr")
  .update({
    qr_token: newToken,
  })
  .eq("id", shopQR.id);

      const updatedCustomer =
        {
          ...customer,
          stamps: newStamp,
        };

      localStorage.setItem(
        "customer",
        JSON.stringify(
          updatedCustomer
        )
      );

      setMessage(
        `✅ Stamp Added (${newStamp}/10)`
      );

      await stopScanner();

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      console.error(err);
      setMessage(
        "Error adding stamp"
      );
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#ff7b00,#ff9f43)",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          background: "#fff",
          padding: "25px",
          borderRadius: "25px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
          }}
        >
          📷 Scan QR
        </h1>

<button onClick={() => navigate("/home")}>
  🏠 Back To Home
</button>
        <p
          style={{
            textAlign: "center",
            color: "#666",
          }}
        >
          Scan Shop QR To Earn Stamp
        </p>

        <div
          id="reader"
          style={{
            marginTop: "20px",
          }}
        ></div>

        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {message}
        </div>
      </div>
    </div>
  );
}