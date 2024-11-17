import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import auth_hero from "../assets/auth_hero.png";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [error, setError] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:1016/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:1016/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: registerData.email,
            password: registerData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      localStorage.setItem("token", data.token);
      setIsRegisterOpen(false);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center bg-[#F8F2E8] h-screen">
        <div className="flex w-full h-full bg-[#F8F2E8] shadow-md m-0">
          <div className="w-1/2 flex flex-col justify-center items-center h-full bg-[#F8F2E8]">
            <img
              src={auth_hero}
              alt="Auth Page Hero Image"
              className="w-[75%] h-[75%] object-contain"
            />
            <h1 className="font-jakarta text-xl font-bold text-[#5F4B3A]">
              Practice beyond your reflection.
            </h1>
            <h1 className="font-jakarta text-xl font-bold text-[#5F4B3A]">
              Let AI perfect your performance.
            </h1>
          </div>

          <div className="font-noto w-1/2 flex justify-center items-center p-8 h-full">
            <Card className="w-full max-w-md p-6 bg-[#FCF9F4]">
              <h1 className="font-vt text-4xl font-normal text-center text-[#000000] mb-2">
                BeyondTheMirror AI
              </h1>
              <h2 className="font-jakarta text-base font-semibold text-center mb-6 text-[#000000]/50">
                Log in to begin your mock interview!
              </h2>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                  {error}
                </div>
              )}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    placeholder="Email"
                    type="email"
                    required
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Input
                    placeholder="Password"
                    type="password"
                    required
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                  />
                </div>
                <div className="font-jakarta text-base font-semibold text-center mb-6 text-[#000000]/50">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsRegisterOpen(true)}
                    className="text-[#000000] hover:underline"
                  >
                    Sign up
                  </button>
                </div>
                <Button
                  className="w-full mt-4 bg-[#5F4B3A]"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogContent className="bg-[#FCF9F4] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-vt text-4xl text-center font-normal">
              Create Account
            </DialogTitle>
            <h2 className="font-jakarta text-base font-semibold text-center mb-6 text-[#000000]/50">
              Once you register, you’ll automatically be logged in.
            </h2>
          </DialogHeader>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Input
                placeholder="Email"
                type="email"
                required
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
              />
            </div>
            <div>
              <Input
                placeholder="Password"
                type="password"
                required
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
              />
            </div>
            <div>
              <Input
                placeholder="Confirm Password"
                type="password"
                required
                value={registerData.confirmPassword}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
            <Button
              className="w-full bg-[#5F4B3A]"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Register"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthPage;
