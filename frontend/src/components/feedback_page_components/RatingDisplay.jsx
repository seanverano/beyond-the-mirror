import { Star } from "lucide-react";

const RatingDisplay = ({ rating, showMax = true }) => (
  <div className="flex items-center space-x-2">
    <Star className="h-4 w-4 text-yellow-500 fill-current" />
    <span className="text-base">{rating}</span>
    {showMax && <span className="text-base font-normal text-gray-500">/5</span>}
  </div>
);

export default RatingDisplay;
