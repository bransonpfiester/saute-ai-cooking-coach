'use client';

import Link from 'next/link';
import { useState } from 'react';
import VisionCoach from '@/components/VisionCoach';
import ConfirmationModal from '@/components/ConfirmationModal';
import FloatingBackButton from '@/components/FloatingBackButton';

const steps = [
  {
    title: "What is Mise en Place?",
    content: "French for 'everything in its place,' mise en place is the practice of preparing and organizing all ingredients and tools before you start cooking. This is the foundation of professional cooking.",
    tip: "Professional chefs never start cooking without complete mise en place - it prevents mistakes and reduces stress.",
    needsAI: false
  },
  {
    title: "Read the Entire Recipe First",
    content: "Before touching any ingredient, read through the entire recipe. Note cooking times, temperatures, and special techniques. Look for steps that can be done simultaneously.",
    tip: "Make notes about timing - which steps can be done while something else is cooking?",
    needsAI: false
  },
  {
    title: "Prep All Ingredients",
    content: "Wash, chop, measure, and portion all ingredients before turning on any heat. Use small bowls to organize everything. Group ingredients by when they'll be used in the recipe.",
    tip: "Use the 'bowl method' - small bowls for each ingredient or ingredient group, arranged in the order you'll use them.",
    needsAI: true
  },
  {
    title: "Organize Your Workspace",
    content: "Clean your workspace and arrange tools logically. Keep a 'garbage bowl' for scraps, have clean towels ready, and ensure your knives are sharp and cutting boards are stable.",
    tip: "Place a damp towel under your cutting board to prevent sliding, and keep a side towel for wiping hands and tools.",
    needsAI: true
  },
  {
    title: "Clean as You Go",
    content: "Wash dishes and clean spills immediately. Put away ingredients after using them. This prevents cross-contamination and keeps your workspace organized throughout cooking.",
    tip: "Fill your sink with hot soapy water before you start - you can quickly rinse utensils and bowls as you use them.",
    needsAI: true
  }
];

export default function MiseEnPlace() {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <FloatingBackButton />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Mise en Place</h1>
          <p className="text-gray-600">Master the art of kitchen organization and preparation</p>
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
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
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
                    ? 'bg-purple-500 text-white'
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
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
              <div className="flex items-start">
                <div className="text-purple-500 mr-2">📋</div>
                <div>
                  <p className="text-purple-800 font-medium">Pro Tip:</p>
                  <p className="text-purple-700">{steps[currentStep].tip}</p>
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
                    ? 'bg-purple-500 hover:bg-purple-600 text-white'
                    : 'bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600'
                }`}
              >
                Next Step
              </button>
            )}
          </div>

          {/* AI Vision Coach */}
          <VisionCoach 
            skill="mise-en-place"
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
