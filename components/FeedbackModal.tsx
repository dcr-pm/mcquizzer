
import React, { useState, useEffect } from 'react';
import { Question } from '../types.ts';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question | null;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, question }) => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Reset state when modal is reopened for a new question
    if (isOpen) {
      setFeedback('');
      setIsSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen || !question) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Feedback submitted for question: "${question.text}"\nFeedback: ${feedback}`);
    // Here you would typically send the feedback to a server.
    // For this app, we'll just simulate it.
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in-up">
      <div className="relative bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 w-full max-w-lg transform transition-all">
        {isSubmitted ? (
          <div className="text-center">
            <i className="fa-solid fa-check-circle text-5xl text-green-400 mb-4"></i>
            <h2 className="text-2xl font-bold text-white mb-2">Feedback Received!</h2>
            <p className="text-gray-300">Thank you for helping us improve the quiz.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-white mb-2">Report an Issue</h2>
            <p className="text-gray-400 mb-4">Disagree with the answer or see a problem? Let us know.</p>
            <div className="mb-4 bg-gray-900/50 p-3 rounded-lg">
              <p className="text-sm font-semibold text-gray-300">Question:</p>
              <p className="text-gray-400 italic">"{question.text}"</p>
            </div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Please provide your feedback..."
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-28"
              required
            />
            <div className="mt-6 flex justify-end gap-4">
               <button
                type="button"
                onClick={onClose}
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-2 px-6 rounded-md shadow-lg hover:scale-105 transform transition-transform"
              >
                Submit
              </button>
            </div>
          </form>
        )}
         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
            <i className="fa-solid fa-times text-2xl"></i>
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;