import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import LoginForm from "../components/auth_page_components/LoginForm";
import RegisterDialog from "../components/auth_page_components/RegisterDialog";
import HeroSection from "../components/auth_page_components/HeroSection";

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
    <div className="flex items-center justify-center bg-[#F8F2E8] h-screen">
      <div className="flex w-full h-full bg-[#F8F2E8] shadow-md m-0">
        <HeroSection />

        <div className="font-noto w-1/2 flex justify-center items-center p-8 h-full">
          <Card className="w-full max-w-md p-6 bg-[#FCF9F4]">
            <h1 className="font-vt text-4xl font-normal text-center text-[#000000] mb-2">
              BeyondTheMirror AI
            </h1>
            <h2 className="font-jakarta text-base font-semibold text-center mb-6 text-[#000000]/50">
              Log in to begin your mock interview!
            </h2>

            <LoginForm
              loginData={loginData}
              setLoginData={setLoginData}
              handleLogin={handleLogin}
              isLoading={isLoading}
              error={error}
            />

            <div className="font-jakarta text-base font-semibold text-center mt-4 text-[#000000]/50">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setIsRegisterOpen(true)}
                className="text-[#000000] hover:underline"
              >
                Sign up
              </button>
            </div>
          </Card>
        </div>
      </div>

      <RegisterDialog
        isOpen={isRegisterOpen}
        onOpenChange={setIsRegisterOpen}
        registerData={registerData}
        setRegisterData={setRegisterData}
        handleRegister={handleRegister}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default AuthPage;
