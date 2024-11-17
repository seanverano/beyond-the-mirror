import { useState, useEffect } from "react";

const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editedText, setEditedText] = useState("");

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

  const startEditing = (question) => {
    setEditingQuestion(question._id);
    setEditedText(question.text);
  };

  const cancelEditing = () => {
    setEditingQuestion(null);
    setEditedText("");
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return {
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
  };
};

export default useQuestions;
