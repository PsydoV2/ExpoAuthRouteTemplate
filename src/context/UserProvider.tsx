import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DTOUser } from "../types/DTOUser";

type UserContextValue = {
  user: DTOUser | null;
  isLoading: boolean;
  /** Setzt den kompletten User (z. B. nach Login) und speichert ihn. */
  setUser: (u: DTOUser) => Promise<void>;
  /** Aktualisiert nur die angegebenen Felder (merge) und speichert. */
  updateUser: (patch: Partial<DTOUser>) => Promise<void>;
  /** Löscht den gespeicherten User (Logout). */
  clearUser: () => Promise<void>;
};

const STORAGE_KEY = "beerhunter_user";
const UserContext = createContext<UserContextValue | undefined>(undefined);

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside <UserProvider>");
  return ctx;
}

export function UserProvider({ children }: React.PropsWithChildren) {
  const [user, setUserState] = useState<DTOUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed: DTOUser = JSON.parse(raw);
          setUserState(parsed);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const persist = useCallback(async (value: DTOUser | null) => {
    if (value) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } else {
      await AsyncStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const setUser = useCallback(
    async (u: DTOUser) => {
      setUserState(u);
      await persist(u);
    },
    [persist]
  );

  const updateUser = useCallback(
    async (patch: Partial<DTOUser>) => {
      const next = { ...(user ?? ({} as DTOUser)), ...patch } as DTOUser;
      setUserState(next);
      await persist(next);
    },
    [user, persist]
  );

  const clearUser = useCallback(async () => {
    setUserState(null);
    await persist(null);
  }, [persist]);

  const value = useMemo<UserContextValue>(
    () => ({
      user,
      isLoading,
      setUser,
      updateUser,
      clearUser,
    }),
    [user, isLoading, setUser, updateUser, clearUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
