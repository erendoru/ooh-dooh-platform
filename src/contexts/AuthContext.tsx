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
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{ session, user, userType, signIn, signOut, isBillboardOwner }}
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
