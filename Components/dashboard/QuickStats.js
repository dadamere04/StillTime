import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, Target, Zap, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function QuickStats({ todayEvents, pendingTasks, isLoading }) {
  const completedTasks = todayEvents.filter(e => e.event_type === 'task').length;
  const totalScheduled = todayEvents.length;
  const highPriorityTasks = pendingTasks.filter(t => t.priority === 'high').length;

  const stats = [
    {
      title: "Scheduled Today",
      value: totalScheduled,
      icon: Calendar,
      color: "text-blue-400"
    },
    {
      title: "Tasks Planned",
      value: completedTasks,
      icon: CheckCircle2,
      color: "text-green-400"
    },
    {
      title: "High Priority",
      value: highPriorityTasks,
      icon: Zap,
      color: "text-red-400"
    },
    {
      title: "Pending Tasks",
      value: pendingTasks.length,
      icon: Clock,
      color: "text-orange-400"
    }
  ];

  return (
    <Card className="zen-glass zen-shadow rounded-3xl border-white/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center gap-2">
          <Target className="w-6 h-6" />
          Quick Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <>
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-6 w-8" />
              </div>
            ))}
          </>
        ) : (
          <>
            {stats.map((stat) => (
              <div key={stat.title} className="flex items-center justify-between p-3 rounded-2xl zen-glass border border-white/10">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center`}>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <span className="text-white/80 text-sm">{stat.title}</span>
                </div>
                <span className="text-xl font-bold text-white">{stat.value}</span>
              </div>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
}