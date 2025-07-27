import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Clock, Calendar } from "lucide-react";
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

export default function DayView({ currentDate, events, onEventClick, isLoading }) {
  const getEventPosition = (event) => {
    const startTime = new Date(event.start_time);
    const endTime = new Date(event.end_time);
    const startHour = startTime.getHours() + startTime.getMinutes() / 60;
    const duration = (endTime - startTime) / (1000 * 60 * 60);
    
    return {
      top: `${(startHour / 24) * 100}%`,
      height: `${(duration / 24) * 100}%`
    };
  };

  if (isLoading) {
    return (
      <Card className="zen-glass zen-shadow rounded-3xl border-white/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              {hours.slice(6, 23).map(hour => (
                <Skeleton key={hour} className="h-16 w-full" />
              ))}
            </div>
            <div className="space-y-4">
              {Array(8).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Day View */}
      <div className="lg:col-span-2">
        <Card className="zen-glass zen-shadow rounded-3xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              {format(currentDate, 'EEEE, MMMM d')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-2">
              {/* Time Column */}
              <div className="border-r border-white/10 p-4">
                {hours.slice(6, 23).map(hour => (
                  <div key={hour} className="h-16 flex items-center text-white/60 text-sm border-b border-white/5">
                    {format(new Date().setHours(hour, 0, 0, 0), 'h a')}
                  </div>
                ))}
              </div>

              {/* Events Column */}
              <div className="relative">
                {hours.slice(6, 23).map(hour => (
                  <div key={hour} className="h-16 border-b border-white/5"></div>
                ))}

                {/* Events */}
                {events.map(event => {
                  const position = getEventPosition(event);
                  return (
                    <div
                      key={event.id}
                      className={`absolute left-2 right-2 ${eventColors[event.event_type]} rounded-lg p-3 cursor-pointer hover:opacity-90 transition-opacity shadow-lg`}
                      style={position}
                      onClick={() => onEventClick(event)}
                    >
                      <div className="text-white font-medium truncate">
                        {event.title}
                      </div>
                      <div className="text-white/80 text-sm">
                        {format(new Date(event.start_time), 'h:mm a')} - {format(new Date(event.end_time), 'h:mm a')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Day Summary */}
      <div>
        <Card className="zen-glass zen-shadow rounded-3xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Day Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-6">
              <div className="text-3xl font-bold text-white mb-2">
                {events.length}
              </div>
              <div className="text-white/70">
                Events Scheduled
              </div>
            </div>

            {events.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-white mb-3">Today's Events</h4>
                {events.map(event => (
                  <div
                    key={event.id}
                    className="p-3 rounded-lg zen-glass border border-white/10 cursor-pointer hover:bg-white/5"
                    onClick={() => onEventClick(event)}
                  >
                    <div className="font-medium text-white text-sm">
                      {event.title}
                    </div>
                    <div className="text-white/60 text-xs mt-1">
                      {format(new Date(event.start_time), 'h:mm a')} - {format(new Date(event.end_time), 'h:mm a')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}