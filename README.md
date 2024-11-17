# **BeyondTheMirror | AI Interview Prep Tool**

An AI-powered interview preparation tool where users can manage questions, practice interviews using text or voice input, and receive detailed feedback and ratings for each question and overall performance.

---

## **❓ The Problem**

Traditional interview prep can feel lonely and lacks immediate feedback. This app uses AI to give quick, personalized feedback and lets you practice your answers either by typing or speaking, so you can prepare more effectively.

_Why practice in front of a mirror when you can use AI?_

---

## **🏛️ Technical Architecture**

### **Frontend (React)**

- **`/dashboard`**: Manage questions and start interview.
- **`/interview/:id`**: Answer questions one by one in sequence, choosing between text input or voice response.
- **`/feedback/:id`**: Review detailed interview feedback and rating.

### **Backend (Express/Node.js)**

- Authentication middleware to secure API access.
- RESTful API for question and interview management.
- Integration with Google's Gemini API for AI-powered answer evaluation.

---

## **🌟 Key Features**

- **Real-Time Voice-to-Text Conversion**: Seamlessly transcribe spoken answers for evaluation.
- **AI-Powered Evaluation**: Analyze answers for quality and relevance using Google's Gemini API.
- **Flexible Input Methods**: Support for both voice and text responses.
- **Detailed Feedback Generation**: Actionable insights (rating and feedback) for better preparation.

---

## **🚩 API Endpoints**

### **Questions**

| Method | Endpoint                | Description           |
| ------ | ----------------------- | --------------------- |
| GET    | `/api/v1/questions`     | Get all questions     |
| POST   | `/api/v1/questions`     | Create a new question |
| PATCH  | `/api/v1/questions/:id` | Update a question     |
| DELETE | `/api/v1/questions/:id` | Delete a question     |

### **Interviews**

| Method | Endpoint                        | Description                 |
| ------ | ------------------------------- | --------------------------- |
| POST   | `/api/v1/interviews`            | Create a new interview      |
| GET    | `/api/v1/interviews/:id`        | Get interview details       |
| POST   | `/api/v1/interviews/:id/answer` | Submit an answer for review |

---

## **⚙️ Installation & Setup**

### **1. Clone the repository:**

```bash
git clone https://github.com/seanverano/beyond-the-mirror.git
```

### **2. Install dependencies:**

**Backend**

```bash
cd backend/auth
npm install

cd backend/api
npm install
```

**Frontend**

```bash
cd frontend
npm install
```

### **3. Set up environment variables:**

**API (Backend)**

```bash
PORT=1017
MONGO_URI=your_mongodb_uri_api_db
ACCESS_TOKEN_SECRET_KEY=your_jwt_secret_access
GEMINI_API_KEY=your_gemini_api_key
ACCESS_TOKEN_EXPIRATION=1d

```

**Auth (Backend)**

```bash
PORT=1016
MONGO_URI=your_mongodb_uri_auth_db
ACCESS_TOKEN_SECRET_KEY=your_jwt_secret_access
REFRESH_TOKEN_SECRET_KEY=your_jwt_secret_refresh
ACCESS_TOKEN_EXPIRATION=1d
REFRESH_TOKEN_EXPIRATION=7d

```

### **Frontend**

```bash
VITE_AUTH_BACKEND_URL=http://localhost:1016
```

### **4. Start the application:**

**Backend**

```bash
cd backend/auth
npm run dev

cd backend/api
npm run dev
```

**Frontend**

```bash
cd frontend
npm run dev
```

---

## **🛠️ Technologies Used**

### **Frontend:**

- React
- React Router
- Tailwind CSS
- Shadcn/ui components
- Lucide Icons
- Web Speech API

### **Backend:**

- Node.js
- Express
- MongoDB/Mongoose
- JSON Web Tokens
- Google Gemini API
