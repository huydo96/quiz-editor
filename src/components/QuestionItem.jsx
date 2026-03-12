import React from 'react';
import OptionItem from './OptionItem';

export default function QuestionItem({
  index, question, updateQuestion, removeQuestion,
  addOption, updateOption, removeOption, toggleCorrectOption
}) {
  return (
    <div className="question-card">
      <div className="question-header">
        <h3>Câu hỏi {index + 1}</h3>
        <button className="btn btn-danger" onClick={() => removeQuestion(question.id)}>
          Xóa câu hỏi
        </button>
      </div>

      <input
        type="text"
        placeholder="Tên/Tiêu đề câu hỏi..."
        className="input-field mb-10 w-full"
        value={question.name}
        onChange={(e) => updateQuestion(question.id, 'name', e.target.value)}
      />
      <textarea
        placeholder="Mô tả câu hỏi (nếu có)..."
        className="input-field mb-10 w-full"
        value={question.description}
        onChange={(e) => updateQuestion(question.id, 'description', e.target.value)}
      />

      <div className="options-list">
        <h4>Các đáp án:</h4>
        {question.options.map((opt) => (
          <OptionItem
            key={opt.id}
            option={opt}
            questionId={question.id}
            isCorrect={question.correctOptionValues.includes(opt.value)}
            updateOption={updateOption}
            removeOption={removeOption}
            toggleCorrectOption={toggleCorrectOption}
            canRemove={question.options.length > 2} // Ràng buộc ít nhất 2 options
          />
        ))}
        <button className="btn btn-secondary btn-sm mt-10" onClick={() => addOption(question.id)}>
          + Thêm đáp án
        </button>
      </div>
    </div>
  );
}