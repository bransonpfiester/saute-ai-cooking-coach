# Saute - AI Vision Cooking Coach Setup

Your Saute app now has AI vision capabilities! Here's how to get it running:

## 🔧 Setup Steps

### 1. Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Create a new API key
4. Copy the key (starts with `sk-`)

### 2. Add Environment Variables
Create a `.env.local` file in your project root:

```bash
OPENAI_API_KEY=sk-your-actual-api-key-here
```

**Important:** Never commit this file to version control!

### 3. Install and Run
```bash
# Install dependencies (already done)
npm install

# Start the development server
npm run dev
```

### 4. Open the App
Visit [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use AI Vision Coaching

### Available Skills with AI Coaching:
- **🔪 Knife Basics** - Analyzes grip, posture, cutting technique
- **🔥 Heat Control** - Evaluates temperature management, pan heating
- **🌿 Seasoning & Flavor** - Reviews seasoning timing and technique  
- **📋 Mise en Place** - Assesses organization and preparation

### Using the AI Coach:

1. **Navigate to any skill lesson** (e.g., `/knife-basics`)
2. **Scroll down to the "AI Vision Coach" section**
3. **Click "Enable Camera"** (allow browser permissions)
4. **Position yourself** so the camera can see your hands and workspace
5. **Start practicing** the technique from the lesson
6. **Click "Get AI Feedback"** to capture and analyze your technique
7. **Receive personalized coaching** with specific improvement suggestions

## 💡 Tips for Best Results

### Camera Setup:
- **Good lighting** - Natural light or bright kitchen lighting works best
- **Clear view** - Camera should see your hands, knife, and cutting board
- **Stable position** - Place device on a stable surface or tripod
- **Angle matters** - Side angle often works better than directly overhead

### When to Capture:
- **During active technique** - While actually cutting, stirring, etc.
- **Different stages** - Capture setup, mid-technique, and final result
- **Multiple angles** - Try different camera positions for comprehensive feedback
- **After reading lesson** - Practice the specific technique being taught

### Privacy & Security:
- **No data stored** - Images are processed and immediately discarded
- **Local processing** - Only sends single frames to OpenAI for analysis
- **Camera control** - You control when camera is on/off and when to analyze

## 🛠 Technical Details

### Architecture:
- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **AI Vision**: OpenAI GPT-4 Vision API
- **Camera**: Browser MediaDevices API
- **Processing**: Real-time frame capture and analysis

### API Usage:
- Each analysis uses ~1-2 cents of OpenAI credits
- Optimized prompts for cooking-specific feedback
- Error handling for network issues and API limits

## 🚨 Troubleshooting

### Camera Issues:
- **Permission denied**: Check browser permissions, refresh page
- **No camera found**: Ensure camera is connected and not used by other apps
- **Poor quality**: Try different lighting or camera angle

### API Issues:
- **"API key not configured"**: Check your `.env.local` file
- **"Quota exceeded"**: Add credits to your OpenAI account
- **"Analysis failed"**: Check internet connection, try again

### Performance:
- **Slow analysis**: Normal - AI processing takes 5-10 seconds
- **High usage**: Each capture costs ~$0.01-0.02 in API credits

## 🎉 What You've Built

You now have a sophisticated AI-powered cooking coach that can:

✅ **Analyze real cooking techniques** through computer vision  
✅ **Provide personalized feedback** in natural language  
✅ **Teach 4 fundamental cooking skills** with step-by-step lessons  
✅ **Give contextual coaching** based on current lesson content  
✅ **Work on any device** with a camera and modern browser  

## 🚀 Next Steps

Consider adding:
- **Recipe integration** - AI coaching during actual recipes
- **Progress tracking** - Save feedback and track improvement
- **Video tutorials** - Embedded videos showing correct techniques  
- **Community features** - Share techniques and get peer feedback
- **Advanced skills** - More cooking techniques and cuisines

Your Saute app is now a comprehensive cooking education platform with cutting-edge AI vision capabilities!

---

**Need help?** Check the browser console for detailed error messages or refer to the `VISION_INTEGRATION_GUIDE.md` for technical details.
