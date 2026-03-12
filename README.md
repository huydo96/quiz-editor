# 📝 OnDigi - Quiz Editor Assessment

This project is a React-based web application that allows users to seamlessly create, manage, and update quizzes. Following the strict acceptance criteria, this tool is built **without any external UI libraries** (like MUI, AntD, etc.), relying entirely on foundational React principles and custom CSS for a clean, intuitive user experience.

## ✨ Key Features & Acceptance Criteria Met

- **Quiz Management:** Create and update Quiz details (Name, Description).
- **Nested Data Handling:** Add, edit, and remove Multiple-Choice Questions and their respective Options.
- **Strict Data Validation:**
  - Ensures a minimum of **2 options** per question (Delete button disabled if limit reached).
  - Ensures a minimum of **1 correct option** (Prevents unchecking the last correct answer).
- **JSON I/O (Import/Export):** - Export current quiz state to a beautifully formatted JSON file.
  - Import a valid JSON file to hydrate the editor state instantly.
- **Intuitive UI/UX:** Built with plain CSS, featuring clear visual hierarchies, interactive hover states, disabled button feedbacks, and a distinct visual indicator (green highlight) for correct options.

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite (for lightning-fast HMR)
- **Styling:** Plain CSS3 (CSS Modules approach)
- **No UI Libraries utilized.**

## 🏗️ Architecture Highlight: `useQuizState` Hook

To ensure a clean codebase and separation of concerns, the core logic is extracted into a custom hook: `src/hooks/useQuizState.js`. 
Instead of bloating the UI components with complex nested state mutations, this hook acts as a dedicated state management layer. It handles all the immutability logic, validations, and data synchronization (e.g., updating `correctOptionValues` when an option's `value` changes), making the UI components extremely lightweight and easy to read.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-github-repo-url>
Navigate to the project directory:

Bash
cd quiz-editor
Install dependencies:

Bash
npm install
Start the development server:

Bash
npm run dev
Open your browser and visit http://localhost:5173/

Thank you for the opportunity to take this assessment. Happy coding!


### Cách đẩy file README này lên GitHub:

Sau khi lưu file `README.md`, bạn mở Terminal lên và gõ 3 lệnh quen thuộc này để cập nhật nó lên GitHub nhé:

```bash
git add README.md
git commit -m "docs: write comprehensive README for OnDigi assessment"
git push origin master