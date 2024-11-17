import { Card, CardContent } from "@/components/ui/card";

const QuestionCard = ({ question, currentIndex, totalQuestions }) => {
  return (
    <Card className="mb-6 bg-[#FCF9F4]">
      <CardContent className="p-6">
        <h2 className="font-jakarta text-xl font-semibold mb-2">
          {question?.text || "Loading question..."}
        </h2>
        <p className="text-sm text-gray-500">
          Question {currentIndex + 1} of {totalQuestions}
        </p>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
