import { useState } from 'react';
import useStore from '../store';

const materials = {
  beginner: [
    {
      title: "The Journey Home",
      content: "Sarah walked slowly down the empty street...",
      questions: [
        {
          question: "How did Sarah walk down the street?",
          options: ["Quickly", "Slowly", "Running", "Skipping"],
          correct: 1
        }
      ]
    }
  ],
  intermediate: [
    {
      title: "The Scientific Method",
      content: "The scientific method is a systematic way...",
      questions: [
        {
          question: "What is the main purpose of the scientific method?",
          options: [
            "To conduct experiments",
            "To prove theories",
            "To systematically investigate phenomena",
            "To write research papers"
          ],
          correct: 2
        }
      ]
    }
  ]
};

export default function ReadingMaterial() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const readingLevel = useStore((state) => state.readingLevel);
  const updateProgress = useStore((state) => state.updateProgress);

  const handleAnswer = (index) => {
    const correct = materials[readingLevel][0].questions[currentQuestion].correct === index;
    if (correct) {
      updateProgress({ comprehension: Math.min(100, Math.random() * 20 + 80) });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <h2 className="text-xl font-bold mb-4">
          {materials[readingLevel][0].title}
        </h2>
        <p className="mb-6">{materials[readingLevel][0].content}</p>
        
        <div className="mt-6">
          <h3 className="font-bold mb-4">
            Question {currentQuestion + 1}:
          </h3>
          <p className="mb-4">
            {materials[readingLevel][0].questions[currentQuestion].question}
          </p>
          <div className="space-y-2">
            {materials[readingLevel][0].questions[currentQuestion].options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="w-full text-left p-2 rounded border hover:bg-gray-100"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
