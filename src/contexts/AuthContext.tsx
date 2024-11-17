"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { getUserType } from "@/lib/userUtils";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userType: "billboard_owner" | "customer" | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isBillboardOwner: boolean;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<
    "billboard_owner" | "customer" | null
  >(null);
  const [isBillboardOwner, setIsBillboardOwner] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        getUserType(session.user.id).then((type) => {
          setUserType(type);
          setIsBillboardOwner(type === "billboard_owner");
        });
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        getUserType(session.user.id).then((type) => {
          setUserType(type);
          setIsBillboardOwner(type === "billboard_owner");
        });
      } else {
        setUserType(null);
        setIsBillboardOwner(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Giriş yapılırken bir hata oluştu.");
      }
    } finally {
      setLoading(false);
    }
  };
  const signOut = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Çıkış yapılırken bir hata oluştu.");
      }
    } finally {
      setLoading(false);
    }
  };
  const refreshUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const type = await getUserType(user.id);
        setUserType(type);
        setIsBillboardOwner(type === "billboard_owner");
      }
    } catch (error) {
      setError("Kullanıcı bilgileri yenilenemedi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userType,
        signIn,
        signOut,
        isBillboardOwner,
        loading,
        error,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
