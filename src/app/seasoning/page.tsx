'use client';

import Link from 'next/link';
import { useState } from 'react';
import VisionCoach from '@/components/VisionCoach';
import ConfirmationModal from '@/components/ConfirmationModal';

const steps = [
  {
    title: "Salt: The Foundation",
    content: "Salt enhances all other flavors and should be added throughout cooking, not just at the end. Use kosher salt for cooking and finishing salt for final touches. Taste as you go!",
    tip: "Add salt in layers - season proteins before cooking, season vegetables as they cook, and adjust at the end."
  },
  {
    title: "Building Flavor Profiles",
    content: "Every cuisine has its foundation: French uses herbs like thyme and tarragon, Italian uses basil and oregano, Mexican uses cumin and chili. Learn these combinations.",
    tip: "Start with one cuisine's flavor profile and master it before moving to others."
  },
  {
    title: "Fresh vs Dried Herbs",
    content: "Dried herbs should be added early in cooking to release their flavors. Fresh herbs are usually added at the end to preserve their bright taste and color.",
    tip: "The general ratio is 3:1 fresh to dried herbs. If a recipe calls for 1 tablespoon fresh, use 1 teaspoon dried."
  },
  {
    title: "Balancing Flavors",
    content: "Great cooking balances salt, acid, fat, and heat. If something tastes flat, try adding a pinch of salt or a squeeze of lemon. If it's too salty, add acid or a touch of sugar.",
    tip: "Keep lemon juice, vinegar, and sugar handy for quick flavor adjustments."
  },
  {
    title: "Timing Your Seasonings",
    content: "Spices benefit from being toasted or cooked briefly to release their oils. Garlic burns quickly, so add it after onions. Delicate herbs go in last to preserve their flavor.",
    tip: "Toast whole spices in a dry pan for 30 seconds before grinding - it makes a huge difference in flavor intensity."
  }
];

export default function Seasoning() {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepValidations, setStepValidations] = useState<boolean[]>(new Array(steps.length).fill(false));
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      if (stepValidations[currentStep]) {
        // Step is validated, proceed normally
        setCurrentStep(currentStep + 1);
      } else {
        // Step is not validated, show confirmation modal
        setShowConfirmationModal(true);
      }
    }
  };

  const handleConfirmNextStep = () => {
    setShowConfirmationModal(false);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleValidationSuccess = () => {
    const newValidations = [...stepValidations];
    newValidations[currentStep] = true;
    setStepValidations(newValidations);
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex <= currentStep || (stepIndex > 0 && stepValidations[stepIndex - 1])) {
      setCurrentStep(stepIndex);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/"
            className="inline-block text-green-600 hover:text-green-700 mb-4 font-medium"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Seasoning & Flavor</h1>
          <p className="text-gray-600">Learn to build complex, balanced flavors</p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Navigation */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`w-8 h-8 rounded-full font-medium text-sm transition-colors ${
                  index === currentStep
                    ? 'bg-green-500 text-white'
                    : index < currentStep
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {steps[currentStep].content}
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <div className="flex items-start">
                <div className="text-green-500 mr-2">🌿</div>
                <div>
                  <p className="text-green-800 font-medium">Pro Tip:</p>
                  <p className="text-green-700">{steps[currentStep].tip}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              Previous
            </button>

            {currentStep === steps.length - 1 ? (
              <Link
                href="/"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Lesson Complete! 🎉
              </Link>
            ) : (
              <button
                onClick={nextStep}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Next Step
              </button>
            )}
          </div>

          {/* AI Vision Coach */}
          <VisionCoach 
            skill="seasoning"
            context={`Currently learning: ${steps[currentStep].title}. ${steps[currentStep].content}`}
            stepTitle={steps[currentStep].title}
            requireValidation={true}
            onValidationSuccess={handleValidationSuccess}
          />

          {/* Confirmation Modal */}
          <ConfirmationModal
            isOpen={showConfirmationModal}
            onClose={() => setShowConfirmationModal(false)}
            onConfirm={handleConfirmNextStep}
            title="Skip AI Validation?"
            message={`You haven't validated your technique for "${steps[currentStep].title}" yet. The AI coach can provide valuable feedback to help you improve. Are you sure you want to skip to the next step?`}
            confirmText="Skip Anyway"
            cancelText="Go Back"
            type="warning"
          />
        </div>
      </div>
    </div>
  );
}
