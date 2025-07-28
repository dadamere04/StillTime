import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Moon, Sun } from "lucide-react";
import { useNavigation } from "@react-navigation/native";

export default function MindfulnessBanner({ userSettings }) {
  const navigation = useNavigation();
  const currentHour = new Date().getHours();
  const isEvening = currentHour >= 18;
  const isMorning = currentHour >= 6 && currentHour < 12;

  const getMindfulMessage = () => {
    if (isMorning) {
      return {
        icon: Sun,
        title: "Morning Mindfulness",
        message: "Start your day with intention. Take a deep breath and set your focus.",
        action: "Morning Meditation",
        screen: "MorningMeditation" 
      };
    } else if (isEvening) {
      return {
        icon: Moon,
        title: "Evening Reflection", 
        message: "Wind down mindfully. Reflect on your day and prepare for rest.",
        action: "Evening Journal",
        screen: "EveningJournal" 
      };
    } else {
      return {
        icon: Heart,
        title: "Mindful Moment",
        message: "Take a pause. Your wellbeing matters as much as your productivity.",
        action: "Quick Breathing",
        screen: "QuickBreathing" 
      };
    }
  };

  const mindfulContent = getMindfulMessage();
  const IconComponent = mindfulContent.icon;

  const handlePress = () => {
    navigation.navigate(mindfulContent.screen);
  };

  return (
    <Card className="zen-glass zen-shadow rounded-3xl border-white/20 overflow-hidden">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center">
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              {mindfulContent.title}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              {mindfulContent.message}
            </p>
          </div>

          <Button 
            onPress={handlePress}
            className="zen-gradient rounded-2xl px-6 py-2 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Heart className="w-4 h-4 mr-2" />
            {mindfulContent.action}
          </Button>

          {userSettings?.mindfulness_enabled && isEvening && (
            <div className="text-xs text-white/50 mt-4">
              Evening mindfulness reminder enabled
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}