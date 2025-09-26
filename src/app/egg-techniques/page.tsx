'use client';

import Link from 'next/link';
import { useState } from 'react';
import VisionCoach from '@/components/VisionCoach';

const steps = [
  {
    title: "Fresh Egg Selection",
    content: "Fresh eggs have firm, high yolks and thick whites that don't spread much when cracked. The shell should be clean and uncracked. Older eggs are better for hard-boiling, fresh eggs for poaching and frying.",
    tip: "Test freshness by placing an egg in water - fresh eggs sink and lay flat, older eggs stand upright or float."
  },
  {
    title: "Perfect Scrambled Eggs",
    content: "Use low heat and constant stirring for creamy scrambled eggs. Remove from heat while still slightly wet as they'll continue cooking. Add butter or cream at the end for richness.",
    tip: "Cook scrambled eggs slowly over low heat - patience creates the creamiest texture. High heat makes them rubbery."
  },
  {
    title: "Mastering the Fried Egg",
    content: "Heat your pan over medium-low heat with a little butter or oil. Crack eggs into a small bowl first, then gently slide into the pan. For over-easy, flip carefully when whites are set.",
    tip: "Crack eggs into a bowl first to avoid broken yolks and to ensure they slide into the pan gently."
  },
  {
    title: "Poaching Technique",
    content: "Bring water to a gentle simmer with a splash of vinegar. Create a whirlpool with a spoon, then drop the egg into the center. The vinegar helps proteins set quickly for a neater shape.",
    tip: "Use the freshest eggs possible for poaching - they hold together better and create less wispy whites."
  },
  {
    title: "Hard-Boiled Perfection",
    content: "Start with boiling water, gently lower eggs in, cook for exactly 10-12 minutes, then immediately transfer to ice water. This prevents the gray ring around the yolk and makes peeling easier.",
    tip: "Use eggs that are at least a week old for hard-boiling - they peel much easier than very fresh eggs."
  }
];

export default function EggTechniques() {
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/"
            className="inline-block text-amber-600 hover:text-amber-700 mb-4 font-medium"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Egg Techniques</h1>
          <p className="text-gray-600">Master every way to cook the perfect egg</p>
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
              className="bg-amber-500 h-2 rounded-full transition-all duration-300"
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
                    ? 'bg-amber-500 text-white'
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
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
              <div className="flex items-start">
                <div className="text-amber-500 mr-2">🥚</div>
                <div>
                  <p className="text-amber-800 font-medium">Pro Tip:</p>
                  <p className="text-amber-700">{steps[currentStep].tip}</p>
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
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Next Step
              </button>
            )}
          </div>

          {/* AI Vision Coach */}
          <VisionCoach 
            skill="egg-techniques"
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
