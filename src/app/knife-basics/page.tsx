'use client';

import Link from 'next/link';
import { useState } from 'react';
import VisionCoach from '@/components/VisionCoach';
import ConfirmationModal from '@/components/ConfirmationModal';

const steps = [
  {
    title: "Choose the Right Knife",
    content: "Start with a sharp chef's knife, 8-10 inches long. A dull knife is more dangerous than a sharp one because it requires more pressure and can slip.",
    tip: "Test sharpness by gently slicing a piece of paper - it should cut cleanly without tearing.",
    needsAI: false
  },
  {
    title: "Proper Grip",
    content: "Hold the knife with your dominant hand, gripping the handle firmly. Your thumb and index finger should pinch the blade just above the handle for better control.",
    tip: "This 'pinch grip' gives you maximum control and precision while cutting.",
    needsAI: true
  },
  {
    title: "The Claw Technique",
    content: "Use your non-dominant hand to hold the food. Curl your fingertips under, creating a 'claw' shape. Your knuckles should guide the knife blade.",
    tip: "Keep your fingertips tucked under at all times - your knuckles act as a natural guard.",
    needsAI: true
  },
  {
    title: "Basic Cutting Motion",
    content: "Use a rocking motion: keep the tip of the knife on the cutting board and rock the blade down and forward. The knife should never leave the board completely.",
    tip: "Let the knife do the work - don't force it. Smooth, controlled motions are key.",
    needsAI: true
  },
  {
    title: "Practice with an Onion",
    content: "Cut the onion in half from root to tip. Make horizontal cuts (parallel to the board), then vertical cuts, keeping the root intact. Finally, slice perpendicular to create diced pieces.",
    tip: "Keep the root end intact until the final cuts - it holds the onion together.",
    needsAI: true
  }
];

export default function KnifeBasics() {
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
    if (stepIndex <= currentStep || (stepIndex > 0 && stepValidations[stepIndex - 1])) {
      setCurrentStep(stepIndex);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-4">
          <Link 
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6 font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Skills
          </Link>
          
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl mb-6 shadow-lg">
            <span className="text-3xl">🔪</span>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-2">
            Knife Basics
          </h1>
          <p className="text-gray-600 text-lg">Master the fundamentals of safe knife handling</p>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-500 font-medium">Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 font-medium">Validated</p>
              <p className="text-2xl font-bold text-emerald-600">
                {stepValidations.filter(Boolean).length}/{steps.length}
              </p>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Lesson Progress</span>
                <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Skill Mastery</span>
                <span>{Math.round((stepValidations.filter(Boolean).length / steps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-emerald-400 to-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(stepValidations.filter(Boolean).length / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {steps[currentStep].needsAI && !stepValidations[currentStep] && (
            <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mr-3">
                  <span className="text-white text-lg">🎯</span>
                </div>
                <div>
                  <p className="text-amber-800 font-medium">AI Validation Required</p>
                  <p className="text-amber-700 text-sm">Demonstrate your technique with the AI coach to continue</p>
                </div>
              </div>
            </div>
          )}

          {!steps[currentStep].needsAI && (
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mr-3">
                  <span className="text-white text-lg">📚</span>
                </div>
                <div>
                  <p className="text-green-800 font-medium">Knowledge Step</p>
                  <p className="text-green-700 text-sm">This is a theoretical step - read and understand, then continue</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Step Navigation */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-8">
          <p className="text-gray-500 text-sm font-medium mb-4">Steps</p>
          <div className="flex flex-wrap gap-3">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                disabled={index > currentStep && !stepValidations[index - 1]}
                className={`relative w-12 h-12 rounded-2xl font-medium text-sm transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-lg scale-110'
                    : stepValidations[index]
                    ? 'bg-gradient-to-br from-emerald-400 to-green-500 text-white shadow-md hover:scale-105'
                    : index < currentStep
                    ? 'bg-gradient-to-br from-emerald-400 to-green-500 text-white shadow-md hover:scale-105'
                    : index > currentStep && !stepValidations[index - 1]
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:scale-105'
                }`}
              >
                {stepValidations[index] ? (
                  <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 mb-8">
          <div className="flex items-start mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mr-4">
              <span className="text-white font-bold">{currentStep + 1}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {steps[currentStep].title}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {steps[currentStep].content}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mr-4">
                <span className="text-white text-lg">💡</span>
              </div>
              <div>
                <p className="text-blue-800 font-medium mb-1">Pro Tip</p>
                <p className="text-blue-700">{steps[currentStep].tip}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            {currentStep === steps.length - 1 ? (
              stepValidations[currentStep] ? (
                <Link
                  href="/"
                  className="flex items-center px-8 py-3 bg-gradient-to-r from-emerald-400 to-green-500 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <span className="mr-2">🎉</span>
                  Complete Lesson
                </Link>
              ) : (
                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-2">Complete validation to finish</p>
                  <button
                    disabled
                    className="px-6 py-3 bg-gray-200 text-gray-500 rounded-2xl font-medium cursor-not-allowed"
                  >
                    Validate Final Step
                  </button>
                </div>
              )
            ) : (
              <button
                onClick={nextStep}
                className={`flex items-center px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  stepValidations[currentStep]
                    ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                    : 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                }`}
              >
                {stepValidations[currentStep] ? 'Next Step' : 'Next Step'}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* AI Vision Coach - Only show for steps that need AI validation */}
        {steps[currentStep].needsAI && (
          <VisionCoach 
            skill="knife-basics"
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
  );
}