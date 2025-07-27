import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Scissors,
  AlertTriangle
} from "lucide-react";
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

const statusColors = {
  pending: "bg-gray-100 text-gray-800 border-gray-200",
  scheduled: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200"
};

export default function TaskList({ tasks, isLoading, onEdit, onDelete }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(5).fill(0).map((_, i) => (
          <Card key={i} className="zen-glass zen-shadow rounded-3xl border-white/20">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card className="zen-glass zen-shadow rounded-3xl border-white/20">
        <CardContent className="text-center py-12">
          <Clock className="w-16 h-16 mx-auto mb-4 text-white/50" />
          <h3 className="text-xl font-semibold text-white mb-2">No Tasks Found</h3>
          <p className="text-white/70">
            Start by creating your first task to begin organizing your schedule.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            layout
          >
            <Card className="zen-glass zen-shadow rounded-3xl border-white/20 hover:border-white/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-white/70 text-sm mb-3 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge 
                        variant="secondary"
                        className={`${statusColors[task.status]} border text-xs`}
                      >
                        {task.status}
                      </Badge>
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
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-white/60">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {task.duration_minutes} min
                      </div>
                      
                      {task.commute_minutes > 0 && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {task.commute_minutes} min commute
                        </div>
                      )}
                      
                      {task.can_split && (
                        <div className="flex items-center gap-1">
                          <Scissors className="w-4 h-4" />
                          Up to {task.max_sessions} sessions
                        </div>
                      )}
                      
                      {task.deadline && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Due {format(new Date(task.deadline), 'MMM d, yyyy')}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(task)}
                      className="zen-glass border-white/30 text-white hover:bg-white/10"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(task.id)}
                      className="zen-glass border-red-300/30 text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {task.movability === 'fixed' && (
                  <div className="flex items-center gap-2 text-orange-300 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    Fixed timing - cannot be rescheduled
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}