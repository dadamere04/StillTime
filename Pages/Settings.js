import React, { useState, useEffect } from "react";
import { UserSettings } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, Clock, Utensils, Moon, Sun, Save } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    breakfast_time: "08:00",
    breakfast_duration: 30,
    lunch_time: "12:30", 
    lunch_duration: 30,
    dinner_time: "18:00",
    dinner_duration: 30,
    sleep_time: "22:00",
    wake_time: "06:00",
    mindfulness_enabled: true,
    work_start: "09:00",
    work_end: "17:00"
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [existingSettings, setExistingSettings] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const userSettings = await UserSettings.list();
      if (userSettings.length > 0) {
        setSettings(userSettings[0]);
        setExistingSettings(userSettings[0]);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (existingSettings) {
        await UserSettings.update(existingSettings.id, settings);
      } else {
        await UserSettings.create(settings);
      }
      await loadSettings(); // Reload to get updated data
    } catch (error) {
      console.error("Error saving settings:", error);
    }
    setIsSaving(false);
  };

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 md:p-8" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {Array(4).fill(0).map((_, i) => (
              <Card key={i} className="zen-glass zen-shadow rounded-3xl border-white/20">
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {Array(3).fill(0).map((_, j) => (
                    <div key={j} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Settings ⚙️
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Customize your daily routine and preferences for optimal scheduling
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Meal Times */}
          <Card className="zen-glass zen-shadow rounded-3xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Utensils className="w-6 h-6" />
                Meal Times
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white/90">Breakfast Time</Label>
                    <Input
                      type="time"
                      value={settings.breakfast_time}
                      onChange={(e) => handleChange('breakfast_time', e.target.value)}
                      className="zen-glass border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/90">Duration (min)</Label>
                    <Input
                      type="number"
                      min="5"
                      max="120"
                      value={settings.breakfast_duration}
                      onChange={(e) => handleChange('breakfast_duration', parseInt(e.target.value))}
                      className="zen-glass border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white/90">Lunch Time</Label>
                    <Input
                      type="time"
                      value={settings.lunch_time}
                      onChange={(e) => handleChange('lunch_time', e.target.value)}
                      className="zen-glass border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/90">Duration (min)</Label>
                    <Input
                      type="number"
                      min="5"
                      max="120"
                      value={settings.lunch_duration}
                      onChange={(e) => handleChange('lunch_duration', parseInt(e.target.value))}
                      className="zen-glass border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white/90">Dinner Time</Label>
                    <Input
                      type="time"
                      value={settings.dinner_time}
                      onChange={(e) => handleChange('dinner_time', e.target.value)}
                      className="zen-glass border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/90">Duration (min)</Label>
                    <Input
                      type="number"
                      min="5"
                      max="120"
                      value={settings.dinner_duration}
                      onChange={(e) => handleChange('dinner_duration', parseInt(e.target.value))}
                      className="zen-glass border-white/20 text-white"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sleep Schedule */}
          <Card className="zen-glass zen-shadow rounded-3xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Moon className="w-6 h-6" />
                Sleep Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/90">Bedtime</Label>
                  <Input
                    type="time"
                    value={settings.sleep_time}
                    onChange={(e) => handleChange('sleep_time', e.target.value)}
                    className="zen-glass border-white/20 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/90">Wake Time</Label>
                  <Input
                    type="time"
                    value={settings.wake_time}
                    onChange={(e) => handleChange('wake_time', e.target.value)}
                    className="zen-glass border-white/20 text-white"
                  />
                </div>
              </div>
              
              <div className="p-4 rounded-2xl zen-glass border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white/90">Evening Mindfulness Reminders</Label>
                    <p className="text-sm text-white/60">Get gentle reminders 30 minutes before bedtime</p>
                  </div>
                  <Switch
                    checked={settings.mindfulness_enabled}
                    onCheckedChange={(checked) => handleChange('mindfulness_enabled', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Work Hours */}
          <Card className="zen-glass zen-shadow rounded-3xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Work Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/90">Start Time</Label>
                  <Input
                    type="time"
                    value={settings.work_start}
                    onChange={(e) => handleChange('work_start', e.target.value)}
                    className="zen-glass border-white/20 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/90">End Time</Label>
                  <Input
                    type="time"
                    value={settings.work_end}
                    onChange={(e) => handleChange('work_end', e.target.value)}
                    className="zen-glass border-white/20 text-white"
                  />
                </div>
              </div>
              
              <div className="text-center text-white/60 text-sm">
                <p>These hours help the scheduler prioritize work tasks during your productive hours</p>
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card className="zen-glass zen-shadow rounded-3xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <SettingsIcon className="w-6 h-6" />
                About ZenScheduler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white/80 text-sm leading-relaxed">
                ZenScheduler helps you build structure and mindful time management habits. 
                Your settings create the foundation for smart scheduling that respects your natural rhythms.
              </p>
              <div className="space-y-2 text-xs text-white/60">
                <p>• Automatically schedules meals and sleep</p>
                <p>• Respects your work hours for task planning</p>
                <p>• Sends mindfulness reminders when enabled</p>
                <p>• Learns from your preferences over time</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="text-center mt-8">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="zen-gradient text-white shadow-lg hover:shadow-xl transition-all duration-300 px-12 py-3"
          >
            <Save className="w-5 h-5 mr-2" />
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>
    </div>
  );
}