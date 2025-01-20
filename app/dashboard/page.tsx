'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/signin');
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold">Hello, welcome to dashboard</h1>
      <Button onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}


