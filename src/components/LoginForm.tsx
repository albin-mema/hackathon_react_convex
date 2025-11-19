import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";


export default function LoginForm() {
  const { login } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const success = await login(email, password);

    if (!success) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    // SUCCESS — no redirect here
    // AppContent will react to user being logged in and switch the view automatically.
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl border flex flex-col gap-4"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Login to ConnectHub
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={password}
        onChange={(e) => setPassword((e.target.value))}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-600 text-white p-2 rounded-lg transition hover:bg-blue-700 
          ${loading && "opacity-50 cursor-not-allowed"}`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
