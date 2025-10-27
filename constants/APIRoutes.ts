export let API_URL: string;
const useLocalHost = true;

if (__DEV__ && useLocalHost) {
  API_URL = "http://192.168.188.54:9080/api";
} else if (__DEV__) {
  API_URL = "https://tastysnap.org:9444/api";
} else {
  API_URL = "https://tastysnap.org:7444/api";
}

export const API_ROUTE_REGISTER = `${API_URL}/Register`;
export const API_ROUTE_LOGIN = `${API_URL}/Login`;
