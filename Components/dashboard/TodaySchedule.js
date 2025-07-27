import React from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const eventTypeColors = {
  task: "bg-blue-100 text-blue-800 border-blue-200",
  meal: "bg-green-100 text-green-800 border-green-200",
  sleep: "bg-purple-100 text-purple-800 border-purple-200",
  break: "bg-orange-100 text-orange-800 border-orange-200",
  routine: "bg-pink-100 text-pink-800 border-pink-200",
  external: "bg-gray-100 text-gray-800 border-gray-200"
};

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200"
};

export default function TodaySchedule({ events, isLoading, upcomingEvent }) {
  if (isLoading) {
    return (
      <Card className="zen-glass zen-shadow rounded-3xl border-white/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="w-16 h-16 rounded-2xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="zen-glass zen-shadow rounded-3xl border-white/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          Today's Schedule
        </CardTitle>
        {upcomingEvent && (
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Zap className="w-4 h-4" />
            Next: {upcomingEvent.title} at {format(new Date(upcomingEvent.start_time), 'h:mm a')}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {events.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No events scheduled for today</p>
            <p className="text-sm mt-2">Time to add some structure to your day!</p>
          </div>
        ) : (
          events.map((event) => (
            <div key={event.id} className="flex items-center gap-4 p-4 rounded-2xl zen-glass border border-white/10">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl zen-gradient flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs text-white/60 mt-2 text-center">
                  {format(new Date(event.start_time), 'h:mm a')}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-2">{event.title}</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant="secondary"
                    className={`${eventTypeColors[event.event_type]} border text-xs`}
                  >
                    {event.event_type}
                  </Badge>
                  <Badge 
                    variant="secondary"
                    className={`${priorityColors[event.priority]} border text-xs`}
                  >
                    {event.priority} priority
                  </Badge>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}