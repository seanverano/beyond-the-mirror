import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import QuestionForm from "../dash_page_component/QuestionForm";
import QuestionList from "../dash_page_component/QuestionList";

const QuestionCard = ({
  questions,
  newQuestion,
  isAddingQuestion,
  editingQuestion,
  editedText,
  onAddQuestion,
  onQuestionChange,
  onStartEditing,
  onCancelEditing,
  onUpdateQuestion,
  onDeleteQuestion,
  onEditChange,
}) => {
  return (
    <Card className="bg-[#FCF9F4]">
      <CardHeader>
        <CardTitle className="font-jakarta text-xl text-[#5F4B3A]">
          Manage Questions
        </CardTitle>
        <p className="text-[#000000]/70 font-jakarta">
          Create, update, or delete your questions.
        </p>
      </CardHeader>
      <CardContent>
        <QuestionForm
          newQuestion={newQuestion}
          isAddingQuestion={isAddingQuestion}
          onAddQuestion={onAddQuestion}
          onQuestionChange={onQuestionChange}
        />
        <div className="space-y-2">
          {questions.map((question) => (
            <QuestionList
              key={question._id}
              question={question}
              editingQuestion={editingQuestion}
              editedText={editedText}
              onEditChange={onEditChange}
              onStartEditing={onStartEditing}
              onCancelEditing={onCancelEditing}
              onUpdateQuestion={onUpdateQuestion}
              onDeleteQuestion={onDeleteQuestion}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
