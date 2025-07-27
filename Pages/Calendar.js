import React, { useState, useEffect } from "react";
import { CalendarEvent, Task, UserSettings } from "@/entities/all";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addDays, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import WeekView from "../components/calendar/WeekView";
import DayView from "../components/calendar/DayView";
import EventModal from "../components/calendar/EventModal";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState('week'); // 'week' or 'day'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCalendarData();
  }, [currentDate]);

  const loadCalendarData = async () => {
    setIsLoading(true);
    try {
      const [eventsData, tasksData] = await Promise.all([
        CalendarEvent.list('-start_time'),
        Task.list('-created_date')
      ]);
      
      setEvents(eventsData);
      setTasks(tasksData);
    } catch (error) {
      console.error("Error loading calendar data:", error);
    }
    setIsLoading(false);
  };

  const navigateDate = (direction) => {
    const days = view === 'week' ? 7 : 1;
    setCurrentDate(prev => addDays(prev, direction * days));
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setShowEventModal(true);
  };

  const getWeekDays = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  };

  const getEventsForDate = (date) => {
    return events.filter(event => 
      isSameDay(new Date(event.start_time), date)
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-8" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Calendar ✨
            </h1>
            <p className="text-xl text-white/80">
              Visualize and manage your scheduled time blocks
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setView(view === 'week' ? 'day' : 'week')}
              className="zen-glass border-white/30 text-white hover:bg-white/10"
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              {view === 'week' ? 'Day View' : 'Week View'}
            </Button>
            <Button
              onClick={handleCreateEvent}
              className="zen-gradient text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <Card className="zen-glass zen-shadow rounded-3xl border-white/20 mb-8">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => navigateDate(-1)}
                className="text-white hover:bg-white/10"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white">
                  {view === 'week' 
                    ? `Week of ${format(startOfWeek(currentDate, { weekStartsOn: 1 }), 'MMM d, yyyy')}`
                    : format(currentDate, 'EEEE, MMMM d, yyyy')
                  }
                </h2>
              </div>
              
              <Button
                variant="ghost"
                onClick={() => navigateDate(1)}
                className="text-white hover:bg-white/10"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Calendar View */}
        {view === 'week' ? (
          <WeekView
            weekDays={getWeekDays()}
            events={events}
            onEventClick={handleEventClick}
            isLoading={isLoading}
          />
        ) : (
          <DayView
            currentDate={currentDate}
            events={getEventsForDate(currentDate)}
            onEventClick={handleEventClick}
            isLoading={isLoading}
          />
        )}

        {/* Event Modal */}
        {showEventModal && (
          <EventModal
            event={selectedEvent}
            onClose={() => setShowEventModal(false)}
            onSave={loadCalendarData}
            availableTasks={tasks.filter(t => t.status === 'pending')}
          />
        )}
      </div>
    </div>
  );
}
