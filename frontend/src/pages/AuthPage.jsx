import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import auth_hero from "../assets/auth_hero.png";

const AuthPage = () => {
  return (
    <>
      <div className="flex items-center justify-center bg-[#F8F2E8] h-screen">
        <div className="flex w-full h-full bg-[#F8F2E8] shadow-md m-0">
          <div className="w-1/2 flex flex-col justify-center items-center h-full bg-[#F8F2E8]">
            <img
              src={auth_hero}
              alt="BeyondTheMirror AI Logo"
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
              <form className="space-y-4">
                <div>
                  <Input placeholder="Email" type="email" required />
                </div>

                <div>
                  <Input placeholder="Password" type="password" required />
                </div>
                <div className="font-jakarta text-base font-semibold text-center mb-6 text-[#000000]/50">
                  Don’t have an account?{" "}
                  <span className="text-[#000000]">Sign up</span>
                </div>
                <Button className="w-full mt-4 bg-[#5F4B3A]">Sign In</Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
