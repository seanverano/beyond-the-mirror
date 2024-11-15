import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Video, List, User } from "lucide-react";

const DashboardPage = () => {
  const [questions, setQuestions] = useState([
    "Tell me about yourself",
    "What are your greatest strengths?",
    "Where do you see yourself in 5 years?",
  ]);
  const [newQuestion, setNewQuestion] = useState("");

  const addQuestion = (e) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      setQuestions([...questions, newQuestion]);
      setNewQuestion("");
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
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-[#000000]/70 font-jakarta">
                  Begin your mock interview session with AI-powered feedback.
                </p>
                <Button className="w-full bg-[#5F4B3A] hover:bg-[#4A3829]">
                  <Video className="mr-2 h-4 w-4" />
                  Start New Session
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#FCF9F4]">
            <CardHeader>
              <CardTitle className="font-jakarta text-xl text-[#5F4B3A]">
                Question Bank
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={addQuestion} className="flex gap-2 mb-4">
                <Input
                  placeholder="Add a new question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  className="bg-[#5F4B3A] hover:bg-[#4A3829]"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </form>
              <div className="space-y-2">
                {questions.map((question, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-white rounded-lg shadow-sm"
                  >
                    <List className="h-4 w-4 mr-2 text-[#5F4B3A]" />
                    <span className="font-jakarta text-sm">{question}</span>
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
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((session) => (
                  <div
                    key={session}
                    className="p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-jakarta font-semibold">
                        Session {session}
                      </span>
                      <span className="text-sm text-[#000000]/50">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-[#000000]/70 mb-3">
                      Practice session with {questions.length} questions
                    </p>
                    <Button
                      variant="outline"
                      className="w-full text-[#5F4B3A] border-[#5F4B3A]"
                    >
                      View Feedback
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
