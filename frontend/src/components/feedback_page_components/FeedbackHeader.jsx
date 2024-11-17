import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const FeedbackHeader = ({ onNavigate }) => (
  <header className="bg-[#5F4B3A] text-white p-4">
    <div className="max-w-7xl mx-auto flex items-center">
      <Button
        variant="ghost"
        className="text-white hover:text-[#5F4B3A] hover:bg-[#F8F2E8] font-vt text-2xl font-normal"
        onClick={onNavigate}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Dashboard
      </Button>
    </div>
  </header>
);

export default FeedbackHeader;
