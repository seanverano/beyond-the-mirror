import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Video,
  List,
  User,
  Trash2,
  Loader2,
  Pencil,
  Check,
  X,
  Star,
} from "lucide-react";

const DashboardPage = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [interviews, setInterviews] = useState([]);
  const [isStarting, setIsStarting] = useState(false);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editedText, setEditedText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchInterviews();
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:1017/api/v1/questions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch questions");
      const data = await response.json();
      setQuestions(data.questions);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      setQuestions([]);
    }
  };

  const fetchInterviews = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:1017/api/v1/interviews", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch interviews");
      const data = await response.json();
      setInterviews(data);
    } catch (error) {
      console.error("Failed to fetch interviews:", error);
    }
  };

  const startNewInterview = async () => {
    if (isStarting || questions.length === 0) return;

    // Only allow up to 5 questions
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

  const handleInterviewClick = (interview) => {
    if (interview.status === "Completed") {
      navigate(`/feedback/${interview._id}`);
    } else {
      alert("This interview hasn't been completed yet. No feedback available.");
    }
  };

  const addQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim() || isAddingQuestion) return;

    try {
      setIsAddingQuestion(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:1017/api/v1/questions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newQuestion }),
      });

      if (!response.ok) throw new Error("Failed to add question");

      await fetchQuestions();
      setNewQuestion("");
    } catch (error) {
      console.error("Failed to add question:", error);
    } finally {
      setIsAddingQuestion(false);
    }
  };

  const deleteQuestion = async (questionId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:1017/api/v1/questions/${questionId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to delete question");
      await fetchQuestions();
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  const startEditing = (question) => {
    setEditingQuestion(question._id);
    setEditedText(question.text);
  };

  const cancelEditing = () => {
    setEditingQuestion(null);
    setEditedText("");
  };

  const updateQuestion = async (questionId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:1017/api/v1/questions/${questionId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: editedText }),
        }
      );

      if (!response.ok) throw new Error("Failed to update question");
      await fetchQuestions();
      setEditingQuestion(null);
      setEditedText("");
    } catch (error) {
      console.error("Failed to update question:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F2E8]">
      <header className="bg-[#5F4B3A] text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="font-vt text-2xl">BeyondTheMirror AI</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:text-white/80">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#FCF9F4]">
            <CardHeader>
              <CardTitle className="font-jakarta text-xl text-[#5F4B3A]">
                Start Interview
              </CardTitle>
              <p className="text-[#000000]/70 font-jakarta">
                Begin your mock interview session with AI-powered feedback.
                {questions.length > 5 && (
                  <span className="block text-sm text-orange-500 mt-1">
                    Note: Only the first 5 questions will be used in the
                    interview.
                  </span>
                )}
              </p>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-[#5F4B3A] hover:bg-[#4A3829] disabled:opacity-50"
                onClick={startNewInterview}
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

          <Card className="bg-[#FCF9F4]">
            <CardHeader>
              <CardTitle className="font-jakarta text-xl text-[#5F4B3A]">
                Create Questions
              </CardTitle>
              <p className="text-[#000000]/70 font-jakarta">
                Create, update, or delete your questions.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={addQuestion} className="flex gap-2 mb-4">
                <Input
                  placeholder="Add a new question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
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
              <div className="space-y-2">
                {questions.map((question) => (
                  <div
                    key={question._id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
                  >
                    <div className="flex items-center flex-1 min-w-0">
                      <List className="h-4 w-4 mr-2 flex-shrink-0 text-[#5F4B3A]" />
                      {editingQuestion === question._id ? (
                        <Input
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                          className="flex-1 mr-2"
                        />
                      ) : (
                        <span className="font-jakarta text-sm truncate">
                          {question.text}
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-2">
                      {editingQuestion === question._id ? (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-green-500 hover:text-green-700"
                            onClick={() => updateQuestion(question._id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-500 hover:text-gray-700"
                            onClick={cancelEditing}
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
                            onClick={() => startEditing(question)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => deleteQuestion(question._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#FCF9F4] md:col-span-2">
            <CardHeader>
              <CardTitle className="font-jakarta text-xl text-[#5F4B3A]">
                Past Sessions
              </CardTitle>
              <p className="text-[#000000]/70 font-jakarta">
                Review your completed interview sessions.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {interviews.map((interview) => {
                  const completedQuestions = interview.questions.filter(
                    (q) => q.answer
                  ).length;
                  const averageRating =
                    interview.status === "Completed"
                      ? interview.questions.reduce(
                          (acc, q) => acc + (q.rating || 0),
                          0
                        ) / interview.questions.length
                      : 0;

                  return (
                    <div
                      key={interview._id}
                      className="p-4 bg-white rounded-lg shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-jakarta font-semibold">
                          {new Date(interview.createdAt).toLocaleDateString()}
                        </span>
                        {interview.status === "Completed" && (
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                            <span>{averageRating.toFixed(1)}/5</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-[#000000]/70 mb-3">
                        Questions answered: {completedQuestions}/
                        {interview.questions.length}
                      </p>
                      <Button
                        className="w-full bg-[#5F4B3A] hover:bg-[#4A3829]"
                        onClick={() => handleInterviewClick(interview)}
                      >
                        View Feedback
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
