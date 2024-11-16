import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InterviewPage from "./pages/InterviewPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/interview" element={<InterviewPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
