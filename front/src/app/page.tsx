"use client";
import { HeaderSignedOut } from "./(user)/_components/HeaderSingedOut";
import { useAuth } from "./_providers/AuthProvider";
import { HeaderSignedIn } from "./(user)/_components/HeaderSignedIn";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Payment } from "./(user)/_components/Payment";
import { CompletePro } from "./(user)/_components/CompletePro";

export default function Home() {
  const { user } = useAuth();
  const [step, setStep] = useState<"profile" | "payment">("profile");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (user?.profile?.id) {
      setStep("payment");
    } else {
      setStep("profile");
    }

    if (user?.bankcards?.length && user.bankcards.length > 0) {
      router.push("/Home");
    }
    setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }
  return (
    <div className="w-screen flex justify-center">
      {user ? (
        <div>
          <HeaderSignedIn />
          <div className="flex-1 flex justify-center items-center">
            {step === "profile" && (
              <CompletePro onComplete={() => setStep("payment")} />
            )}
            {step === "payment" && <Payment />}
          </div>
        </div>
      ) : (
        <HeaderSignedOut />
      )}
    </div>
  );
}
