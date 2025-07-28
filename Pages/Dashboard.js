//Pages/Dashboard.js
import React, { useState, useEffect } from "react";
import { Task, CalendarEvent, UserSettings } from "@/entities/all";
import { format, startOfDay, endOfDay, addDays } from "date-fns";
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Zap,
  Heart,
  Target
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
//import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

import TodaySchedule from "../components/dashboard/TodaySchedule";
import QuickStats from "../components/dashboard/QuickStats";
import UpcomingTasks from "../components/dashboard/UpcomingTasks";
import MindfulnessBanner from "../components/dashboard/MindfulnessBanner";

export default function Dashboard() {
  const [todayEvents, setTodayEvents] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userSettings, setUserSettings] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const today = new Date();
      const startOfToday = startOfDay(today);
      const endOfToday = endOfDay(today);

      // Load today's events
      const events = await CalendarEvent.list('-start_time');
      const todaysEvents = events.filter(event => {
        const eventDate = new Date(event.start_time);
        return eventDate >= startOfToday && eventDate <= endOfToday;
      });

      // Load pending tasks
      const tasks = await Task.filter({ status: 'pending' }, '-created_date', 10);

      // Load user settings
      const settings = await UserSettings.list();
      const userSetting = settings.length > 0 ? settings[0] : null;

      setTodayEvents(todaysEvents);
      setPendingTasks(tasks);
      setUserSettings(userSetting);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
  };

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getUpcomingEvent = () => {
    const now = new Date();
    return todayEvents.find(event => new Date(event.start_time) > now);
  };

  const upcomingEvent = getUpcomingEvent();

  return (
    <div className="min-h-screen p-4 md:p-8" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {getTimeGreeting()}! ✨
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Let's make today mindful and productive. Here's your personalized overview.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to={createPageUrl("Tasks")}>
            <Button className="zen-glass zen-shadow rounded-2xl px-6 py-3 text-white border-white/20 hover:bg-white/20 transition-all duration-300">
              <Plus className="w-5 h-5 mr-2" />
              Add New Task
            </Button>
          </Link>
          <Link to={createPageUrl("Calendar")}>
            <Button variant="outline" className="zen-glass zen-shadow rounded-2xl px-6 py-3 text-white border-white/30 hover:bg-white/10 transition-all duration-300">
              <Calendar className="w-5 h-5 mr-2" />
              View Calendar
            </Button>
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Today's Schedule */}
          <div className="lg:col-span-2 space-y-6">
            <TodaySchedule 
              events={todayEvents}
              isLoading={isLoading}
              upcomingEvent={upcomingEvent}
            />
            
            <UpcomingTasks 
              tasks={pendingTasks}
              isLoading={isLoading}
            />
          </div>

          {/* Right Column - Stats & Mindfulness */}
          <div className="space-y-6">
            <QuickStats 
              todayEvents={todayEvents}
              pendingTasks={pendingTasks}
              isLoading={isLoading}
            />
            
            <MindfulnessBanner userSettings={userSettings} />
          </div>
        </div>
      </div>
    </div>
  );
}