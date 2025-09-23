'use client';

import Link from 'next/link';

const cookingSkills = [
  {
    title: "Knife Basics",
    description: "Master safe knife handling and cutting techniques",
    href: "/knife-basics",
    icon: "🔪",
    gradient: "from-orange-400 via-red-400 to-pink-400",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
    lessons: 5,
    difficulty: "Beginner"
  },
  {
    title: "Heat Control",
    description: "Perfect temperature management",
    href: "/heat-control",
    icon: "🔥",
    gradient: "from-red-400 via-orange-400 to-yellow-400",
    bgColor: "bg-gradient-to-br from-red-50 to-yellow-50",
    lessons: 5,
    difficulty: "Beginner"
  },
  {
    title: "Seasoning",
    description: "Build complex, balanced flavors",
    href: "/seasoning",
    icon: "🌿",
    gradient: "from-green-400 via-emerald-400 to-teal-400",
    bgColor: "bg-gradient-to-br from-green-50 to-blue-50",
    lessons: 5,
    difficulty: "Intermediate"
  },
  {
    title: "Mise en Place",
    description: "Professional kitchen organization",
    href: "/mise-en-place",
    icon: "📋",
    gradient: "from-purple-400 via-pink-400 to-rose-400",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    lessons: 5,
    difficulty: "Beginner"
  },
  {
    title: "Pan Basics",
    description: "Master pan selection and techniques",
    href: "/pan-basics",
    icon: "🍳",
    gradient: "from-gray-400 via-slate-400 to-zinc-400",
    bgColor: "bg-gradient-to-br from-gray-50 to-slate-50",
    lessons: 5,
    difficulty: "Beginner"
  },
  {
    title: "Pasta Fundamentals",
    description: "Perfect pasta every time",
    href: "/pasta-fundamentals",
    icon: "🍝",
    gradient: "from-yellow-400 via-amber-400 to-orange-400",
    bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
    lessons: 5,
    difficulty: "Beginner"
  },
  {
    title: "Egg Techniques",
    description: "Master every egg cooking method",
    href: "/egg-techniques",
    icon: "🥚",
    gradient: "from-amber-400 via-yellow-400 to-lime-400",
    bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50",
    lessons: 5,
    difficulty: "Intermediate"
  },
  {
    title: "Vegetable Prep",
    description: "Proper handling and preparation",
    href: "/vegetable-prep",
    icon: "🥬",
    gradient: "from-emerald-400 via-green-400 to-lime-400",
    bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
    lessons: 5,
    difficulty: "Beginner"
  },
  {
    title: "Sauce Basics",
    description: "Classical sauce foundations",
    href: "/sauce-basics",
    icon: "🍅",
    gradient: "from-rose-400 via-red-400 to-orange-400",
    bgColor: "bg-gradient-to-br from-rose-50 to-pink-50",
    lessons: 5,
    difficulty: "Advanced"
  },
  {
    title: "Meat Handling",
    description: "Safe preparation and cooking",
    href: "/meat-handling",
    icon: "🥩",
    gradient: "from-red-400 via-rose-400 to-pink-400",
    bgColor: "bg-gradient-to-br from-red-50 to-orange-50",
    lessons: 5,
    difficulty: "Intermediate"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 pt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl mb-6 shadow-lg">
            <span className="text-3xl">👨‍🍳</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-4">
            Sauté
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Master cooking fundamentals with AI-powered vision coaching
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Skills</p>
                <p className="text-3xl font-bold text-gray-900">10</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center">
                <span className="text-xl">📚</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">AI Coaching</p>
                <p className="text-3xl font-bold text-gray-900">Live</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                <span className="text-xl">🤖</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Lessons</p>
                <p className="text-3xl font-bold text-gray-900">50</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
                <span className="text-xl">🎯</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Cooking Skills</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>Beginner</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span>Intermediate</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span>Advanced</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cookingSkills.map((skill, index) => (
              <Link key={index} href={skill.href}>
                <div className="group cursor-pointer">
                  <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Icon and Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${skill.gradient} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                        {skill.icon}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        skill.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                        skill.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {skill.difficulty}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {skill.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {skill.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center space-x-1">
                          <span>📖</span>
                          <span>{skill.lessons} lessons</span>
                        </span>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* AI Features Card */}
        <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-3xl p-8 text-white shadow-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🚀</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              AI Vision Coaching
            </h2>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Revolutionary AI technology watches your technique and provides real-time feedback. 
              Master cooking skills with personalized coaching that adapts to your progress.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 rounded-2xl p-4">
                <div className="text-2xl mb-2">📹</div>
                <h4 className="font-semibold mb-1">Live Analysis</h4>
                <p className="text-sm opacity-80">Real-time technique evaluation</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-semibold mb-1">Step Validation</h4>
                <p className="text-sm opacity-80">Prove mastery before advancing</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4">
                <div className="text-2xl mb-2">💡</div>
                <h4 className="font-semibold mb-1">Smart Feedback</h4>
                <p className="text-sm opacity-80">Personalized improvement tips</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}