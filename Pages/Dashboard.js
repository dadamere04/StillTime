//Pages/Dashboard.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Task, CalendarEvent, UserSettings } from "@/entities/all";
import { format, startOfDay, endOfDay, addDays } from "date-fns";
import { useNavigation } from "@react-navigation/native";

import TodaySchedule from "../components/dashboard/TodaySchedule";
import QuickStats from "../components/dashboard/QuickStats";
import UpcomingTasks from "../components/dashboard/UpcomingTasks";
import MindfulnessBanner from "../components/dashboard/MindfulnessBanner";

export default function Dashboard() {
  const navigation = useNavigation();
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
    <View style={[styles.container, {backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}]}>
      <View style={styles.contentContainer}>
        {/* Welcome Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {getTimeGreeting()}! ✨
          </Text>
          <Text style={styles.subHeaderText}>
            Let's make today mindful and productive. Here's your personalized overview.
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity 
            onPress={() => navigation.navigate("Tasks")}
            style={styles.quickActionButton}
          >
            <Feather name="plus" size={24} color="white" style={styles.quickActionButtonIcon} />
            <Text style={styles.quickActionButtonText}>Add New Task</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => navigation.navigate("Calendar")}
            style={styles.quickActionButtonOutline}
          >
            <Feather name="calendar" size={24} color="white" style={styles.quickActionButtonIcon} />
            <Text style={styles.quickActionButtonText}>View Calendar</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content Grid */}
        <View style={styles.mainContentContainer}>
          {/* Left Column - Today's Schedule */}
          <View style={styles.leftColumnContainer}>
            <TodaySchedule 
              events={todayEvents}
              isLoading={isLoading}
              upcomingEvent={upcomingEvent}
            />
            
            <UpcomingTasks 
              tasks={pendingTasks}
              isLoading={isLoading}
            />
          </View>

          {/* Right Column - Stats & Mindfulness */}
          <View style={styles.rightColumnContainer}>
            <QuickStats 
              todayEvents={todayEvents}
              pendingTasks={pendingTasks}
              isLoading={isLoading}
            />
            
            <MindfulnessBanner userSettings={userSettings} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    maxWidth: 1280,
    marginHorizontal: 'auto',
    gap: 32,
  },
  headerContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  subHeaderText: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.8)',
    maxWidth: 600,
    textAlign: 'center',
    marginHorizontal: 'auto',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 16,
  },
  quickActionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickActionButtonOutline: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickActionButtonIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  quickActionButtonText: {
    fontSize: 16,
    color: 'white',
  },
  mainContentContainer: {
    flexDirection: 'row',
    gap: 32,
  },
  leftColumnContainer: {
    flex: 2,
  },
  rightColumnContainer: {
    flex: 1,
  },
});