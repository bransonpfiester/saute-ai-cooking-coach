'use client';

import Link from 'next/link';
import { useState } from 'react';
import VisionCoach from '@/components/VisionCoach';

const steps = [
  {
    title: "Washing and Cleaning Vegetables",
    content: "Wash all vegetables, even those you'll peel. Use cool running water and scrub root vegetables with a brush. For leafy greens, soak in cold water to remove dirt, then rinse thoroughly.",
    tip: "Wash vegetables just before using them to maintain freshness and prevent premature spoilage."
  },
  {
    title: "Understanding Vegetable Cuts",
    content: "Different cuts affect cooking time and presentation. Julienne (matchsticks) cook quickly, dice provides even cooking, and rough chops work for rustic dishes. Consistent size ensures even cooking.",
    tip: "Practice the basic cuts: brunoise (tiny dice), julienne (matchsticks), chiffonade (thin strips), and rough chop."
  },
  {
    title: "Proper Storage and Handling",
    content: "Store vegetables properly to maintain quality. Root vegetables in cool, dark places. Leafy greens in the refrigerator with slight moisture. Keep onions and potatoes separate - they make each other spoil faster.",
    tip: "Most vegetables last longer when stored unwashed. Wash them just before use to prevent moisture-related spoilage."
  },
  {
    title: "Blanching and Shocking",
    content: "Blanching (brief boiling) followed by shocking (ice bath) preserves color, texture, and nutrients. Perfect for preparing vegetables ahead of time or achieving vibrant colors in final dishes.",
    tip: "Blanch vegetables until just tender-crisp, then immediately plunge into ice water to stop cooking."
  },
  {
    title: "Seasoning and Finishing Vegetables",
    content: "Season vegetables at the right time. Salt draws out moisture, so add it early for some vegetables, late for others. Finish with fresh herbs, lemon juice, or good olive oil to brighten flavors.",
    tip: "Taste vegetables as they cook - they should be seasoned throughout, not just on the surface."
  }
];

export default function VegetablePrep() {
  const [currentStep, setCurrentStep] = useState(0);  const [stepValidations, setStepValidations] = useState<boolean[]>(new Array(steps.length).fill(false));

  const nextStep = () => {
    if (currentStep < steps.length - 1 && stepValidations[currentStep]) {
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
    // Only allow going to steps that are validated or the current step
    if (stepIndex <= currentStep || (stepIndex > 0 && stepValidations[stepIndex - 1])) {
      setCurrentStep(stepIndex);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/"
            className="inline-block text-emerald-600 hover:text-emerald-700 mb-4 font-medium"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Vegetable Prep</h1>
          <p className="text-gray-600">Master vegetable handling, cutting, and preparation</p>
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
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
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
                    ? 'bg-emerald-500 text-white'
                    : index < currentStep
                    ? 'bg-green-500 text-white'
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
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded">
              <div className="flex items-start">
                <div className="text-emerald-500 mr-2">🥬</div>
                <div>
                  <p className="text-emerald-800 font-medium">Pro Tip:</p>
                  <p className="text-emerald-700">{steps[currentStep].tip}</p>
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
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Next Step
              </button>
            )}
          </div>

          {/* AI Vision Coach */}
          <VisionCoach 
            skill="vegetable-prep"
            context={`Currently learning: ${steps[currentStep].title}. ${steps[currentStep].content}`}
            stepTitle={steps[currentStep].title}
            requireValidation={true}
            onValidationSuccess={handleValidationSuccess}
          />
        </div>
      </div>
    </div>
  );
}
