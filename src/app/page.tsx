"use client";

import React, { useState } from "react";
import Image from "next/image";
import loginImg from "../../public/login.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from '@/storage/authStore';
import { login } from '@/api/authService';
import Toast from "@/components/Toast";
import Loading from '@/components/Loading';
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "negative" | "positive" | "information" } | null>(null);
  const { setToken } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    setToast(null);
    try {
      const token = await login({ username, password });
      setToken(token);
      router.push('/dashboard')      
    } catch (error) {
      setToast({ message: "Error al autenticarte. Intenta de nuevo." + error, type: "negative" });
    } finally {
      setLoading(false);
    }
  };

  const form = (
    <form className="p-6 space-y-4">
      <input
        placeholder="Email"
        type="email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-4 py-2 border-b-2 bg-inherit"
        required
      />
      <div className="relative flex items-center space-x-2">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          className="w-full px-4 py-2 border-b-2 bg-inherit"
          required
        />
        <label className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {showPassword ? (
              <FaEyeSlash
                className="cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEye
                className="cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </span>
        </label>
      </div>
      <button
        type="submit"
        className="w-full p-2 rounded"
        onClick={handleSubmit}
        >
        Sign Up
      </button>
    </form>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">

      {loading && <Loading />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        
      <div className="w-full max-w-md overflow-hidden shadow-sm md:hidden p-2">
        <div className="flex flex-col items-center justify-center p-6">
          <div className="w-32 h-32 overflow-hidden rounded-full shadow-lg">
            <Image
              src={loginImg}
              alt="Technology"
              className="w-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold">DashBoard</h2>
        </div>
        {form}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex w-full h-screen overflow-hidden shadow-lg">
        <div className="w-1/2 h-full bg-purple-500 flex flex-col items-center justify-center text-white p-8">
          <h2 className="text-2xl font-bold mb-4">DashBoard</h2>
          <p>Join and innovate with us</p>
        </div>
        <div className="w-1/2 h-full p-8 flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold mb-6">Sign Up</h2>
          {form}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
