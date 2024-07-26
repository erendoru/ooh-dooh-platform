"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  isBillboardOwner: boolean;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isBillboardOwner: false,
  loading: true,
  refreshUser: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isBillboardOwner, setIsBillboardOwner] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
      const { data } = await supabase
        .from("profiles")
        .select("is_billboard_owner")
        .eq("id", user.id)
        .single();

      setIsBillboardOwner(data?.is_billboard_owner || false);
    } else {
      setUser(null);
      setIsBillboardOwner(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        await refreshUser();
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [refreshUser]);

  return (
    <AuthContext.Provider
      value={{ user, isBillboardOwner, loading, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
