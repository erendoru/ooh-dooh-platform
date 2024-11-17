"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { ComponentType } from "react";

type WithAuthProps = {
  user: User;
};

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P & WithAuthProps>,
  allowedRoles: string[] = []
) => {
  const WithAuthComponent = (props: Omit<P, keyof WithAuthProps>) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const checkUser = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

          if (
            profile &&
            (!allowedRoles.length || allowedRoles.includes(profile.role))
          ) {
            setUser(user);
          } else {
            router.push("/unauthorized");
          }
        } else {
          router.push("/login");
        }
      };

      checkUser();
    }, [router]);

    if (!user) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...(props as P)} user={user} />;
  };

  WithAuthComponent.displayName = `WithAuth(${getDisplayName(
    WrappedComponent
  )})`;
  return WithAuthComponent;
};

function getDisplayName(WrappedComponent: ComponentType<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withAuth;
