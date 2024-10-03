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
    <div className="flex flex-col min-h-screen">
      <AuthProvider>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footbar />
      </AuthProvider>
    </div>
  );
}
