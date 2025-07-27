import React, { useState } from "react";
import { JournalEntry } from "@/entities/all";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Save, BookOpen, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function JournalSection({ todayEntry, onEntryUpdate, isLoading }) {
  const [formData, setFormData] = useState(todayEntry || {
    date: format(new Date(), 'yyyy-MM-dd'),
    content: "",
    mood_rating: 3,
    gratitude: "",
    productivity_rating: 3
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      if (todayEntry) {
        await JournalEntry.update(todayEntry.id, formData);
      } else {
        await JournalEntry.create(formData);
      }
      onEntryUpdate();
    } catch (error) {
      console.error("Error saving journal entry:", error);
    }
    setIsSaving(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <Card className="zen-glass zen-shadow rounded-3xl border-white/20">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-20 w-full" />
          <div className="grid grid-cols-2 gap-6">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="zen-glass zen-shadow rounded-3xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Today's Reflection - {format(new Date(), 'EEEE, MMMM d')}
          </CardTitle>
          {todayEntry && (
            <p className="text-white/60 text-sm">
              Last updated: {format(new Date(todayEntry.updated_date), 'h:mm a')}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Journal Content */}
          <div className="space-y-2">
            <Label className="text-white/90 text-lg">How was your day?</Label>
            <Textarea
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="Reflect on your thoughts, feelings, experiences, challenges, and wins from today..."
              className="zen-glass border-white/20 text-white placeholder:text-white/50 min-h-32 resize-none"
              required
            />
          </div>

          {/* Gratitude Section */}
          <div className="space-y-2">
            <Label className="text-white/90 text-lg flex items-center gap-2">
              <Star className="w-5 h-5" />
              What are you grateful for today?
            </Label>
            <Textarea
              value={formData.gratitude}
              onChange={(e) => handleChange('gratitude', e.target.value)}
              placeholder="List three things you're grateful for today..."
              className="zen-glass border-white/20 text-white placeholder:text-white/50 h-20 resize-none"
            />
          </div>

          {/* Rating Sections */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label className="text-white/90 text-lg">Mood Rating</Label>
              <div className="space-y-3">
                <Slider
                  value={[formData.mood_rating]}
                  onValueChange={(value) => handleChange('mood_rating', value[0])}
                  max={5}
                  min={1}
                  step={1}
                  className="zen-slider"
                />
                <div className="flex justify-between text-sm text-white/60">
                  <span>😔 Poor</span>
                  <span className="text-white font-medium">
                    {formData.mood_rating}/5
                  </span>
                  <span>😊 Excellent</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-white/90 text-lg">Productivity Rating</Label>
              <div className="space-y-3">
                <Slider
                  value={[formData.productivity_rating]}
                  onValueChange={(value) => handleChange('productivity_rating', value[0])}
                  max={5}
                  min={1}
                  step={1}
                  className="zen-slider"
                />
                <div className="flex justify-between text-sm text-white/60">
                  <span>🐌 Low</span>
                  <span className="text-white font-medium">
                    {formData.productivity_rating}/5
                  </span>
                  <span>🚀 High</span>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isSaving}
              className="zen-gradient text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : todayEntry ? "Update Entry" : "Save Entry"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}