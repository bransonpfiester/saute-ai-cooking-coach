'use client';

import Link from 'next/link';
import { useState } from 'react';
import VisionCoach from '@/components/VisionCoach';

const steps = [
  {
    title: "Choose the Right Knife",
    content: "Start with a sharp chef's knife, 8-10 inches long. A dull knife is more dangerous than a sharp one because it requires more pressure and can slip.",
    tip: "Test sharpness by gently slicing a piece of paper - it should cut cleanly without tearing."
  },
  {
    title: "Proper Grip",
    content: "Hold the knife with your dominant hand, gripping the handle firmly. Your thumb and index finger should pinch the blade just above the handle for better control.",
    tip: "This 'pinch grip' gives you maximum control and precision while cutting."
  },
  {
    title: "The Claw Technique",
    content: "Use your non-dominant hand to hold the food. Curl your fingertips under, creating a 'claw' shape. Your knuckles should guide the knife blade.",
    tip: "Keep your fingertips tucked under at all times - your knuckles act as a natural guard."
  },
  {
    title: "Basic Cutting Motion",
    content: "Use a rocking motion: keep the tip of the knife on the cutting board and rock the blade down and forward. The knife should never leave the board completely.",
    tip: "Let the knife do the work - don't force it. Smooth, controlled motions are key."
  },
  {
    title: "Practice with an Onion",
    content: "Cut the onion in half from root to tip. Make horizontal cuts (parallel to the board), then vertical cuts, keeping the root intact. Finally, slice perpendicular to create diced pieces.",
    tip: "Keep the root end intact until the final cuts - it holds the onion together."
  }
];

export default function KnifeBasics() {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepValidations, setStepValidations] = useState<boolean[]>(new Array(steps.length).fill(false));

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/"
            className="inline-block text-orange-600 hover:text-orange-700 mb-4 font-medium"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Knife Basics</h1>
          <p className="text-gray-600">Master the fundamentals of safe knife handling</p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {stepValidations.filter(Boolean).length} of {steps.length} validated
              </span>
              <span className="text-sm text-gray-600">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-green-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${(stepValidations.filter(Boolean).length / steps.length) * 100}%` }}
            />
          </div>
          {!stepValidations[currentStep] && (
            <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center">
                <span className="text-orange-500 mr-2">🎯</span>
                <p className="text-orange-800 text-sm font-medium">
                  You must validate your technique with the AI coach below before proceeding to the next step.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Step Navigation */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                disabled={index > currentStep && !stepValidations[index - 1]}
                className={`w-8 h-8 rounded-full font-medium text-sm transition-colors ${
                  index === currentStep
                    ? 'bg-orange-500 text-white'
                    : stepValidations[index]
                    ? 'bg-green-500 text-white'
                    : index < currentStep
                    ? 'bg-green-500 text-white'
                    : index > currentStep && !stepValidations[index - 1]
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {stepValidations[index] ? '✓' : index + 1}
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
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
              <div className="flex items-start">
                <div className="text-orange-500 mr-2">💡</div>
                <div>
                  <p className="text-orange-800 font-medium">Pro Tip:</p>
                  <p className="text-orange-700">{steps[currentStep].tip}</p>
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
              stepValidations[currentStep] ? (
                <Link
                  href="/"
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Lesson Complete! 🎉
                </Link>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-2">Complete the AI validation below to finish</p>
                  <button
                    disabled
                    className="bg-gray-300 text-gray-500 font-semibold py-3 px-6 rounded-lg cursor-not-allowed"
                  >
                    Validate Final Step
                  </button>
                </div>
              )
            ) : (
              <button
                onClick={nextStep}
                disabled={!stepValidations[currentStep]}
                className={`font-semibold py-3 px-6 rounded-lg transition-colors ${
                  stepValidations[currentStep]
                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {stepValidations[currentStep] ? 'Next Step' : 'Validate Technique First'}
              </button>
            )}
          </div>

          {/* AI Vision Coach */}
          <VisionCoach 
            skill="knife-basics"
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
