import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { image, context, skill, stepTitle, requireValidation, attempts } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Create skill-specific prompts
    const skillPrompts = {
      'knife-basics': `Analyze this cooking image focusing on knife handling technique. Look for:
        - Proper knife grip (pinch grip with thumb and forefinger on blade)
        - Hand positioning and finger placement (claw technique)
        - Cutting board stability and knife angle
        - Safety practices and posture
        Provide specific, encouraging feedback with actionable improvements.`,
      
      'heat-control': `Analyze this cooking image focusing on heat control and temperature management. Look for:
        - Pan preheating indicators (oil shimmer, steam)
        - Food browning and cooking progress
        - Flame/heat level appropriateness
        - Oil temperature and smoking
        Provide specific feedback on temperature adjustments needed.`,
      
      'seasoning': `Analyze this cooking image focusing on seasoning and flavor building. Look for:
        - Timing of seasoning application
        - Distribution and technique
        - Ingredient preparation and mise en place
        - Color and visual cues of proper seasoning
        Provide specific feedback on seasoning technique and timing.`,
      
      'mise-en-place': `Analyze this cooking image focusing on kitchen organization and preparation. Look for:
        - Ingredient preparation and organization
        - Workspace cleanliness and efficiency
        - Tool placement and accessibility
        - Overall kitchen setup and workflow
        Provide specific feedback on organization and preparation technique.`,
      
      'pan-basics': `Analyze this cooking image focusing on pan technique and selection. Look for:
        - Appropriate pan size for the amount of food
        - Pan preheating and oil readiness
        - Food spacing and overcrowding
        - Pan type suitability for the cooking method
        Provide specific feedback on pan technique and usage.`,
      
      'pasta-fundamentals': `Analyze this cooking image focusing on pasta preparation. Look for:
        - Water-to-pasta ratio and pot size
        - Water boiling state and pasta movement
        - Pasta shape and sauce pairing
        - Cooking timing and doneness testing
        Provide specific feedback on pasta cooking technique.`,
      
      'egg-techniques': `Analyze this cooking image focusing on egg preparation. Look for:
        - Heat level appropriateness for egg cooking method
        - Egg freshness indicators and handling
        - Timing and doneness for different egg preparations
        - Pan preparation and oil/butter usage
        Provide specific feedback on egg cooking technique.`,
      
      'vegetable-prep': `Analyze this cooking image focusing on vegetable preparation. Look for:
        - Proper washing and cleaning technique
        - Knife cuts consistency and appropriateness
        - Vegetable handling and storage
        - Blanching or cooking technique if applicable
        Provide specific feedback on vegetable preparation.`,
      
      'sauce-basics': `Analyze this cooking image focusing on sauce making technique. Look for:
        - Roux preparation and consistency
        - Emulsification technique and stability
        - Reduction progress and consistency
        - Seasoning and flavor balance indicators
        Provide specific feedback on sauce making technique.`,
      
      'meat-handling': `Analyze this cooking image focusing on meat handling and preparation. Look for:
        - Food safety practices and cleanliness
        - Proper seasoning timing and technique
        - Meat preparation and cutting technique
        - Cooking method appropriateness for the cut
        Provide specific feedback on meat handling and preparation.`
    };

    let prompt = skillPrompts[skill as keyof typeof skillPrompts] || 
      `Analyze this cooking technique image. Context: ${context}. 
       Provide specific feedback on technique, safety, and improvements.`;

    // If validation is required, modify the prompt to include validation instructions
    if (requireValidation) {
      prompt += `

VALIDATION MODE: You must evaluate if the technique shown is correct for "${stepTitle}".

IMPORTANT: Your response must start with either "APPROVED:" or "NEEDS_IMPROVEMENT:" followed by your feedback.

- Use "APPROVED:" if the technique is correct, safe, and properly executed (confidence 80%+)
- Use "NEEDS_IMPROVEMENT:" if there are significant issues that need correction

Be encouraging but honest. This is attempt ${attempts || 1}.`;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: { 
                url: image,
                detail: "high"
              }
            }
          ]
        }
      ],
      max_tokens: 300,
      temperature: 0.7
    });

    const feedback = response.choices[0].message.content || '';
    
    // Parse validation results if in validation mode
    let isApproved = false;
    let confidence = 0;
    let cleanFeedback = feedback;

    if (requireValidation && feedback) {
      if (feedback.startsWith('APPROVED:')) {
        isApproved = true;
        confidence = 0.85; // High confidence for approval
        cleanFeedback = feedback.replace('APPROVED:', '').trim();
      } else if (feedback.startsWith('NEEDS_IMPROVEMENT:')) {
        isApproved = false;
        confidence = 0.75; // Moderate confidence for rejection
        cleanFeedback = feedback.replace('NEEDS_IMPROVEMENT:', '').trim();
      } else {
        // Fallback: analyze content for approval keywords
        const approvalKeywords = ['excellent', 'perfect', 'correct', 'good technique', 'well done'];
        const improvementKeywords = ['improve', 'incorrect', 'wrong', 'adjust', 'fix', 'better'];
        
        const approvalCount = approvalKeywords.filter(word => 
          feedback.toLowerCase().includes(word)).length;
        const improvementCount = improvementKeywords.filter(word => 
          feedback.toLowerCase().includes(word)).length;
          
        isApproved = approvalCount > improvementCount;
        confidence = Math.max(0.6, (approvalCount + improvementCount) * 0.1);
      }
    }

    return NextResponse.json({
      feedback: cleanFeedback,
      skill,
      timestamp: new Date().toISOString(),
      isApproved: requireValidation ? isApproved : undefined,
      confidence: requireValidation ? confidence : undefined
    });

  } catch (error: any) {
    console.error('OpenAI API error:', error);
    
    if (error.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: 'OpenAI API quota exceeded. Please check your billing.' },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to analyze image. Please try again.' },
      { status: 500 }
    );
  }
}
