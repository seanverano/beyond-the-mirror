import { Button } from "@/components/ui/button";
import { Mic, Type } from "lucide-react";

const ResponseTypeSelector = ({ onSelectMode }) => {
  return (
    <>
      <p className="text-center mb-4 text-[#000000] font-jakarta">
        Choose your response method:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          className="h-32 bg-[#5F4B3A] hover:bg-[#4A3829]"
          onClick={() => onSelectMode("text")}
        >
          <div className="flex flex-col items-center">
            <Type className="h-8 w-8 mb-2" />
            <span className="font-jakarta text-lg">Type Response</span>
          </div>
        </Button>
        <Button
          className="h-32 bg-[#5F4B3A] hover:bg-[#4A3829]"
          onClick={() => onSelectMode("voice")}
        >
          <div className="flex flex-col items-center">
            <Mic className="h-8 w-8 mb-2" />
            <span className="font-jakarta text-lg">Voice Response</span>
          </div>
        </Button>
      </div>
    </>
  );
};

export default ResponseTypeSelector;
