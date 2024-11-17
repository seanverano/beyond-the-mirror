const ProgressBar = ({ currentIndex, totalQuestions }) => {
  return (
    <div className="mt-6 bg-white rounded-full h-2">
      <div
        className="bg-[#5F4B3A] h-full rounded-full transition-all duration-300"
        style={{
          width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
        }}
      />
    </div>
  );
};

export default ProgressBar;
