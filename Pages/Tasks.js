import React, { useState, useEffect } from "react";
import { Task } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import TaskForm from "../components/tasks/TaskForm";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskList from "../components/tasks/TaskList";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ 
    status: "all", 
    priority: "all", 
    category: "all" 
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setIsLoading(true);
    const fetchedTasks = await Task.list('-created_date');
    setTasks(fetchedTasks);
    setIsLoading(false);
  };

  const handleSubmit = async (taskData) => {
    if (editingTask) {
      await Task.update(editingTask.id, taskData);
    } else {
      await Task.create(taskData);
    }
    setShowForm(false);
    setEditingTask(null);
    loadTasks();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = async (taskId) => {
    await Task.delete(taskId);
    loadTasks();
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filters.status === "all" || task.status === filters.status;
    const priorityMatch = filters.priority === "all" || task.priority === filters.priority;
    const categoryMatch = filters.category === "all" || task.category === filters.category;
    return statusMatch && priorityMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen p-4 md:p-8" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Task Management ✨
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Organize your activities with mindful planning and smart scheduling.
          </p>
          
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="zen-gradient rounded-2xl px-8 py-3 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Task
          </Button>
        </div>

        {/* Task Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <TaskForm
                task={editingTask}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingTask(null);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters */}
        <div className="mb-8">
          <TaskFilters 
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>

        {/* Task List */}
        <TaskList 
          tasks={filteredTasks}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}