'use client';

import Link from 'next/link';
import { useState } from 'react';
import VisionCoach from '@/components/VisionCoach';

const steps = [
  {
    title: "Food Safety Fundamentals",
    content: "Always wash hands before and after handling raw meat. Use separate cutting boards for meat and vegetables. Keep meat refrigerated until ready to cook, and never leave at room temperature for more than 2 hours.",
    tip: "Use a digital thermometer to ensure meat reaches safe internal temperatures: 165°F for poultry, 160°F for ground meat, 145°F for whole cuts."
  },
  {
    title: "Understanding Meat Cuts",
    content: "Different cuts require different cooking methods. Tender cuts (tenderloin, ribeye) work for quick, high-heat cooking. Tougher cuts (chuck, brisket) need slow, moist cooking to break down connective tissue.",
    tip: "Look for marbling (fat streaks) in steaks - it adds flavor and tenderness. For braising cuts, some visible connective tissue is actually desirable."
  },
  {
    title: "Proper Seasoning Timing",
    content: "Salt meat 30-60 minutes before cooking for best flavor penetration, or immediately before cooking for surface seasoning. Avoid salting 10-30 minutes before cooking as it draws out moisture.",
    tip: "For thick steaks, season generously and let rest at room temperature 30-60 minutes before cooking for even seasoning and cooking."
  },
  {
    title: "Resting and Carryover Cooking",
    content: "Always rest meat after cooking to redistribute juices. Thick cuts need 10-15 minutes, thin cuts 3-5 minutes. Internal temperature will rise 5-10°F during resting due to carryover cooking.",
    tip: "Tent meat loosely with foil while resting to keep warm, but don't wrap tightly or it will steam and lose crispness."
  },
  {
    title: "Slicing Against the Grain",
    content: "Always slice meat against (perpendicular to) the grain for maximum tenderness. Look for the direction of muscle fibers and cut across them. This is especially important for tougher cuts.",
    tip: "If unsure about grain direction, look closely at the meat surface - you'll see lines indicating muscle fiber direction."
  }
];

export default function MeatHandling() {
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/"
            className="inline-block text-red-600 hover:text-red-700 mb-4 font-medium"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Meat Handling</h1>
          <p className="text-gray-600">Master safe handling, preparation, and cooking of meat</p>
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
                <div className="text-red-500 mr-2">🥩</div>
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
            skill="meat-handling"
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
