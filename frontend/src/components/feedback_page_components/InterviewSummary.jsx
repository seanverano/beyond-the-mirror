import { Star } from "lucide-react";

const InterviewSummary = ({ averageRating }) => (
  <div className="text-center">
    <h1 className="text-2xl font-jakarta font-bold text-[#5F4B3A] mb-2">
      Interview Feedback
    </h1>
    <div className="flex items-center justify-center space-x-2 text-2xl font-bold">
      <Star className="h-8 w-8 text-yellow-500 fill-current" />
      <span>{averageRating}</span>
      <span className="text-base font-normal text-gray-500">/5.0</span>
    </div>
  </div>
);

export default InterviewSummary;
