import { useEffect, useState } from "react";

type HealthStatus = "checking" | "ok" | "error";

interface HealthGateProps {
  children: React.ReactNode;
}

export default function HealthGate({ children }: HealthGateProps) {
  const [status, setStatus] = useState<HealthStatus>("checking");

  useEffect(() => {
    console.log("[Health] Checking backend health...");

    fetch("https://goods.abisexport.com/legit/health")
      .then((res) => {
        console.log("[Health] Response status:", res.status);
        if (!res.ok) throw new Error("Health check failed");
        return res.json();
      })
      .then((data) => {
        console.log("[Health] Response body:", data);

        if (data.status === "ok") {
          console.log("[Health] Backend is healthy ✅");
          setStatus("ok");
        } else {
          console.warn("[Health] Backend returned non-ok status ❌");
          setStatus("error");
        }
      })
      .catch((err) => {
        console.error("[Health] Health check error:", err);
        setStatus("error");
      });
  }, []);

  if (status === "checking") {
    return <div className="min-h-screen flex items-center justify-center">Checking system health…</div>;
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        System is unavailable. Please try again later.
      </div>
    );
  }

  return <>{children}</>;
}
