'use client';

import Link from 'next/link';

const cookingSkills = [
  {
    title: "Knife Basics",
    description: "Master safe knife handling, proper grip, and essential cutting techniques",
    href: "/knife-basics",
    icon: "🔪",
    color: "from-orange-50 to-red-50",
    buttonColor: "bg-orange-500 hover:bg-orange-600"
  },
  {
    title: "Heat Control",
    description: "Learn temperature management for perfect cooking results",
    href: "/heat-control",
    icon: "🔥",
    color: "from-red-50 to-yellow-50",
    buttonColor: "bg-red-500 hover:bg-red-600"
  },
  {
    title: "Seasoning & Flavor",
    description: "Build complex, balanced flavors with herbs, spices, and seasonings",
    href: "/seasoning",
    icon: "🌿",
    color: "from-green-50 to-blue-50",
    buttonColor: "bg-green-500 hover:bg-green-600"
  },
  {
    title: "Mise en Place",
    description: "Master kitchen organization and preparation like a professional chef",
    href: "/mise-en-place",
    icon: "📋",
    color: "from-purple-50 to-pink-50",
    buttonColor: "bg-purple-500 hover:bg-purple-600"
  },
  {
    title: "Pan Basics",
    description: "Master pan selection, heating, and cooking techniques for better results",
    href: "/pan-basics",
    icon: "🍳",
    color: "from-gray-50 to-slate-50",
    buttonColor: "bg-gray-600 hover:bg-gray-700"
  },
  {
    title: "Pasta Fundamentals",
    description: "Learn the art of perfect pasta - from water ratios to al dente timing",
    href: "/pasta-fundamentals",
    icon: "🍝",
    color: "from-yellow-50 to-orange-50",
    buttonColor: "bg-yellow-500 hover:bg-yellow-600"
  },
  {
    title: "Egg Techniques",
    description: "Master every way to cook eggs - scrambled, fried, poached, and boiled",
    href: "/egg-techniques",
    icon: "🥚",
    color: "from-amber-50 to-yellow-50",
    buttonColor: "bg-amber-500 hover:bg-amber-600"
  },
  {
    title: "Vegetable Prep",
    description: "Learn proper vegetable handling, cutting, and preparation techniques",
    href: "/vegetable-prep",
    icon: "🥬",
    color: "from-emerald-50 to-green-50",
    buttonColor: "bg-emerald-500 hover:bg-emerald-600"
  },
  {
    title: "Sauce Basics",
    description: "Master the fundamental sauces and techniques of classical cooking",
    href: "/sauce-basics",
    icon: "🍅",
    color: "from-rose-50 to-pink-50",
    buttonColor: "bg-rose-500 hover:bg-rose-600"
  },
  {
    title: "Meat Handling",
    description: "Learn safe meat handling, preparation, and cooking techniques",
    href: "/meat-handling",
    icon: "🥩",
    color: "from-red-50 to-orange-50",
    buttonColor: "bg-red-600 hover:bg-red-700"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            Sauté
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master the fundamental cooking skills with step-by-step interactive lessons. 
            Build your culinary foundation one technique at a time.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {cookingSkills.map((skill, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${skill.color} rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="p-8">
                <div className="text-4xl mb-4 text-center">{skill.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">
                  {skill.title}
                </h3>
                <p className="text-gray-600 mb-6 text-center leading-relaxed">
                  {skill.description}
                </p>
                <div className="text-center">
                  <Link 
                    href={skill.href}
                    className={`inline-block ${skill.buttonColor} text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg`}
                  >
                    Start Learning
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🚀 Coming Soon: AI Vision Coaching
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We're working on integrating AI vision technology that can watch your cooking technique 
            and provide real-time feedback. Soon you'll be able to get personalized coaching as you 
            practice these fundamental skills!
          </p>
        </div>
      </div>
    </div>
  );
}