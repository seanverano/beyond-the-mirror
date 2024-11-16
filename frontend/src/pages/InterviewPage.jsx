import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const InterviewPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F2E8]">
      <header className="bg-[#5F4B3A] text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-white hover:text-white/80"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <div className="flex items-center space-x-4"></div>
        </div>
      </header>
    </div>
  );
};

export default InterviewPage;
