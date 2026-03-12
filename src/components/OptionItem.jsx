import React from 'react';

export default function OptionItem({
  option, questionId, isCorrect, updateOption, removeOption, toggleCorrectOption, canRemove
}) {
  return (
    <div className={`option-row ${isCorrect ? 'correct-option' : ''}`}>
      <input
        type="checkbox"
        className="checkbox"
        checked={isCorrect}
        onChange={() => toggleCorrectOption(questionId, option.value)}
        title="Đánh dấu là đáp án đúng"
      />
      <input
        type="text"
        placeholder="Value (VD: A, B...)"
        className="input-field small"
        value={option.value}
        onChange={(e) => updateOption(questionId, option.id, 'value', e.target.value)}
      />
      <input
        type="text"
        placeholder="Nội dung đáp án..."
        className="input-field flex-1"
        value={option.label}
        onChange={(e) => updateOption(questionId, option.id, 'label', e.target.value)}
      />
      <button 
        className="btn btn-danger btn-sm" 
        onClick={() => removeOption(questionId, option.id)}
        disabled={!canRemove}
        title={!canRemove ? "Phải có ít nhất 2 đáp án" : "Xóa đáp án"}
      >
        X
      </button>
    </div>
  );
}