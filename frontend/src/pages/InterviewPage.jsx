import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InterviewHeader from "@/components/interview_page_components/InterviewHeader";
import QuestionCardTwo from "@/components/interview_page_components/QuestionCardTwo";
import ResponseTypeSelector from "@/components/interview_page_components/ResponseTypeSelector";
import TextInput from "@/components/interview_page_components/TextInput";
import VoiceInput from "@/components/interview_page_components/VoiceInput";
import ProgressBar from "@/components/interview_page_components/ProgressBar";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";

const InterviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [inputMode, setInputMode] = useState(null);
  const [textAnswer, setTextAnswer] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recognitionRef = useSpeechRecognition(setTextAnswer);

  useEffect(() => {
    fetchInterview();
  }, [id]);

  const fetchInterview = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:1017/api/v1/interviews/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch interview");
      }

      const data = await response.json();
      setInterview(data);

      if (data.status === "completed") {
        navigate(`/feedback/${id}`);
        return;
      }

      const lastAnsweredIndex = data.questions.findIndex((q) => !q.answer);
      setCurrentQuestionIndex(
        lastAnsweredIndex === -1 ? data.questions.length - 1 : lastAnsweredIndex
      );
    } catch (error) {
      console.error("Failed to fetch interview:", error);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!textAnswer.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:1017/api/v1/interviews/${id}/answer`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            questionIndex: currentQuestionIndex,
            answer: textAnswer.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit answer");
      }

      const updatedInterview = await response.json();
      setInterview(updatedInterview);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (currentQuestionIndex === interview.questions.length - 1) {
        navigate(`/feedback/${id}`);
        return;
      }

      setCurrentQuestionIndex((prev) => prev + 1);
      setTextAnswer("");
      setInputMode(null);
    } catch (error) {
      console.error("Failed to submit answer:", error);
      alert("Failed to submit answer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
      setTextAnswer("");
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  if (!interview) return null;

  const currentQuestion = interview.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-[#F8F2E8]">
      <InterviewHeader />
      <main className="max-w-4xl mx-auto p-6">
        <QuestionCardTwo
          question={currentQuestion}
          currentIndex={currentQuestionIndex}
          totalQuestions={interview.questions.length}
        />

        {!inputMode && <ResponseTypeSelector onSelectMode={setInputMode} />}

        {inputMode === "text" && (
          <TextInput
            value={textAnswer}
            onChange={setTextAnswer}
            onSubmit={handleSubmitAnswer}
            isSubmitting={isSubmitting}
          />
        )}

        {inputMode === "voice" && (
          <VoiceInput
            isRecording={isRecording}
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
            transcribedText={textAnswer}
            onSubmit={handleSubmitAnswer}
            isSubmitting={isSubmitting}
          />
        )}

        <ProgressBar
          currentIndex={currentQuestionIndex}
          totalQuestions={interview.questions.length}
        />
      </main>
    </div>
  );
};

export default InterviewPage;
