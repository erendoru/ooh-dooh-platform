"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "billboard_owner" | "customer";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { user, isBillboardOwner, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (requiredRole === "billboard_owner" && !isBillboardOwner) {
        router.push("/unauthorized");
      }
    }
  }, [user, isBillboardOwner, loading, router, requiredRole]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || (requiredRole === "billboard_owner" && !isBillboardOwner)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
