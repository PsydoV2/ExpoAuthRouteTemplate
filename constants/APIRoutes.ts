// Configure via EXPO_PUBLIC_API_URL in your .env file (see .env.example).
// Falls back to a local dev backend if unset.
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:9080/api";

export const API_ROUTE_REGISTER = `${API_URL}/Register`;
export const API_ROUTE_LOGIN = `${API_URL}/Login`;
