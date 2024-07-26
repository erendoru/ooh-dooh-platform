"use client";

import withAuth from "@/components/withAuth";
import { User } from "@supabase/supabase-js";

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Hoş geldiniz, {user.email}!</p>
      {/* Dashboard içeriğini buraya ekleyin */}
    </div>
  );
};

export default withAuth(Dashboard);
