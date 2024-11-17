import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InterviewPage from "./pages/InterviewPage";
import FeedbackPage from "./pages/FeedbackPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/interview/:id" element={<InterviewPage />} />
          <Route path="/feedback/:id" element={<FeedbackPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
