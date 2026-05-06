import { useSession } from "../context/AuthContext";
import { useToast } from "../context/ToastProvider";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export function useApi() {
  const { session } = useSession();
  const { showToast } = useToast();

  async function request<T = unknown>(
    route: string,
    method: HttpMethod,
    body: unknown,
    authenticated: boolean
  ): Promise<T | null> {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (authenticated && session) {
        headers["Authorization"] = `Bearer ${session}`;
      }

      const response = await fetch(route, {
        method,
        headers,
        ...(method !== "GET" && body !== undefined ? { body: JSON.stringify(body) } : {}),
      });

      const data: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const msg =
          (data as Record<string, unknown> | null)?.message ??
          `Request failed (${response.status})`;
        console.error(msg);
        showToast(`${msg}`, "error", 5000);
        return null;
      }

      return data as T;
    } catch (error) {
      console.error(error);
      showToast(`${error}`, "error", 5000);
      return null;
    }
  }

  return {
    callApi: <T = unknown>(route: string, method: HttpMethod = "GET", body?: unknown) =>
      request<T>(route, method, body, true),
    callAuthentication: <T = unknown>(route: string, method: HttpMethod = "GET", body?: unknown) =>
      request<T>(route, method, body, false),
  };
}
