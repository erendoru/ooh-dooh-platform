"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footbar from "@/components/Footbar";
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Navbar />
      {children}
      <Footbar />
    </AuthProvider>
  );
}
