import React, { useState } from "react";
import { orderSync } from "./api";

export default function App() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.clear();
    console.log("🟢 handleSubmit triggered");
    console.log("📤 Sending to backend:", text);

    try {
      const res = await orderSync(text);
      console.log("✅ Backend response received:", res);
      setResponse(res);
    } catch (err) {
      console.error("❌ Error occurred while calling backend:", err);

      if (err.response) {
        console.error("🧱 Backend returned:", err.response.status, err.response.data);
      } else {
        console.error("⚠️ Network or CORS error:", err.message);
      }

      alert("Request failed! Check console for details.");
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "10%",
        color: "white",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h1>☕ Echo+ Voice Order Test</h1>

      <p>
        Backend:{" "}
        <span style={{ color: "#6cf" }}>
          {import.meta.env.VITE_API_BASE ||
            "http://localhost:3000/dev"}
        </span>
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Try: medium iced Golden Eagle"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "400px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #444",
            fontSize: "16px",
          }}
        />

        <br />

        <button
          type="submit"
          style={{
            marginTop: "15px",
            padding: "10px 22px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#ddd",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Send Order
        </button>
      </form>

      {response && (
        <div
          style={{
            backgroundColor: "#111",
            color: "#0f0",
            margin: "30px auto",
            padding: "20px",
            width: "60%",
            borderRadius: "10px",
            textAlign: "left",
          }}
        >
          <h3>✅ Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
