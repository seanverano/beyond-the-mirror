import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/dash_page_component/DashboardHeader";
import InterviewCard from "@/components/dash_page_component/InterviewCard";
import QuestionCard from "@/components/dash_page_component/QuestionCard";
import useQuestions from "@/hooks/useQuestions";

const DashboardPage = () => {
  const [isStarting, setIsStarting] = useState(false);
  const navigate = useNavigate();
  const {
    questions,
    newQuestion,
    isAddingQuestion,
    editingQuestion,
    editedText,
    setNewQuestion,
    addQuestion,
    deleteQuestion,
    updateQuestion,
    startEditing,
    cancelEditing,
    setEditedText,
  } = useQuestions();

  const startNewInterview = async () => {
    if (isStarting || questions.length === 0) return;

    const selectedQuestions = questions.slice(0, 5);

    try {
      setIsStarting(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:1017/api/v1/interviews", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questions: selectedQuestions }),
      });

      if (!response.ok) throw new Error("Failed to create interview");

      const data = await response.json();
      if (data.interview && data.interview._id) {
        navigate(`/interview/${data.interview._id}`);
      } else {
        throw new Error("Invalid interview data received");
      }
    } catch (error) {
      console.error("Failed to create interview:", error);
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F2E8]">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InterviewCard
            questions={questions}
            isStarting={isStarting}
            onStartInterview={startNewInterview}
          />
          <QuestionCard
            questions={questions}
            newQuestion={newQuestion}
            isAddingQuestion={isAddingQuestion}
            editingQuestion={editingQuestion}
            editedText={editedText}
            onAddQuestion={addQuestion}
            onQuestionChange={setNewQuestion}
            onStartEditing={startEditing}
            onCancelEditing={cancelEditing}
            onUpdateQuestion={updateQuestion}
            onDeleteQuestion={deleteQuestion}
            onEditChange={setEditedText}
          />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
