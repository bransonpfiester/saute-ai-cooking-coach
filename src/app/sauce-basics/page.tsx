'use client';

import Link from 'next/link';
import { useState } from 'react';
import VisionCoach from '@/components/VisionCoach';

const steps = [
  {
    title: "The Five Mother Sauces",
    content: "Learn the foundation: Béchamel (white sauce), Velouté (blonde sauce), Espagnole (brown sauce), Tomato, and Hollandaise. These form the base for hundreds of derivative sauces in classical cooking.",
    tip: "Master these five sauces and you can create countless variations by adding different ingredients and seasonings."
  },
  {
    title: "Making a Perfect Roux",
    content: "A roux (butter and flour cooked together) thickens many sauces. Cook equal parts butter and flour, stirring constantly. White roux cooks 2-3 minutes, blonde 5-7 minutes, brown 10+ minutes for deeper flavor.",
    tip: "Cook the roux long enough to eliminate the raw flour taste, but not so long that it loses thickening power."
  },
  {
    title: "Emulsification Techniques",
    content: "Emulsions combine oil and water-based ingredients that normally don't mix. Mayonnaise, hollandaise, and vinaigrettes are emulsions. Add oil slowly while whisking to create stable emulsions.",
    tip: "If an emulsion breaks, start fresh with an egg yolk or mustard and slowly whisk in the broken sauce."
  },
  {
    title: "Reduction and Concentration",
    content: "Reducing sauces by simmering concentrates flavors and thickens consistency. Reduce wine-based sauces by half, stock-based sauces by two-thirds. Taste frequently as flavors intensify.",
    tip: "Use a wide, shallow pan for faster reduction and better control over the final consistency."
  },
  {
    title: "Seasoning and Balancing",
    content: "Great sauces balance salt, acid, fat, and sweetness. Taste constantly and adjust. A pinch of sugar can balance acidity, lemon juice brightens heavy sauces, and salt enhances all flavors.",
    tip: "Season sauces at the end of cooking when flavors are concentrated, but taste throughout the process."
  }
];

export default function SauceBasics() {
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/"
            className="inline-block text-rose-600 hover:text-rose-700 mb-4 font-medium"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Sauce Basics</h1>
          <p className="text-gray-600">Master the fundamental sauces of classical cooking</p>
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
              className="bg-rose-500 h-2 rounded-full transition-all duration-300"
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
                    ? 'bg-rose-500 text-white'
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
            <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded">
              <div className="flex items-start">
                <div className="text-rose-500 mr-2">🍅</div>
                <div>
                  <p className="text-rose-800 font-medium">Pro Tip:</p>
                  <p className="text-rose-700">{steps[currentStep].tip}</p>
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
                className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Next Step
              </button>
            )}
          </div>

          {/* AI Vision Coach */}
          <VisionCoach 
            skill="sauce-basics"
            context={`Currently learning: ${steps[currentStep].title}. ${steps[currentStep].content}`}
          />
        </div>
      </div>
    </div>
  );
}
