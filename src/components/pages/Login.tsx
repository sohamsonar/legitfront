import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    console.log("[Auth] Login started");
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://goods.abisexport.com/legit/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: Username,      // backend expects `username`
            password: password,
          }),
        }
      );

      console.log("[Auth] Login response status:", res.status);

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      console.log("[Auth] Login success:", data);

      // store token for now
      localStorage.setItem("access_token", data.access_token);

      console.log("[Auth] Token stored, navigating to /upload");
      navigate("/upload");

    } catch (err) {
      console.error("[Auth] Login failed:", err);
      setError("Login failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="flex bg-white items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
        <div className="xl:mx-auto xl:w-full shadow-md p-4 xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account? Create a free account
          </p>

          <form
            className="mt-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-5">
              <div>
                <label className="text-base font-medium text-gray-900">
                  Username address
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Username"
                    type="text"
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-base font-medium text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500">
                  {error}
                </p>
              )}

              <div>
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold text-white hover:bg-black/80 disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Get started"}
                </button>
              </div>
            </div>
          </form>

          <div className="mt-3 space-y-3">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 hover:bg-gray-100"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
