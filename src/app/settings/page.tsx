"use client";

import withAuth from "@/components/withAuth";
import { User } from "@supabase/supabase-js";

interface SettingsProps {
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ayarlar</h1>
      <p>Burası {user.email} için ayarlar sayfasıdır.</p>
      {/* Ayarlar formunu veya içeriğini buraya ekleyin */}
    </div>
  );
};

export default withAuth(Settings);
