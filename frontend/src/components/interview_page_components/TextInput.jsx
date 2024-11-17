import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const TextInput = ({ value, onChange, onSubmit, isSubmitting }) => {
  return (
    <Card className="bg-[#FCF9F4]">
      <CardContent className="p-6">
        <div className="space-y-4">
          <textarea
            className="w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5F4B3A]"
            placeholder="Type your answer here..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="flex justify-end">
            <Button
              className="bg-[#5F4B3A] hover:bg-[#4A3829]"
              onClick={onSubmit}
              disabled={!value.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white mr-2" />
                  Submitting...
                </div>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Answer
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextInput;
