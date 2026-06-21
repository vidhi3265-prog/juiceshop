import QRCode from "react-qr-code";

export default function ShopQR() {
  const shopToken = "JUICE-CLUB-2026";

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
        <h1
          style={{
            marginBottom: "10px",
          }}
        >
          🍹 Juice Club
        </h1>

        <h3
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Scan To Collect Stamp
        </h3>

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