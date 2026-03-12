import React from 'react';
import { useQuizState } from '../hooks/useQuizState';
import QuestionItem from './QuestionItem';
import './styles.css'; // Import file CSS thuần

export default function QuizEditor() {
  const {
    quiz, updateQuizInfo, addQuestion, updateQuestion, removeQuestion,
    addOption, updateOption, removeOption, toggleCorrectOption, loadQuizData
  } = useQuizState();

  const handleExport = () => {
    const dataStr = JSON.stringify(quiz, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "quiz-data.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        loadQuizData(importedData);
      } catch (error) {
        alert("File JSON không hợp lệ!");
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input file để có thể import lại cùng 1 file
  };

  return (
    <div className="quiz-container">
      <header className="quiz-header">
        <h1>Quiz Editor</h1>
        <div className="action-buttons">
          <label className="btn btn-secondary cursor-pointer">
            Import JSON
            <input type="file" accept=".json" onChange={handleImport} hidden />
          </label>
          <button className="btn btn-primary" onClick={handleExport}>
            Export JSON
          </button>
        </div>
      </header>

      <section className="quiz-info-card">
        <input
          type="text"
          placeholder="Tên bài Quiz..."
          className="input-title"
          value={quiz.name}
          onChange={(e) => updateQuizInfo('name', e.target.value)}
        />
        <textarea
          placeholder="Mô tả ngắn về bài Quiz này..."
          className="input-desc"
          value={quiz.description}
          onChange={(e) => updateQuizInfo('description', e.target.value)}
        />
      </section>

      <div className="questions-section">
        {quiz.questions.length === 0 ? (
          <p className="empty-state">Chưa có câu hỏi nào. Hãy thêm câu hỏi mới!</p>
        ) : (
          quiz.questions.map((q, index) => (
            <QuestionItem
              key={q.id} index={index} question={q}
              updateQuestion={updateQuestion} removeQuestion={removeQuestion}
              addOption={addOption} updateOption={updateOption}
              removeOption={removeOption} toggleCorrectOption={toggleCorrectOption}
            />
          ))
        )}
        
        <button className="btn btn-add-question" onClick={addQuestion}>
          + Thêm câu hỏi mới
        </button>
      </div>
    </div>
  );
}