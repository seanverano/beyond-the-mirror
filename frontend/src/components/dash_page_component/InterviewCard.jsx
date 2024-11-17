import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Loader2 } from "lucide-react";

const InterviewCard = ({ questions, isStarting, onStartInterview }) => {
  return (
    <Card className="bg-[#FCF9F4]">
      <CardHeader>
        <CardTitle className="font-jakarta text-xl text-[#5F4B3A]">
          Start Interview
        </CardTitle>
        <p className="text-[#000000]/70 font-jakarta">
          Begin your mock interview session with AI-powered feedback.
          {questions.length > 5 && (
            <span className="block text-sm text-orange-500 mt-1">
              Note: Only the first 5 questions will be used in the interview.
            </span>
          )}
        </p>
      </CardHeader>
      <CardContent>
        <Button
          className="w-full bg-[#5F4B3A] hover:bg-[#4A3829] disabled:opacity-50"
          onClick={onStartInterview}
          disabled={isStarting || questions.length === 0}
        >
          {isStarting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Video className="mr-2 h-4 w-4" />
          )}
          {isStarting ? "Starting Session..." : "Start New Session"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default InterviewCard;
