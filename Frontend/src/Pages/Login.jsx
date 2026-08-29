import { useState } from "react";
import { useAuth } from "../authentication/AuthContext";
import {
  Anchor,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShipWheel,
  Sparkles,
} from "lucide-react";

const Login = () => {
  const { login } = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setIsSubmitting(true);

      await login(credentials);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#07111f] px-4 py-8 text-white sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="absolute -bottom-40 -right-32 h-[30rem] w-[30rem] rounded-full bg-amber-400/10 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      {/* Decorative compass */}
      <ShipWheel className="pointer-events-none absolute -left-12 top-20 h-40 w-40 rotate-12 text-amber-400/5 sm:h-56 sm:w-56" />

      <Anchor className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 -rotate-12 text-cyan-400/5 sm:h-64 sm:w-64" />

      {/* Main */}
      <main className="relative m-auto w-full max-w-md">
        {/* Brand */}
        <div className="mb-7 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 shadow-lg shadow-amber-500/10">
            <ShipWheel className="h-8 w-8 text-amber-400" />
          </div>

          <div className="mb-2 flex items-center justify-center gap-2">
            <Anchor className="h-3.5 w-3.5 text-amber-400" />

            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">
              Grand Line
            </span>

            <Anchor className="h-3.5 w-3.5 rotate-180 text-amber-400" />
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            LogBook
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Welcome back, Captain. Your treasure awaits.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-white/10 bg-[#0d1b2c]/95 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
          {/* Card heading */}
          <div className="mb-7">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />

              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Captain's Access
              </span>
            </div>

            <h2 className="mt-2 text-2xl font-bold text-white">
              Set Sail Again
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Sign in to access your financial LogBook.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-300"
              >
                Email
              </label>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="captain@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#07111f] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-300"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#07111f] py-3.5 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 transition hover:text-amber-400"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3">
                <p className="text-center text-sm font-medium text-red-300">
                  {error}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-3.5 text-sm font-black text-[#07111f] shadow-lg shadow-amber-500/10 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#07111f]/30 border-t-[#07111f]" />
                  Opening LogBook...
                </>
              ) : (
                <>
                  <ShipWheel className="h-4 w-4 transition-transform group-hover:rotate-90" />
                  Enter the LogBook
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-7 flex items-center justify-center gap-2 border-t border-white/5 pt-5">
            <Anchor className="h-3.5 w-3.5 text-slate-600" />

            <p className="text-xs text-slate-600">
              Your journey. Your treasure. Your LogBook.
            </p>
          </div>
        </div>

        {/* Bottom text */}
        <p className="mt-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-slate-700">
          Navigate your finances • Rule your treasure
        </p>
      </main>
    </div>
  );
};

export default Login;
