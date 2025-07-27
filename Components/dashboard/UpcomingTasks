import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Clock, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  low: "bg-green-100 text-green-800 border-green-200"
};

const categoryColors = {
  work: "bg-blue-100 text-blue-800 border-blue-200",
  personal: "bg-purple-100 text-purple-800 border-purple-200",
  health: "bg-green-100 text-green-800 border-green-200",
  social: "bg-pink-100 text-pink-800 border-pink-200", 
  learning: "bg-indigo-100 text-indigo-800 border-indigo-200",
  errands: "bg-orange-100 text-orange-800 border-orange-200"
};

export default function UpcomingTasks({ tasks, isLoading }) {
  if (isLoading) {
    return (
      <Card className="zen-glass zen-shadow rounded-3xl border-white/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-white flex items-center gap-2">
            <CheckSquare className="w-6 h-6" />
            Upcoming Tasks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="p-4 rounded-2xl zen-glass border border-white/10">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2 mb-3" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
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
          <CheckSquare className="w-6 h-6" />
          Upcoming Tasks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            <CheckSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No pending tasks</p>
            <p className="text-sm mt-2">You're all caught up! 🎉</p>
          </div>
        ) : (
          tasks.slice(0, 5).map((task) => (
            <div key={task.id} className="p-4 rounded-2xl zen-glass border border-white/10 hover:bg-white/5 transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-white text-sm">{task.title}</h3>
                {task.deadline && (
                  <div className="flex items-center gap-1 text-xs text-white/60">
                    <Clock className="w-3 h-3" />
                    {format(new Date(task.deadline), 'MMM d')}
                  </div>
                )}
              </div>
              
              {task.description && (
                <p className="text-white/70 text-sm mb-3 line-clamp-2">{task.description}</p>
              )}
              
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant="secondary"
                  className={`${priorityColors[task.priority]} border text-xs`}
                >
                  {task.priority} priority
                </Badge>
                <Badge 
                  variant="secondary"
                  className={`${categoryColors[task.category]} border text-xs`}
                >
                  {task.category}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-white/60">
                  <Clock className="w-3 h-3" />
                  {task.duration_minutes}min
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
