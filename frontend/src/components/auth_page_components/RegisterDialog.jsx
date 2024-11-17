import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RegisterForm from "./RegisterForm";

const RegisterDialog = ({
  isOpen,
  onOpenChange,
  registerData,
  setRegisterData,
  handleRegister,
  isLoading,
  error,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#FCF9F4] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-vt text-4xl text-center font-normal">
            Create Account
          </DialogTitle>
          <h2 className="font-jakarta text-base font-semibold text-center mb-6 text-[#000000]/50">
            Once you register, you'll automatically be logged in.
          </h2>
        </DialogHeader>
        <RegisterForm
          registerData={registerData}
          setRegisterData={setRegisterData}
          handleRegister={handleRegister}
          isLoading={isLoading}
          error={error}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
