import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Loader2 } from "lucide-react";

const QuestionForm = ({
  newQuestion,
  isAddingQuestion,
  onAddQuestion,
  onQuestionChange,
}) => {
  return (
    <form onSubmit={onAddQuestion} className="flex gap-2 mb-4">
      <Input
        placeholder="Add a new question"
        value={newQuestion}
        onChange={(e) => onQuestionChange(e.target.value)}
        className="flex-1"
        disabled={isAddingQuestion}
      />
      <Button
        type="submit"
        className="bg-[#5F4B3A] hover:bg-[#4A3829] disabled:opacity-50"
        disabled={isAddingQuestion}
      >
        {isAddingQuestion ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
};

export default QuestionForm;
