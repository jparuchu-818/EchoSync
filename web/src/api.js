import axios from 'axios'

// Set this in your Amplify env or local .env file
export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/dev';

export async function orderSync(text){
  const { data } = await axios.post(`${API_BASE}/orderSync`, { text });
  return data;
}
export async function relationshipSync(customer_id){
  const { data } = await axios.post(`${API_BASE}/relationshipSync`, { customer_id });
  return data;
}
export async function smartWhisper(customer_id, signals){
  const { data } = await axios.post(`${API_BASE}/smartWhisper`, { customer_id, signals });
  return data;
}
export async function memoryCapture(payload){
  const { data } = await axios.post(`${API_BASE}/memoryCapture`, payload);
  return data;
}
