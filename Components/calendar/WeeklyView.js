import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { format, isSameHour } from "date-fns";
import { Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const hours = Array.from({ length: 24 }, (_, i) => i);

const eventColors = {
  task: "bg-blue-500/80",
  meal: "bg-green-500/80", 
  sleep: "bg-purple-500/80",
  break: "bg-orange-500/80",
  routine: "bg-pink-500/80",
  external: "bg-gray-500/80"
};

export default function WeekView({ weekDays, events, onEventClick, isLoading }) {
  const getEventsForDay = (day) => {
    return events.filter(event => {
      const eventDate = new Date(event.start_time);
      return eventDate.toDateString() === day.toDateString();
    });
  };

  const getEventPosition = (event) => {
    const startTime = new Date(event.start_time);
    const endTime = new Date(event.end_time);
    const startHour = startTime.getHours() + startTime.getMinutes() / 60;
    const duration = (endTime - startTime) / (1000 * 60 * 60); // hours
    
    return {
      top: `${(startHour / 24) * 100}%`,
      height: `${(duration / 24) * 100}%`
    };
  };

  if (isLoading) {
    return (
      <Card className="zen-glass zen-shadow rounded-3xl border-white/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-8 gap-4">
            <div className="space-y-4">
              {hours.slice(6, 23).map(hour => (
                <Skeleton key={hour} className="h-8 w-12" />
              ))}
            </div>
            {Array(7).fill(0).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-full" />
                {Array(4).fill(0).map((_, j) => (
                  <Skeleton key={j} className="h-16 w-full" />
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="zen-glass zen-shadow rounded-3xl border-white/20 overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-8">
          {/* Time Column */}
          <div className="border-r border-white/10 p-4">
            <div className="h-12"></div> {/* Header spacer */}
            {hours.slice(6, 23).map(hour => (
              <div key={hour} className="h-16 flex items-center text-white/60 text-sm">
                {format(new Date().setHours(hour, 0, 0, 0), 'h a')}
              </div>
            ))}
          </div>

          {/* Days Columns */}
          {weekDays.map((day, index) => (
            <div key={day.toISOString()} className="border-r border-white/10 last:border-r-0">
              {/* Day Header */}
              <div className="h-12 border-b border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white/80 text-sm font-medium">
                    {format(day, 'EEE')}
                  </div>
                  <div className="text-white text-lg font-bold">
                    {format(day, 'd')}
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div className="relative">
                {hours.slice(6, 23).map(hour => (
                  <div key={hour} className="h-16 border-b border-white/5"></div>
                ))}

                {/* Events */}
                {getEventsForDay(day).map(event => {
                  const position = getEventPosition(event);
                  return (
                    <div
                      key={event.id}
                      className={`absolute left-1 right-1 ${eventColors[event.event_type]} rounded-lg p-2 cursor-pointer hover:opacity-90 transition-opacity z-10 shadow-lg`}
                      style={position}
                      onClick={() => onEventClick(event)}
                    >
                      <div className="text-white text-xs font-medium truncate">
                        {event.title}
                      </div>
                      <div className="text-white/80 text-xs">
                        {format(new Date(event.start_time), 'h:mm a')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}