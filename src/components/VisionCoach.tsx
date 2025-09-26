'use client';

import { useRef, useState, useEffect } from 'react';

interface VisionCoachProps {
  skill: 'knife-basics' | 'heat-control' | 'seasoning' | 'mise-en-place' | 'pan-basics' | 'pasta-fundamentals' | 'egg-techniques' | 'vegetable-prep' | 'sauce-basics' | 'meat-handling';
  context?: string;
  stepTitle?: string;
  onValidationSuccess?: () => void;
  requireValidation?: boolean;
}

interface AnalysisResult {
  feedback: string;
  skill: string;
  timestamp: string;
  isApproved?: boolean;
  confidence?: number;
}

export default function VisionCoach({ skill, context = '', stepTitle = '', onValidationSuccess, requireValidation = false }: VisionCoachProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isApproved, setIsApproved] = useState<boolean | null>(null);
  const [confidence, setConfidence] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);

  // Ensure component is loaded on client side
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Start camera stream
  const startCamera = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreamActive(true);
        setHasPermission(true);
      }
    } catch (error: unknown) {
      console.error('Camera access error:', error);
      setHasPermission(false);
      
      if (error && typeof error === 'object' && 'name' in error) {
        if (error.name === 'NotAllowedError') {
          setError('Camera access denied. Please allow camera permissions and refresh the page.');
        } else if (error.name === 'NotFoundError') {
          setError('No camera found. Please connect a camera and try again.');
        } else {
          setError('Failed to access camera. Please check your camera settings.');
        }
      } else {
        setError('Failed to access camera. Please check your camera settings.');
      }
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreamActive(false);
    }
  };

  // Capture frame and send for analysis
  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current || !isStreamActive) return;

    setIsAnalyzing(true);
    setError('');

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      // Set canvas dimensions to match video
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      // Draw current video frame to canvas
      ctx.drawImage(videoRef.current, 0, 0);
      
      // Convert to base64 image
      const imageData = canvas.toDataURL('image/jpeg', 0.8);

      // Send to API for analysis
      const response = await fetch('/api/analyze-cooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageData,
          context,
          skill,
          stepTitle,
          requireValidation,
          attempts: attempts + 1
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const result: AnalysisResult = await response.json();
      setFeedback(result.feedback || 'No feedback received');
      setIsApproved(result.isApproved || false);
      setConfidence(result.confidence || 0);
      setAttempts(prev => prev + 1);

      // If validation is required and technique is approved, call success callback
      if (requireValidation && result.isApproved && onValidationSuccess) {
        setTimeout(() => {
          onValidationSuccess();
        }, 2000); // Give user time to read the approval message
      }

    } catch (error: unknown) {
      console.error('Analysis error:', error);
      const errorMessage = error && typeof error === 'object' && 'message' in error 
        ? String(error.message) 
        : 'Failed to analyze image. Please try again.';
      setError(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const skillTitles = {
    'knife-basics': 'Knife Technique Coach',
    'heat-control': 'Heat Control Coach',
    'seasoning': 'Seasoning Coach',
    'mise-en-place': 'Organization Coach',
    'pan-basics': 'Pan Technique Coach',
    'pasta-fundamentals': 'Pasta Coach',
    'egg-techniques': 'Egg Technique Coach',
    'vegetable-prep': 'Vegetable Prep Coach',
    'sauce-basics': 'Sauce Making Coach',
    'meat-handling': 'Meat Handling Coach'
  };

  const skillEmojis = {
    'knife-basics': '🔪',
    'heat-control': '🔥',
    'seasoning': '🌿',
    'mise-en-place': '📋',
    'pan-basics': '🍳',
    'pasta-fundamentals': '🍝',
    'egg-techniques': '🥚',
    'vegetable-prep': '🥬',
    'sauce-basics': '🍅',
    'meat-handling': '🥩'
  };

  // Don't render until loaded on client side
  if (!isLoaded) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl mb-4 shadow-lg">
          <span className="text-2xl">{skillEmojis[skill]}</span>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-2">
          AI {skillTitles[skill]}
        </h2>
        <p className="text-gray-600">
          Get real-time feedback on your cooking technique
        </p>
      </div>

      {/* Mobile-First Camera Preview */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Camera View - Full Width on Mobile */}
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 aspect-video sm:aspect-[4/3] overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          <canvas ref={canvasRef} className="hidden" />
          
          {/* Mobile-optimized Live indicator */}
          {isStreamActive && (
            <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              LIVE
            </div>
          )}
          
          {/* Mobile-optimized AI Status */}
          {isStreamActive && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-green-500 text-white px-2 py-1.5 rounded-full text-xs font-medium shadow-lg">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
              AI
            </div>
          )}
          
          {/* Mobile-friendly overlay guidelines */}
          {isStreamActive && (
            <div className="absolute inset-4 border-2 border-cyan-400 border-dashed rounded-2xl opacity-50 pointer-events-none">
              <div className="absolute -top-0.5 left-2 text-cyan-400 text-xs font-bold bg-gray-900 bg-opacity-80 px-2 py-0.5 rounded">
                Keep in frame
              </div>
            </div>
          )}
          
          {/* Camera not active - Mobile optimized */}
          {!isStreamActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <div className="text-center px-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <span className="text-white text-2xl">📹</span>
                </div>
                <h4 className="text-white font-bold text-lg mb-2">AI Coach Camera</h4>
                <p className="text-gray-300 text-sm mb-4 max-w-xs">
                  Your camera preview will appear here
                </p>
                {hasPermission === null && (
                  <button
                    onClick={startCamera}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg active:scale-95 transition-all duration-200"
                  >
                    <span className="mr-2">🎥</span>
                    Enable Camera
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Instructions Section - Below Camera */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">👁️</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                AI Technique Coach
              </h3>
              <p className="text-blue-600 text-sm">
                {isStreamActive ? 'Watching your technique' : 'Ready to help you improve'}
              </p>
            </div>
          </div>

          {/* Mobile-friendly status */}
          {isStreamActive && (
            <div className="mb-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-3 border border-green-200">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-800 font-medium">Camera Active</span>
                </div>
                <span className="text-blue-700">
                  {isAnalyzing ? 'Analyzing...' : 'Ready to analyze'}
                </span>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 text-base">📋 What to do:</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">1.</span>
                <span>Position your phone so the camera can see your hands and workspace</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">2.</span>
                <span>Practice the technique shown in the lesson above</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">3.</span>
                <span>Tap &quot;Get AI Feedback&quot; when you&apos;re ready for analysis</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">4.</span>
                <span>Follow the AI&apos;s suggestions to improve your technique</span>
              </div>
            </div>
          </div>

          {/* Mobile tips */}
          <div className="mt-4 bg-amber-50 rounded-xl p-3 border border-amber-200">
            <div className="flex items-start gap-2">
              <span className="text-amber-600 text-lg">💡</span>
              <div>
                <p className="text-amber-800 font-medium text-sm">Mobile Tips:</p>
                <p className="text-amber-700 text-xs mt-1">
                  • Use good lighting • Keep phone steady • Show your full technique
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Camera Access Denied */}
      {hasPermission === false && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-red-500 mr-3">⚠️</div>
            <div>
              <h3 className="font-semibold text-red-800">Camera Access Required</h3>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile-Optimized Controls */}
      {hasPermission && (
        <div className="mt-6">
          {!isStreamActive ? (
            <button
              onClick={startCamera}
              className="w-full bg-green-500 active:bg-green-600 text-white font-semibold py-4 px-6 rounded-2xl transition-colors shadow-lg active:scale-95 duration-200"
            >
              🎥 Start Camera
            </button>
          ) : (
            <div className="space-y-3">
              <button
                onClick={captureAndAnalyze}
                disabled={isAnalyzing || (requireValidation && isApproved === true)}
                className={`w-full font-semibold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg active:scale-95 ${
                  requireValidation && isApproved === true
                    ? 'bg-green-500 text-white cursor-default'
                    : requireValidation
                    ? 'bg-orange-500 active:bg-orange-600 disabled:bg-gray-400 text-white'
                    : 'bg-blue-500 active:bg-blue-600 disabled:bg-gray-400 text-white'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Analyzing Technique...</span>
                  </>
                ) : requireValidation && isApproved === true ? (
                  <>
                    <span className="text-xl">✅</span>
                    <span>Technique Approved!</span>
                  </>
                ) : requireValidation ? (
                  <>
                    <span className="text-xl">🎯</span>
                    <span>{attempts === 0 ? 'Validate My Technique' : 'Try Again'}</span>
                  </>
                ) : (
                  <>
                    <span className="text-xl">📸</span>
                    <span>Get AI Feedback</span>
                  </>
                )}
              </button>
              
              <button
                onClick={stopCamera}
                className="w-full bg-gray-500 active:bg-gray-600 text-white font-medium py-3 px-4 rounded-xl transition-colors active:scale-95 duration-200"
              >
                Stop Camera
              </button>
            </div>
          )}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="text-red-500 mr-3 mt-0.5">❌</div>
            <div>
              <h3 className="font-semibold text-red-800">Error</h3>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* AI Feedback */}
      {feedback && (
        <div className={`rounded-lg p-6 ${
          requireValidation 
            ? isApproved === true
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
              : 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200'
            : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200'
        }`}>
          <div className="flex items-start">
            <div className="text-2xl mr-4">
              {requireValidation 
                ? isApproved === true
                  ? '✅' 
                  : '🔄' 
                : '🤖'}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-semibold ${
                  requireValidation 
                    ? isApproved === true
                      ? 'text-green-800' 
                      : 'text-yellow-800'
                    : 'text-blue-800'
                }`}>
                  {requireValidation 
                    ? isApproved === true
                      ? '✨ Technique Approved!' 
                      : `Try Again (Attempt ${attempts})`
                    : 'AI Coach Feedback:'}
                </h3>
                {requireValidation && confidence > 0 && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isApproved === true
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {Math.round(confidence * 100)}% confident
                  </span>
                )}
              </div>
              <p className={`leading-relaxed whitespace-pre-wrap ${
                requireValidation 
                  ? isApproved === true
                    ? 'text-green-700' 
                    : 'text-yellow-700'
                  : 'text-blue-700'
              }`}>
                {feedback}
              </p>
              {requireValidation && isApproved === true && (
                <div className="mt-3 p-3 bg-green-100 rounded-lg">
                  <p className="text-green-800 text-sm font-medium">
                    🎉 Great job! You can now proceed to the next step.
                  </p>
                </div>
              )}
              {requireValidation && isApproved !== true && attempts > 0 && (
                <div className="mt-3 p-3 bg-yellow-100 rounded-lg">
                  <p className="text-yellow-800 text-sm font-medium">
                    💪 Keep practicing! Try adjusting your technique and capture again.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Usage Tips */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">💡 Tips for Best Results:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Ensure good lighting on your workspace</li>
          <li>• Position camera to clearly show your hands and technique</li>
          <li>• Capture during active cooking/preparation</li>
          <li>• Try different angles for comprehensive feedback</li>
        </ul>
      </div>
    </div>
  );
}
