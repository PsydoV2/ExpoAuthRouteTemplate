import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/** Persistenter State Hook: [[isLoading, value], setValue] */
export function useStorageState<T = unknown>(key: string) {
  const [state, setState] = useState<[boolean, T | null]>([true, null]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(key);
        const parsed = raw ? (JSON.parse(raw) as T) : null;
        if (active) setState([false, parsed]);
      } catch (e) {
        console.error(`[useStorageState] read error for "${key}":`, e);
        if (active) setState([false, null]);
      }
    })();
    return () => {
      active = false;
    };
  }, [key]);

  const setValue = useCallback(
    async (value: T | null) => {
      try {
        if (value === null || value === undefined) {
          await AsyncStorage.removeItem(key);
          setState(([_, __]) => [false, null]);
        } else {
          await AsyncStorage.setItem(key, JSON.stringify(value));
          setState(([_, __]) => [false, value]);
        }
      } catch (e) {
        console.error(`[useStorageState] write error for "${key}":`, e);
      }
    },
    [key]
  );

  return [state, setValue] as const;
}
