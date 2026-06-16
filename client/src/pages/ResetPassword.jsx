import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import axios from "axios";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:3000/api/auth/reset-password",
        {
          token,
          password,
        }
      );

      alert("Password reset successfully");
      navigate("/login");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-yellow-500/10 blur-[120px] rounded-full top-20 left-20"></div>
      <div className="absolute w-96 h-96 bg-yellow-500/10 blur-[120px] rounded-full bottom-20 right-20"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[#111111] border border-yellow-500/20 rounded-3xl p-8 shadow-2xl backdrop-blur-lg">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-yellow-500 text-black w-14 h-14 rounded-xl flex items-center justify-center font-bold text-2xl">
              ✂
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white text-center">
            Reset Password
          </h1>

          <p className="text-gray-400 text-center mt-2 mb-8">
            Create a new password for your account
          </p>

          <form
            onSubmit={handleResetPassword}
            className="space-y-5"
          >
            <div>
              <label className="text-gray-300 text-sm block mb-2">
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-black border border-gray-700 focus:border-yellow-500 outline-none rounded-xl px-4 py-3 text-white"
                required
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm block mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full bg-black border border-gray-700 focus:border-yellow-500 outline-none rounded-xl px-4 py-3 text-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-yellow-500/20"
            >
              {loading
                ? "Updating Password..."
                : "Reset Password"}
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => navigate("/login")}
              className="text-yellow-500 hover:text-yellow-400 text-sm"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;