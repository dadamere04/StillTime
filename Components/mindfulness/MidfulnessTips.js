import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Sun, 
  Moon, 
  Coffee, 
  Smartphone, 
  Clock,
  TreePine,
  Headphones
} from "lucide-react";

const tips = [
  {
    icon: Sun,
    title: "Morning Mindfulness",
    description: "Start your day with 5 minutes of deep breathing or meditation before checking your phone.",
    color: "from-yellow-400 to-orange-400"
  },
  {
    icon: Clock,
    title: "Mindful Transitions",
    description: "Take three deep breaths between tasks to reset your focus and intention.",
    color: "from-blue-400 to-indigo-400"
  },
  {
    icon: Coffee,
    title: "Mindful Eating",
    description: "Eat your meals without distractions. Focus on flavors, textures, and gratitude.",
    color: "from-amber-400 to-red-400"
  },
  {
    icon: Smartphone,
    title: "Digital Boundaries",
    description: "Set specific times for checking messages and social media. Your mind will thank you.",
    color: "from-purple-400 to-pink-400"
  },
  {
    icon: TreePine,
    title: "Nature Connection",
    description: "Spend time outdoors daily, even if it's just a few minutes. Nature is a natural stress reliever.",
    color: "from-green-400 to-teal-400"
  },
  {
    icon: Moon,
    title: "Evening Wind-Down",
    description: "Create a calming routine 30 minutes before bed. No screens, just peaceful activities.",
    color: "from-indigo-400 to-purple-400"
  },
  {
    icon: Heart,
    title: "Self-Compassion",
    description: "Treat yourself with the same kindness you'd show a good friend. You're doing your best.",
    color: "from-pink-400 to-rose-400"
  },
  {
    icon: Headphones,
    title: "Mindful Listening",
    description: "When others speak, give them your full attention. It's a gift to both of you.",
    color: "from-cyan-400 to-blue-400"
  }
];

export default function MindfulnessTips() {
  return (
    <div className="space-y-6">
      <Card className="zen-glass zen-shadow rounded-3xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Heart className="w-6 h-6" />
            Daily Mindfulness Tips
          </CardTitle>
          <p className="text-white/70">
            Simple practices to bring more awareness and peace into your everyday life
          </p>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {tips.map((tip, index) => {
          const IconComponent = tip.icon;
          return (
            <Card key={index} className="zen-glass zen-shadow rounded-3xl border-white/20 hover:border-white/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${tip.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bonus Section */}
      <Card className="zen-glass zen-shadow rounded-3xl border-white/20">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-gold-400 to-yellow-400 flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Remember: Progress, Not Perfection
          </h3>
          <p className="text-white/80 leading-relaxed max-w-2xl mx-auto">
            Mindfulness is a practice, not a destination. Some days will be easier than others, 
            and that's perfectly okay. Every moment you choose awareness over autopilot is a victory worth celebrating.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
