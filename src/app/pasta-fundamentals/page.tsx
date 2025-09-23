'use client';

import Link from 'next/link';
import { useState } from 'react';
import VisionCoach from '@/components/VisionCoach';

const steps = [
  {
    title: "Choosing the Right Pasta Shape",
    content: "Different pasta shapes hold different sauces. Long pasta like spaghetti works with oil-based sauces, short pasta like penne holds chunky sauces, and filled pasta like ravioli needs delicate sauces.",
    tip: "Match the pasta shape to your sauce - ridged pasta grabs more sauce, smooth pasta works with lighter coatings."
  },
  {
    title: "The Perfect Water-to-Pasta Ratio",
    content: "Use at least 4-6 quarts of water per pound of pasta. More water means the temperature stays high when you add pasta, preventing sticking and ensuring even cooking.",
    tip: "Fill a large pot - pasta needs room to move freely. Cramped pasta clumps together and cooks unevenly."
  },
  {
    title: "Salting Your Pasta Water",
    content: "Add salt generously - about 1-2 tablespoons per gallon of water. The water should taste like mild seawater. This is your only chance to season the pasta itself from within.",
    tip: "Add salt after the water boils but before adding pasta. Salt raises the boiling point slightly."
  },
  {
    title: "Timing and Testing for Doneness",
    content: "Start testing pasta 1-2 minutes before the package time. Al dente means 'to the tooth' - firm but not crunchy. The pasta should have a slight bite in the center.",
    tip: "Taste, don't just look. Properly cooked pasta should be tender outside with a tiny firm center when you bite it."
  },
  {
    title: "The Pasta Water Secret",
    content: "Save a cup of starchy pasta water before draining. This liquid gold helps bind sauces to pasta and adjust consistency. The starch acts as a natural thickener and emulsifier.",
    tip: "Add pasta water gradually to your sauce - a little goes a long way in creating silky, cohesive dishes."
  }
];

export default function PastaFundamentals() {
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/"
            className="inline-block text-yellow-600 hover:text-yellow-700 mb-4 font-medium"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Pasta Fundamentals</h1>
          <p className="text-gray-600">Master the art of perfect pasta every time</p>
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
              className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
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
                    ? 'bg-yellow-500 text-white'
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
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <div className="flex items-start">
                <div className="text-yellow-500 mr-2">🍝</div>
                <div>
                  <p className="text-yellow-800 font-medium">Pro Tip:</p>
                  <p className="text-yellow-700">{steps[currentStep].tip}</p>
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
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Next Step
              </button>
            )}
          </div>

          {/* AI Vision Coach */}
          <VisionCoach 
            skill="pasta-fundamentals"
            context={`Currently learning: ${steps[currentStep].title}. ${steps[currentStep].content}`}
          />
        </div>
      </div>
    </div>
  );
}
