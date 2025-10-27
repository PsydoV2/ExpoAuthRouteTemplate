import React, { createContext, useCallback, useContext, useMemo } from "react";
import { useStorageState } from "../hooks/useStorageState";

const SESSION_KEY = "session";
type Session = string | null;

type AuthContextValue = {
  isAuthenticated: boolean;
  session: Session;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useSession() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useSession must be used inside <SessionProvider>");
  return ctx;
}

export function SessionProvider({ children }: React.PropsWithChildren) {
  const [[isLoading, session], setSession] =
    useStorageState<Session>(SESSION_KEY);

  const signIn = useCallback(
    async (token: string) => {
      setSession(token);
    },
    [setSession]
  );

  const signOut = useCallback(async () => {
    setSession(null);
  }, [setSession]);

  const value = useMemo(
    () => ({
      isAuthenticated: !!session,
      session,
      isLoading,
      signIn,
      signOut,
    }),
    [session, isLoading, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
