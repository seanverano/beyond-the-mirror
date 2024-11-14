import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AuthPage = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex w-full max-w-screen-xl bg-white shadow-md">
          <div className="w-1/2 flex justify-center items-center bg-blue-500">
            <img
              src="https://via.placeholder.com/150"
              alt="Logo"
              className="w-32 h-32 object-contain"
            />
          </div>

          <div className="w-1/2 flex justify-center items-center p-8">
            <Card className="w-full max-w-md p-6">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Sign In
              </h2>
              <form className="space-y-4">
                <div>
                  <Input placeholder="Email" type="email" required />
                </div>

                <div>
                  <Input placeholder="Password" type="password" required />
                </div>

                <Button className="w-full mt-4">Sign In</Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
