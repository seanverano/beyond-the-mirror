import RatingDisplay from "./RatingDisplay";

const QuestionCardThree = ({ question, index }) => (
  <div className="bg-white p-4 rounded-lg">
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
            <RatingDisplay rating={`${question.rating}/5`} showMax={false} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default QuestionCardThree;
