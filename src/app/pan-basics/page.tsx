'use client';

import Link from 'next/link';
import { useState } from 'react';
import VisionCoach from '@/components/VisionCoach';

const steps = [
  {
    title: "Choosing the Right Pan",
    content: "Different pans serve different purposes. Stainless steel for browning, non-stick for delicate foods, cast iron for high heat and even cooking. Match your pan to your cooking method.",
    tip: "A heavy-bottomed pan distributes heat more evenly and prevents hot spots that can burn food."
  },
  {
    title: "Proper Pan Size",
    content: "Use the right size pan for your ingredients. Too small and food will steam instead of brown. Too large and liquids will evaporate too quickly. Food should fit in a single layer with some space.",
    tip: "For sautéing, ingredients should cover about 70% of the pan's surface for optimal browning."
  },
  {
    title: "Preheating Your Pan",
    content: "Always preheat your pan before adding oil or food. A properly heated pan creates better sears and prevents sticking. Test with a drop of water - it should sizzle and evaporate quickly.",
    tip: "Preheat on medium heat for 2-3 minutes. If water droplets dance and evaporate immediately, your pan is ready."
  },
  {
    title: "Adding Oil at the Right Time",
    content: "Add oil to a hot pan, not a cold one. The oil should shimmer and move freely when you tilt the pan. This creates a non-stick surface and prevents food from absorbing excess oil.",
    tip: "Swirl the oil to coat the entire bottom of the pan before adding ingredients."
  },
  {
    title: "Don't Overcrowd the Pan",
    content: "Give your ingredients space to breathe. Overcrowding causes steaming instead of browning, leading to soggy results. Cook in batches if necessary for better texture and flavor.",
    tip: "You should be able to see the bottom of the pan between pieces of food for proper browning."
  }
];

export default function PanBasics() {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/"
            className="inline-block text-gray-600 hover:text-gray-700 mb-4 font-medium"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Pan Basics</h1>
          <p className="text-gray-600">Master pan selection, heating, and cooking techniques</p>
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
              className="bg-gray-600 h-2 rounded-full transition-all duration-300"
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
                    ? 'bg-gray-600 text-white'
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
            <div className="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
              <div className="flex items-start">
                <div className="text-gray-500 mr-2">🍳</div>
                <div>
                  <p className="text-gray-800 font-medium">Pro Tip:</p>
                  <p className="text-gray-700">{steps[currentStep].tip}</p>
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
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Next Step
              </button>
            )}
          </div>

          {/* AI Vision Coach */}
          <VisionCoach 
            skill="pan-basics"
            context={`Currently learning: ${steps[currentStep].title}. ${steps[currentStep].content}`}
          />
        </div>
      </div>
    </div>
  );
}
