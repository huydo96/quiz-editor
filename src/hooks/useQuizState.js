import { useState } from 'react';

// Hàm tạo ID ngẫu nhiên thay cho thư viện ngoài
const generateId = () => Math.random().toString(36).substring(2, 9);

const initialQuiz = {
  name: '',
  description: '',
  questions: []
};

export const useQuizState = () => {
  const [quiz, setQuiz] = useState(initialQuiz);

  const updateQuizInfo = (field, value) => {
    setQuiz(prev => ({ ...prev, [field]: value }));
  };

  const addQuestion = () => {
    const defaultOpt1 = { id: generateId(), value: 'A', label: 'Option A', sortOrder: 1 };
    const defaultOpt2 = { id: generateId(), value: 'B', label: 'Option B', sortOrder: 2 };

    const newQuestion = {
      id: generateId(),
      name: '',
      description: '',
      sortOrder: quiz.questions.length + 1,
      options: [defaultOpt1, defaultOpt2],
      correctOptionValues: [defaultOpt1.value] // Mặc định đáp án A đúng
    };

    setQuiz(prev => ({ ...prev, questions: [...prev.questions, newQuestion] }));
  };

  const updateQuestion = (questionId, field, value) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.map(q => q.id === questionId ? { ...q, [field]: value } : q)
    }));
  };

  const removeQuestion = (questionId) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
  };

  const addOption = (questionId) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id === questionId) {
          const newOpt = {
            id: generateId(),
            value: `Opt_${generateId()}`,
            label: '',
            sortOrder: q.options.length + 1
          };
          return { ...q, options: [...q.options, newOpt] };
        }
        return q;
      })
    }));
  };

  const updateOption = (questionId, optionId, field, newValue) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id === questionId) {
          let newCorrectValues = [...q.correctOptionValues];
          const updatedOptions = q.options.map(opt => {
            if (opt.id === optionId) {
              // Cập nhật mảng đáp án đúng nếu value của option bị thay đổi
              if (field === 'value' && newCorrectValues.includes(opt.value)) {
                newCorrectValues = newCorrectValues.map(v => v === opt.value ? newValue : v);
              }
              return { ...opt, [field]: newValue };
            }
            return opt;
          });
          return { ...q, options: updatedOptions, correctOptionValues: newCorrectValues };
        }
        return q;
      })
    }));
  };

  const removeOption = (questionId, optionId) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id === questionId) {
          if (q.options.length <= 2) {
            alert("Một câu hỏi phải có ít nhất 2 đáp án.");
            return q;
          }
          const optionToRemove = q.options.find(o => o.id === optionId);
          const remainingOptions = q.options.filter(o => o.id !== optionId);
          
          let newCorrectValues = q.correctOptionValues.filter(v => v !== optionToRemove.value);
          if (newCorrectValues.length === 0) {
            newCorrectValues = [remainingOptions[0].value]; // Gán tạm đáp án đầu tiên nếu lỡ xóa hết đáp án đúng
          }
          return { ...q, options: remainingOptions, correctOptionValues: newCorrectValues };
        }
        return q;
      })
    }));
  };

  const toggleCorrectOption = (questionId, optionValue) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id === questionId) {
          const isCurrentlyCorrect = q.correctOptionValues.includes(optionValue);
          let newCorrectValues;

          if (isCurrentlyCorrect) {
            if (q.correctOptionValues.length <= 1) {
              alert("Phải có ít nhất 1 đáp án đúng.");
              return q;
            }
            newCorrectValues = q.correctOptionValues.filter(v => v !== optionValue);
          } else {
            newCorrectValues = [...q.correctOptionValues, optionValue];
          }
          return { ...q, correctOptionValues: newCorrectValues };
        }
        return q;
      })
    }));
  };

  const loadQuizData = (importedData) => setQuiz(importedData);

  return {
    quiz, updateQuizInfo, addQuestion, updateQuestion, removeQuestion,
    addOption, updateOption, removeOption, toggleCorrectOption, loadQuizData
  };
};