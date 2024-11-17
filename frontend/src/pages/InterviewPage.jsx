import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Send, Type, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const InterviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [inputMode, setInputMode] = useState(null);
  const [textAnswer, setTextAnswer] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recognitionRef = useRef(null);

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

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTextAnswer((prev) => prev + " " + finalTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

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

  if (!interview) return null;

  const currentQuestion = interview.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-[#F8F2E8]">
      <header className="bg-[#5F4B3A] text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Button
            variant="ghost"
            className="text-white hover:text-white/80"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <Card className="mb-6 bg-[#FCF9F4]">
          <CardContent className="p-6">
            <h2 className="font-jakarta text-xl font-semibold mb-2">
              {currentQuestion?.text || "Loading question..."}
            </h2>
            <p className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of{" "}
              {interview.questions.length}
            </p>
          </CardContent>
        </Card>

        {!inputMode && (
          <>
            <p className="text-center mb-4 text-[#000000] font-jakarta">
              Choose your response method:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                className="h-32 bg-[#5F4B3A] hover:bg-[#4A3829]"
                onClick={() => setInputMode("text")}
              >
                <div className="flex flex-col items-center">
                  <Type className="h-8 w-8 mb-2" />
                  <span className="font-jakarta text-lg">Type Response</span>
                </div>
              </Button>
              <Button
                className="h-32 bg-[#5F4B3A] hover:bg-[#4A3829]"
                onClick={() => setInputMode("voice")}
              >
                <div className="flex flex-col items-center">
                  <Mic className="h-8 w-8 mb-2" />
                  <span className="font-jakarta text-lg">Voice Response</span>
                </div>
              </Button>
            </div>
          </>
        )}

        {inputMode === "text" && (
          <Card className="bg-[#FCF9F4]">
            <CardContent className="p-6">
              <div className="space-y-4">
                <textarea
                  className="w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5F4B3A]"
                  placeholder="Type your answer here..."
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button
                    className="bg-[#5F4B3A] hover:bg-[#4A3829]"
                    onClick={handleSubmitAnswer}
                    disabled={!textAnswer.trim() || isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white mr-2" />
                        Processing...
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
        )}

        {inputMode === "voice" && (
          <Card className="bg-[#FCF9F4]">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Button
                  className={`rounded-full p-8 ${
                    isRecording
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-[#5F4B3A] hover:bg-[#4A3829]"
                  }`}
                  onClick={isRecording ? stopRecording : startRecording}
                >
                  {isRecording ? (
                    <MicOff className="h-8 w-8" />
                  ) : (
                    <Mic className="h-8 w-8" />
                  )}
                </Button>
                <p className="font-jakarta text-center">
                  {isRecording
                    ? "Recording in progress... Click to stop"
                    : "Click to start recording"}
                </p>
                {textAnswer && (
                  <div className="w-full space-y-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h3 className="font-jakarta font-semibold mb-2">
                        Transcribed Text:
                      </h3>
                      <p>{textAnswer}</p>
                    </div>
                    <Button
                      className="w-full bg-[#5F4B3A] hover:bg-[#4A3829]"
                      onClick={handleSubmitAnswer}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white mr-2" />
                          Processing...
                        </div>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit Answer
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-6 bg-white rounded-full h-2">
          <div
            className="bg-[#5F4B3A] h-full rounded-full transition-all duration-300"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / interview.questions.length) * 100
              }%`,
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default InterviewPage;
