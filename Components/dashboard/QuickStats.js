import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, Target, Zap, Calendar } from "lucide-react";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

export default function QuickStats({ todayEvents = [], pendingTasks = [], isLoading = false }) {
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
      title: "Pending",
      value: pendingTasks.length,
      icon: Clock,
      color: "text-yellow-400"
    }
  ];

  if (isLoading) {
    return (
      <Card className="zen-glass zen-shadow rounded-3xl border-white/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-6 h-6" />
            Quick Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <SkeletonText width="80%" height={14} />
              <SkeletonText width="60%" height={24} />
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
          <Target className="w-6 h-6" />
          Quick Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="space-y-1">
              <div className="flex items-center text-gray-300 text-sm">
                <Icon className={`w-4 h-4 mr-1 ${stat.color}`} />
                {stat.title}
              </div>
              <div className="text-2xl font-bold text-white">
                {stat.value}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}