const DEV_LOCAL = true;

export const API_URL = __DEV__ && DEV_LOCAL
  ? "http://localhost:9080/api"
  : __DEV__
  ? "https://your-staging-server.example.com/api"
  : "https://your-production-server.example.com/api";

export const API_ROUTE_REGISTER = `${API_URL}/Register`;
export const API_ROUTE_LOGIN = `${API_URL}/Login`;
