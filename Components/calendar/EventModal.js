import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarEvent } from "@/entities/all";
import { Save, X } from "lucide-react";

const eventTypes = [
  { value: "task", label: "Task" },
  { value: "meal", label: "Meal" },
  { value: "sleep", label: "Sleep" },
  { value: "break", label: "Break" },
  { value: "routine", label: "Routine" },
  { value: "external", label: "External" }
];

const priorities = [
  { value: "high", label: "High Priority" },
  { value: "medium", label: "Medium Priority" },
  { value: "low", label: "Low Priority" }
];

const movabilityOptions = [
  { value: "fixed", label: "Fixed Time" },
  { value: "flexible", label: "Flexible" },
  { value: "skippable", label: "Skippable" }
];

export default function EventModal({ event, onClose, onSave, availableTasks }) {
  const [formData, setFormData] = useState(event || {
    title: "",
    start_time: "",
    end_time: "",
    event_type: "external",
    priority: "medium",
    movability: "flexible",
    task_id: "",
    color: "#667eea"
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (event) {
        await CalendarEvent.update(event.id, formData);
      } else {
        await CalendarEvent.create(formData);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error("Error saving event:", error);
    }
    setIsLoading(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTaskSelect = (taskId) => {
    const selectedTask = availableTasks.find(t => t.id === taskId);
    if (selectedTask) {
      handleChange('task_id', taskId);
      handleChange('title', selectedTask.title);
      handleChange('event_type', 'task');
      handleChange('priority', selectedTask.priority);
      handleChange('movability', selectedTask.movability);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="zen-glass zen-shadow rounded-3xl border-white/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">
            {event ? "Edit Event" : "Create New Event"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!event && availableTasks.length > 0 && (
            <div className="space-y-2">
              <Label className="text-white/90">Link to Task (Optional)</Label>
              <Select onValueChange={handleTaskSelect}>
                <SelectTrigger className="zen-glass border-white/20 text-white">
                  <SelectValue placeholder="Select a task..." />
                </SelectTrigger>
                <SelectContent>
                  {availableTasks.map(task => (
                    <SelectItem key={task.id} value={task.id}>
                      {task.title} ({task.duration_minutes}min)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title" className="text-white/90">Event Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="What's happening?"
              className="zen-glass border-white/20 text-white placeholder:text-white/50"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_time" className="text-white/90">Start Time</Label>
              <Input
                id="start_time"
                type="datetime-local"
                value={formData.start_time}
                onChange={(e) => handleChange('start_time', e.target.value)}
                className="zen-glass border-white/20 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_time" className="text-white/90">End Time</Label>
              <Input
                id="end_time"
                type="datetime-local"
                value={formData.end_time}
                onChange={(e) => handleChange('end_time', e.target.value)}
                className="zen-glass border-white/20 text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white/90">Event Type</Label>
              <Select
                value={formData.event_type}
                onValueChange={(value) => handleChange('event_type', value)}
              >
                <SelectTrigger className="zen-glass border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white/90">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleChange('priority', value)}
              >
                <SelectTrigger className="zen-glass border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map(priority => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white/90">Flexibility</Label>
            <Select
              value={formData.movability}
              onValueChange={(value) => handleChange('movability', value)}
            >
              <SelectTrigger className="zen-glass border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {movabilityOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="zen-glass border-white/30 text-white hover:bg-white/10"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="zen-gradient text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Saving..." : "Save Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}