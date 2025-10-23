import axios from "axios";

export const API_BASE =
  import.meta.env.VITE_API_BASE ||
  "https://wtqjry80si.execute-api.us-west-2.amazonaws.com/dev";

export async function orderSync(text) {
  console.log("🚀 API_BASE =", API_BASE);
  console.log("📦 Sending payload:", { text });

  try {
    const response = await axios.post(
      `${API_BASE}/order`,
      { text },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Lambda response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ OrderSync error:", error);
    if (error.response) {
      console.error("🧱 Lambda responded with:", error.response.status, error.response.data);
    } else {
      console.error("⚠️ Network error:", error.message);
    }
    throw error;
  }
}
