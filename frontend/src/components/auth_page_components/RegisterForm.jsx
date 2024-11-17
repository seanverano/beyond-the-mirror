import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RegisterForm = ({
  registerData,
  setRegisterData,
  handleRegister,
  isLoading,
  error,
}) => {
  return (
    <form onSubmit={handleRegister} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}
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
  );
};

export default RegisterForm;
