import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import FeedbackHeader from "@/components/feedback_page_components/FeedbackHeader";
import InterviewSummary from "@/components/feedback_page_components/InterviewSummary";
import QuestionCardThree from "@/components/feedback_page_components/QuestionCardThree";
import useInterview from "@/hooks/useInterview";

const FeedbackPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { interview, getAverageRating } = useInterview(id, navigate);

  if (!interview) return null;

  return (
    <div className="min-h-screen bg-[#F8F2E8]">
      <FeedbackHeader onNavigate={() => navigate("/dashboard")} />
      <main className="max-w-4xl mx-auto p-6">
        <Card className="bg-[#FCF9F4]">
          <CardContent className="p-6">
            <div className="space-y-6">
              <InterviewSummary averageRating={getAverageRating()} />
              <div className="space-y-4">
                {interview.questions.map((question, index) => (
                  <QuestionCardThree
                    key={index}
                    question={question}
                    index={index}
                  />
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
