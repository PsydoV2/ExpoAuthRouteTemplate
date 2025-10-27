import { useSession } from "../context/AuthContext";
import { useToast } from "../context/ToastProvider";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export function useApi() {
  const { session } = useSession();
  const { showToast } = useToast();

  async function callApi<T = any>(
    route: string,
    method: HttpMethod = "GET",
    body?: any
  ): Promise<T | null> {
    try {
      const response = await fetch(route, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session}`,
        },
        ...(method !== "GET" && body ? { body: JSON.stringify(body) } : {}),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const msg = data?.message ?? `Request failed (${response.status})`;
        console.error(msg);
        showToast(msg, "error", 5000);
        return null;
      }

      return data as T;
    } catch (error) {
      console.error(error);
      showToast(`${error}`, "error", 5000);
      return null;
    }
  }

  async function callAuthentication<T = any>(
    route: string,
    method: HttpMethod = "GET",
    body?: any
  ): Promise<T | null> {
    try {
      const response = await fetch(route, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        ...(method !== "GET" && body ? { body: JSON.stringify(body) } : {}),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const msg = data?.message ?? `Request failed (${response.status})`;
        console.error(msg);
        showToast(msg, "error", 5000);
        return null;
      }

      return data as T;
    } catch (error) {
      console.error(error);
      showToast(`${error}`, "error", 5000);
      return null;
    }
  }

  return { callApi, callAuthentication };
}
