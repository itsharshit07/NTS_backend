import React, { useState, useEffect } from "react";
import { useSignIn, useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, setActive, isLoaded } = useSignIn();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const { signOut } = useClerk();

  // ✅ Handle redirect callback from Google login
  useEffect(() => {
    const handleRedirect = async () => {
      if (!isLoaded) return;

      try {
        const result = await signIn.handleRedirectCallback();
        if (result?.createdSessionId) {
          await setActive({ session: result.createdSessionId });
          navigate("/");
        }
      } catch (err) {
        console.error("Redirect login failed:", err);
      }
    };

    handleRedirect();
  }, [isLoaded, signIn, setActive, navigate]);

  // ✅ Redirect to home if already signed in
  useEffect(() => {
    if (isSignedIn) navigate("/");
  }, [isSignedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!isLoaded) return;

    try {
      const result = await signIn.create({ identifier: email, password });
      await setActive({ session: result.createdSessionId });
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      await signIn.authenticateWithRedirect({
        strategy: `oauth_${provider}`,
        redirectUrl: "/login", // must match route
      });
    } catch (err) {
      console.error("Social login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f3fc] px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-10">
          <h2 className="text-2xl font-bold text-[#6B5AED] mb-4">Login</h2>
          <h3 className="text-lg font-semibold mb-6">Begin your journey</h3>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="example.email@gmail.com"
              className="w-full p-3 border rounded bg-gray-100 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter at least 8+ characters"
                className="w-full p-3 border rounded bg-gray-100 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 text-sm"
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>

            <div className="flex items-center text-xs text-gray-500">
              <input type="checkbox" required className="mr-2 accent-orange-500" />
              By signing in, I agree with the{" "}
              <a href="#" className="text-orange-500 ml-1 underline">
                Terms of Use & Privacy Policy
              </a>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#6B5AED] text-white p-3 rounded hover:bg-indigo-700 transition text-sm"
            >
              Login
            </button>
          </form>

          <div className="my-6 flex items-center gap-2 text-gray-400 text-sm">
            <div className="flex-grow border-t" /> OR <div className="flex-grow border-t" />
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleSocialLogin("google")}
              className="bg-gray-100 p-3 rounded-full hover:bg-gray-200"
            >
              <FaGoogle className="text-red-500 text-lg" />
            </button>
            <button
              onClick={() => handleSocialLogin("facebook")}
              className="bg-gray-100 p-3 rounded-full hover:bg-gray-200"
            >
              <FaFacebookF className="text-blue-600 text-lg" />
            </button>
            <button
              onClick={() => handleSocialLogin("apple")}
              className="bg-gray-100 p-3 rounded-full hover:bg-gray-200"
            >
              <FaApple className="text-black text-lg" />
            </button>
          </div>

          <p className="text-sm text-center mt-6 text-gray-500">
            New user?{" "}
            <a href="/sign" className="text-blue-600 font-medium underline">
              Register here
            </a>
          </p>
        </div>

        <div className="bg-gradient-to-t from-orange-300 to-pink-100 flex items-center justify-center px-8 py-10 text-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Glad to see you here!
            </h3>
            <p className="text-sm text-gray-600">
              Login to start your career journey with Kaamigo...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
