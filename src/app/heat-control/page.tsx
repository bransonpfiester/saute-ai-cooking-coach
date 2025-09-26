'use client';

import Link from 'next/link';
import { useState } from 'react';
import VisionCoach from '@/components/VisionCoach';
import ConfirmationModal from '@/components/ConfirmationModal';
import FloatingBackButton from '@/components/FloatingBackButton';

const steps = [
  {
    title: "Understanding Heat Levels",
    content: "Learn the difference between low, medium, and high heat. Low heat is for gentle cooking like melting chocolate, medium for most sautéing, and high heat for searing and boiling water.",
    tip: "Your hand should feel comfortable 5 inches above low heat, warm at medium, and too hot to hold at high heat.",
    needsAI: false
  },
  {
    title: "Preheating Your Pan",
    content: "Always preheat your pan before adding oil or food. A properly heated pan prevents sticking and ensures even cooking. Test by sprinkling a few drops of water - they should sizzle and evaporate quickly.",
    tip: "For most cooking, preheat on medium heat for 2-3 minutes before adding oil.",
    needsAI: true
  },
  {
    title: "Oil Temperature",
    content: "Add oil to a hot pan, not a cold one. The oil should shimmer and move freely when the pan is tilted. If it smokes immediately, the pan is too hot.",
    tip: "Different oils have different smoke points - use vegetable oil for high heat, olive oil for medium heat.",
    needsAI: true
  },
  {
    title: "Temperature Control",
    content: "Adjust heat as needed during cooking. If food is browning too quickly, lower the heat. If nothing is happening, increase it. Cooking is about constant adjustment.",
    tip: "Remove the pan from heat temporarily if things are cooking too fast - the residual heat will continue cooking.",
    needsAI: true
  },
  {
    title: "Resting and Carryover Cooking",
    content: "Remember that food continues cooking even after removing from heat. Dense foods like meat will rise 5-10°F in temperature after cooking stops.",
    tip: "For perfect doneness, remove food slightly before it reaches your target temperature.",
    needsAI: false
  }
];

export default function HeatControl() {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepValidations, setStepValidations] = useState<boolean[]>(new Array(steps.length).fill(false));
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const currentStepData = steps[currentStep];
      
      // If step doesn't need AI validation, proceed directly
      if (!currentStepData.needsAI) {
        setCurrentStep(currentStep + 1);
        return;
      }
      
      // If step needs AI validation
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
    // Only allow going to steps that are validated or the current step
    if (stepIndex <= currentStep || (stepIndex > 0 && stepValidations[stepIndex - 1])) {
      setCurrentStep(stepIndex);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <FloatingBackButton />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Heat Control</h1>
          <p className="text-gray-600">Master temperature management for perfect cooking</p>
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
              className="bg-red-500 h-2 rounded-full transition-all duration-300"
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
                    ? 'bg-red-500 text-white'
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
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex items-start">
                <div className="text-red-500 mr-2">🔥</div>
                <div>
                  <p className="text-red-800 font-medium">Pro Tip:</p>
                  <p className="text-red-700">{steps[currentStep].tip}</p>
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
                className={`font-semibold py-3 px-6 rounded-lg transition-colors ${
                  stepValidations[currentStep]
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600'
                }`}
              >
                Next Step
              </button>
            )}
          </div>

          {/* AI Vision Coach - Only show for steps that need AI validation */}
          {steps[currentStep].needsAI && (
            <VisionCoach 
              skill="heat-control"
              context={`Currently learning: ${steps[currentStep].title}. ${steps[currentStep].content}`}
              stepTitle={steps[currentStep].title}
              requireValidation={true}
              onValidationSuccess={handleValidationSuccess}
            />
          )}

          {/* Information for non-AI steps */}
          {!steps[currentStep].needsAI && (
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl mb-4 shadow-lg">
                  <span className="text-2xl">📚</span>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-2">
                  Knowledge & Theory
                </h2>
                <p className="text-gray-600">
                  This step focuses on understanding concepts and making informed choices
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mr-4">
                    <span className="text-white text-lg">💡</span>
                  </div>
                  <div>
                    <p className="text-green-800 font-medium mb-1">Learning Focus</p>
                    <p className="text-green-700">
                      This step is about understanding principles and making good choices. 
                      No physical demonstration is needed - focus on learning the concepts!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

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
