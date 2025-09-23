'use client';

import Link from 'next/link';
import { useState } from 'react';
import VisionCoach from '@/components/VisionCoach';

const steps = [
  {
    title: "Understanding Heat Levels",
    content: "Learn the difference between low, medium, and high heat. Low heat is for gentle cooking like melting chocolate, medium for most sautéing, and high heat for searing and boiling water.",
    tip: "Your hand should feel comfortable 5 inches above low heat, warm at medium, and too hot to hold at high heat."
  },
  {
    title: "Preheating Your Pan",
    content: "Always preheat your pan before adding oil or food. A properly heated pan prevents sticking and ensures even cooking. Test by sprinkling a few drops of water - they should sizzle and evaporate quickly.",
    tip: "For most cooking, preheat on medium heat for 2-3 minutes before adding oil."
  },
  {
    title: "Oil Temperature",
    content: "Add oil to a hot pan, not a cold one. The oil should shimmer and move freely when the pan is tilted. If it smokes immediately, the pan is too hot.",
    tip: "Different oils have different smoke points - use vegetable oil for high heat, olive oil for medium heat."
  },
  {
    title: "Temperature Control",
    content: "Adjust heat as needed during cooking. If food is browning too quickly, lower the heat. If nothing is happening, increase it. Cooking is about constant adjustment.",
    tip: "Remove the pan from heat temporarily if things are cooking too fast - the residual heat will continue cooking."
  },
  {
    title: "Resting and Carryover Cooking",
    content: "Remember that food continues cooking even after removing from heat. Dense foods like meat will rise 5-10°F in temperature after cooking stops.",
    tip: "For perfect doneness, remove food slightly before it reaches your target temperature."
  }
];

export default function HeatControl() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/"
            className="inline-block text-red-600 hover:text-red-700 mb-4 font-medium"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Heat Control</h1>
          <p className="text-gray-600">Master temperature management for perfect cooking</p>
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
              className="bg-red-500 h-2 rounded-full transition-all duration-300"
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
                    ? 'bg-red-500 text-white'
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
              <Link
                href="/"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Lesson Complete! 🎉
              </Link>
            ) : (
              <button
                onClick={nextStep}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Next Step
              </button>
            )}
          </div>

          {/* AI Vision Coach */}
          <VisionCoach 
            skill="heat-control"
            context={`Currently learning: ${steps[currentStep].title}. ${steps[currentStep].content}`}
          />
        </div>
      </div>
    </div>
  );
}
