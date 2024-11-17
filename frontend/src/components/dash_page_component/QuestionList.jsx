import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { List, Pencil, Check, X, Trash2 } from "lucide-react";

const QuestionList = ({
  question,
  editingQuestion,
  editedText,
  onEditChange,
  onStartEditing,
  onCancelEditing,
  onUpdateQuestion,
  onDeleteQuestion,
}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
      <div className="flex items-center flex-1 min-w-0">
        <List className="h-4 w-4 mr-2 flex-shrink-0 text-[#5F4B3A]" />
        {editingQuestion === question._id ? (
          <Input
            value={editedText}
            onChange={(e) => onEditChange(e.target.value)}
            className="flex-1 mr-2"
          />
        ) : (
          <span className="font-jakarta text-sm truncate">{question.text}</span>
        )}
      </div>
      <div className="flex space-x-2 ml-2">
        {editingQuestion === question._id ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="text-green-500 hover:text-green-700"
              onClick={() => onUpdateQuestion(question._id)}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700"
              onClick={onCancelEditing}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="text-blue-500 hover:text-blue-700"
              onClick={() => onStartEditing(question)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700"
              onClick={() => onDeleteQuestion(question._id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionList;
