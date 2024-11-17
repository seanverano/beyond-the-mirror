import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star } from "lucide-react";

const FeedbackPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);

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
      if (data.status !== "completed") {
        alert(
          "This interview hasn't been completed yet. No feedback available."
        );
        navigate("/dashboard");
        return;
      }
      setInterview(data);
    } catch (error) {
      console.error("Failed to fetch interview:", error);
      navigate("/dashboard");
    }
  };

  const getAverageRating = () => {
    if (!interview) return 0;
    const ratings = interview.questions
      .filter((q) => q.rating)
      .map((q) => q.rating);
    return ratings.length
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : 0;
  };

  if (!interview) return null;

  return (
    <div className="min-h-screen bg-[#F8F2E8]">
      <header className="bg-[#5F4B3A] text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <Button
            variant="ghost"
            className="text-white hover:text-[#5F4B3A] hover:bg-[#F8F2E8] font-vt text-2xl font-normal"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <Card className="bg-[#FCF9F4]">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-jakarta font-bold text-[#5F4B3A] mb-2">
                  Interview Feedback
                </h1>
                <div className="flex items-center justify-center space-x-2 text-2xl font-bold">
                  <Star className="h-8 w-8 text-yellow-500 fill-current" />
                  <span>{getAverageRating()}</span>
                  <span className="text-base font-normal text-gray-500">
                    /5.0
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {interview.questions.map((question, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg">
                    <h3 className="font-jakarta font-semibold mb-2">
                      Question {index + 1}: {question.text}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Your Answer:</p>
                        <p className="mt-1">{question.answer}</p>
                      </div>
                      <div className="flex-col gap-2">
                        <div>
                          <div>
                            <p className="text-sm text-gray-500">Feedback:</p>
                            <p className="text-base">{question.feedback}</p>
                          </div>
                          <div className="flex flex-col mt-2">
                            <p className="text-sm text-gray-500">Rating:</p>
                            <div className="flex flex-row items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-base">
                                {question.rating}/5
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="mt-2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FeedbackPage;
