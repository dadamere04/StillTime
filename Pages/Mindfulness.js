import React, { useState, useEffect } from "react";
import { JournalEntry, UserSettings } from "@/entities/all";
import { format } from "date-fns";
import { Heart, BookOpen, Wind, Moon, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import JournalSection from "../components/mindfulness/JournalSection";
import BreathingExercise from "../components/mindfulness/BreathingExercise";
import MindfulnessTips from "../components/mindfulness/MindfulnessTips";

export default function MindfulnessPage() {
  const [todayEntry, setTodayEntry] = useState(null);
  const [userSettings, setUserSettings] = useState(null);
  const [activeTab, setActiveTab] = useState("journal");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMindfulnessData();
  }, []);

  const loadMindfulnessData = async () => {
    setIsLoading(true);
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      
      // Load today's journal entry
      const entries = await JournalEntry.filter({ date: today });
      const todaysEntry = entries.length > 0 ? entries[0] : null;
      
      // Load user settings
      const settings = await UserSettings.list();
      const userSetting = settings.length > 0 ? settings[0] : null;
      
      setTodayEntry(todaysEntry);
      setUserSettings(userSetting);
    } catch (error) {
      console.error("Error loading mindfulness data:", error);
    }
    setIsLoading(false);
  };

  const getCurrentTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { icon: Sun, text: "Good morning", message: "Start your day with mindful intention" };
    if (hour < 17) return { icon: Sun, text: "Good afternoon", message: "Take a mindful pause" };
    return { icon: Moon, text: "Good evening", message: "Reflect on your day with gratitude" };
  };

  const greeting = getCurrentTimeGreeting();
  const GreetingIcon = greeting.icon;

  return (
    <div className="min-h-screen p-4 md:p-8" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center">
            <Heart className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mindfulness Space ✨
          </h1>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <GreetingIcon className="w-6 h-6 text-white/80" />
            <p className="text-xl text-white/80">
              {greeting.text}! {greeting.message}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <Card className="zen-glass zen-shadow rounded-3xl border-white/20">
          <CardContent className="p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-8 zen-glass border border-white/20">
                <TabsTrigger 
                  value="journal" 
                  className="data-[state=active]:zen-gradient data-[state=active]:text-white text-white/70"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Journal
                </TabsTrigger>
                <TabsTrigger 
                  value="breathing"
                  className="data-[state=active]:zen-gradient data-[state=active]:text-white text-white/70"
                >
                  <Wind className="w-4 h-4 mr-2" />
                  Breathing
                </TabsTrigger>
                <TabsTrigger 
                  value="tips"
                  className="data-[state=active]:zen-gradient data-[state=active]:text-white text-white/70"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Tips
                </TabsTrigger>
              </TabsList>

              <TabsContent value="journal" className="space-y-6">
                <JournalSection 
                  todayEntry={todayEntry}
                  onEntryUpdate={loadMindfulnessData}
                  isLoading={isLoading}
                />
              </TabsContent>

              <TabsContent value="breathing" className="space-y-6">
                <BreathingExercise />
              </TabsContent>

              <TabsContent value="tips" className="space-y-6">
                <MindfulnessTips />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}