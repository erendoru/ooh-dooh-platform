"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { supabase } from "@/lib/supabase";
import { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isBillboardOwner: boolean;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isBillboardOwner: false,
  loading: true,
  error: null,
  refreshUser: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isBillboardOwner, setIsBillboardOwner] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setSession(session);
        setUser(session.user);

        const { data, error } = await supabase
          .from("profiles")
          .select("is_billboard_owner")
          .eq("id", session.user.id)
          .single();

        if (error) throw error;
        setIsBillboardOwner(data?.is_billboard_owner || false);
      } else {
        setUser(null);
        setSession(null);
        setIsBillboardOwner(false);
      }
    } catch (error) {
      console.error("Error refreshing user:", error);
      setError("Failed to load user data. Please try again.");
      setUser(null);
      setSession(null);
      setIsBillboardOwner(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      await refreshUser();

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          await refreshUser();
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setSession(null);
          setIsBillboardOwner(false);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    };

    initializeAuth();

    window.addEventListener("focus", refreshUser);

    return () => {
      window.removeEventListener("focus", refreshUser);
    };
  }, [refreshUser]);

  return (
    <AuthContext.Provider
      value={{ user, session, isBillboardOwner, loading, error, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
