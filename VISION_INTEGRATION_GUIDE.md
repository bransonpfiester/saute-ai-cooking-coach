# AI Vision Model Integration Guide for Saute

This guide explains how to integrate AI vision models into your Saute cooking app to provide real-time feedback on cooking techniques.

## Overview

The vision system will analyze users' cooking techniques through their webcam and provide real-time feedback on:
- Knife grip and cutting technique
- Posture and hand positioning
- Heat control (visual cues from pan/food)
- Ingredient preparation quality

## Implementation Options

### Option 1: MediaPipe (Recommended for Pose/Hand Analysis)

**Best for:** Analyzing hand positions, posture, and movement patterns

```bash
npm install @mediapipe/hands @mediapipe/pose
```

**Implementation:**

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

export default function VisionCoach() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [feedback, setFeedback] = useState<string>('');

  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      const hands = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      });

      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      hands.onResults((results) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        
        if (ctx && canvas) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          if (results.multiHandLandmarks) {
            // Analyze hand positions for knife grip
            const gripFeedback = analyzeKnifeGrip(results.multiHandLandmarks);
            setFeedback(gripFeedback);
          }
        }
      });

      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await hands.send({ image: videoRef.current! });
        },
        width: 640,
        height: 480
      });

      camera.start();
    }
  }, []);

  const analyzeKnifeGrip = (landmarks: any[]) => {
    // Implement knife grip analysis logic
    // Check thumb and finger positions relative to knife handle
    return "Adjust your grip - pinch the blade with thumb and forefinger";
  };

  return (
    <div className="relative">
      <video ref={videoRef} className="hidden" />
      <canvas ref={canvasRef} className="w-full h-auto" />
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white p-4 rounded">
        {feedback}
      </div>
    </div>
  );
}
```

### Option 2: TensorFlow.js with Custom Model

**Best for:** Custom cooking-specific analysis

```bash
npm install @tensorflow/tfjs @tensorflow/tfjs-backend-webgl
```

**Implementation:**

```tsx
'use client';

import * as tf from '@tensorflow/tfjs';
import { useEffect, useRef, useState } from 'react';

export default function CookingAnalyzer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [analysis, setAnalysis] = useState<string>('');

  useEffect(() => {
    // Load your custom trained model
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadGraphModel('/models/cooking-model.json');
        setModel(loadedModel);
      } catch (error) {
        console.error('Failed to load model:', error);
      }
    };

    loadModel();
  }, []);

  useEffect(() => {
    const setupCamera = async () => {
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 }
        });
        videoRef.current.srcObject = stream;
      }
    };

    setupCamera();
  }, []);

  const analyzeFrame = async () => {
    if (model && videoRef.current) {
      const tensor = tf.browser.fromPixels(videoRef.current)
        .resizeNearestNeighbor([224, 224])
        .expandDims(0)
        .div(255.0);

      const predictions = await model.predict(tensor) as tf.Tensor;
      const results = await predictions.data();
      
      // Process results and provide feedback
      const feedback = interpretPredictions(Array.from(results));
      setAnalysis(feedback);

      tensor.dispose();
      predictions.dispose();
    }

    requestAnimationFrame(analyzeFrame);
  };

  const interpretPredictions = (predictions: number[]) => {
    // Implement your prediction interpretation logic
    if (predictions[0] > 0.8) {
      return "Great knife technique! Keep it up.";
    } else if (predictions[1] > 0.6) {
      return "Adjust your grip for better control.";
    }
    return "Position your hands correctly on the knife.";
  };

  useEffect(() => {
    if (model) {
      analyzeFrame();
    }
  }, [model]);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-auto rounded-lg"
      />
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800">AI Feedback:</h3>
        <p className="text-blue-700">{analysis}</p>
      </div>
    </div>
  );
}
```

### Option 3: OpenAI GPT-4 Vision API (Server-Side)

**Best for:** Advanced image understanding and natural language feedback

**API Route (`app/api/analyze-cooking/route.ts`):**

```typescript
import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { image, context } = await request.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this cooking technique image. Context: ${context}. 
                     Provide specific feedback on technique, safety, and improvements.`
            },
            {
              type: "image_url",
              image_url: { url: image }
            }
          ]
        }
      ],
      max_tokens: 300
    });

    return NextResponse.json({
      feedback: response.choices[0].message.content
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to analyze image' },
      { status: 500 }
    );
  }
}
```

**Client Component:**

```tsx
'use client';

import { useRef, useState } from 'react';

export default function GPTVisionCoach() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsAnalyzing(true);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    ctx?.drawImage(videoRef.current, 0, 0);
    
    const imageData = canvas.toDataURL('image/jpeg', 0.8);

    try {
      const response = await fetch('/api/analyze-cooking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imageData,
          context: 'knife cutting technique analysis'
        })
      });

      const result = await response.json();
      setFeedback(result.feedback);
    } catch (error) {
      console.error('Analysis failed:', error);
      setFeedback('Analysis failed. Please try again.');
    }

    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-4">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-auto rounded-lg"
      />
      <canvas ref={canvasRef} className="hidden" />
      
      <button
        onClick={captureAndAnalyze}
        disabled={isAnalyzing}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg"
      >
        {isAnalyzing ? 'Analyzing...' : 'Get AI Feedback'}
      </button>

      {feedback && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">AI Coach Says:</h3>
          <p className="text-green-700">{feedback}</p>
        </div>
      )}
    </div>
  );
}
```

## Integration Steps

### 1. Choose Your Approach
- **MediaPipe**: Best for real-time pose/hand analysis
- **TensorFlow.js**: Best for custom models
- **OpenAI Vision**: Best for comprehensive analysis

### 2. Add Environment Variables
Create `.env.local`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Update Existing Lesson Pages
Add vision coaching to existing lessons:

```tsx
import VisionCoach from '@/components/VisionCoach';

export default function KnifeBasics() {
  return (
    <div>
      {/* Existing lesson content */}
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Practice with AI Coach</h2>
        <VisionCoach />
      </div>
    </div>
  );
}
```

### 4. Handle Permissions
Always request camera permissions properly:

```tsx
const requestCameraPermission = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    // Use stream
    return stream;
  } catch (error) {
    console.error('Camera access denied:', error);
    // Show fallback UI
  }
};
```

## Privacy and Security Considerations

1. **User Consent**: Always ask for explicit permission before accessing camera
2. **Data Handling**: Process images locally when possible
3. **No Storage**: Don't store video/images unless explicitly needed
4. **HTTPS Required**: Camera access requires secure context

## Performance Tips

1. **Reduce Frame Rate**: Analyze every 3rd or 5th frame for better performance
2. **Lower Resolution**: Use 640x480 or smaller for analysis
3. **Debounce Feedback**: Don't update UI too frequently
4. **Dispose Tensors**: Always clean up TensorFlow tensors to prevent memory leaks

## Testing

Test on various devices and lighting conditions:
- Different browsers (Chrome, Safari, Firefox)
- Mobile devices
- Various lighting conditions
- Different camera qualities

This integration will transform your Saute app into an intelligent cooking coach that can provide real-time, personalized feedback to help users master cooking techniques.
