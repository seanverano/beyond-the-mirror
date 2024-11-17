import { useState, useEffect } from "react";

const useInterview = (id, navigate) => {
  const [interview, setInterview] = useState(null);

  useEffect(() => {
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

    fetchInterview();
  }, [id, navigate]);

  const getAverageRating = () => {
    if (!interview) return 0;
    const ratings = interview.questions
      .filter((q) => q.rating)
      .map((q) => q.rating);
    return ratings.length
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : 0;
  };

  return { interview, getAverageRating };
};

export default useInterview;
