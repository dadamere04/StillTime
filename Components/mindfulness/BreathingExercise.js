import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wind, Play, Pause, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const breathingPatterns = [
  {
    name: "4-7-8 Relaxing Breath",
    description: "Inhale for 4, hold for 7, exhale for 8. Great for reducing anxiety.",
    inhale: 4,
    hold: 7,
    exhale: 8,
    cycles: 4
  },
  {
    name: "Box Breathing",
    description: "Equal counts for inhale, hold, exhale, hold. Perfect for focus.",
    inhale: 4,
    hold: 4,
    exhale: 4,
    holdAfterExhale: 4,
    cycles: 6
  },
  {
    name: "Energizing Breath",
    description: "Quick energizing pattern to boost alertness.",
    inhale: 3,
    hold: 2,
    exhale: 3,
    cycles: 8
  }
];

export default function BreathingExercise() {
  const [selectedPattern, setSelectedPattern] = useState(breathingPatterns[0]);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('ready'); // ready, inhale, hold, exhale, holdAfterExhale
  const [currentCycle, setCurrentCycle] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    let interval = null;
    
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (isActive && timeRemaining === 0) {
      // Move to next phase
      moveToNextPhase();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining, currentPhase, currentCycle]);

  const moveToNextPhase = () => {
    switch (currentPhase) {
      case 'inhale':
        setCurrentPhase('hold');
        setTimeRemaining(selectedPattern.hold);
        break;
      case 'hold':
        setCurrentPhase('exhale');
        setTimeRemaining(selectedPattern.exhale);
        break;
      case 'exhale':
        if (selectedPattern.holdAfterExhale) {
          setCurrentPhase('holdAfterExhale');
          setTimeRemaining(selectedPattern.holdAfterExhale);
        } else {
          completeCycle();
        }
        break;
      case 'holdAfterExhale':
        completeCycle();
        break;
    }
  };

  const completeCycle = () => {
    const nextCycle = currentCycle + 1;
    if (nextCycle < selectedPattern.cycles) {
      setCurrentCycle(nextCycle);
      setCurrentPhase('inhale');
      setTimeRemaining(selectedPattern.inhale);
    } else {
      // Exercise complete
      setIsActive(false);
      setCurrentPhase('complete');
      setCurrentCycle(0);
    }
  };

  const startExercise = () => {
    setIsActive(true);
    setCurrentPhase('inhale');
    setCurrentCycle(0);
    setTimeRemaining(selectedPattern.inhale);
  };

  const pauseExercise = () => {
    setIsActive(false);
  };

  const resetExercise = () => {
    setIsActive(false);
    setCurrentPhase('ready');
    setCurrentCycle(0);
    setTimeRemaining(0);
  };

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'ready': return 'Ready to begin';
      case 'inhale': return 'Breathe in...';
      case 'hold': return 'Hold...';
      case 'exhale': return 'Breathe out...';
      case 'holdAfterExhale': return 'Hold...';
      case 'complete': return 'Complete! Well done.';
      default: return '';
    }
  };

  const getCircleSize = () => {
    switch (currentPhase) {
      case 'inhale': return 200;
      case 'hold': case 'holdAfterExhale': return 200;
      case 'exhale': return 120;
      default: return 160;
    }
  };

  return (
    <div className="space-y-6">
      {/* Pattern Selection */}
      <Card className="zen-glass zen-shadow rounded-3xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Wind className="w-6 h-6" />
            Choose Your Breathing Pattern
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {breathingPatterns.map((pattern, index) => (
            <div
              key={pattern.name}
              className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 ${
                selectedPattern.name === pattern.name
                  ? 'zen-gradient text-white'
                  : 'zen-glass border border-white/20 hover:bg-white/5'
              }`}
              onClick={() => {
                setSelectedPattern(pattern);
                resetExercise();
              }}
            >
              <h3 className="font-semibold mb-2">{pattern.name}</h3>
              <p className="text-sm opacity-90">{pattern.description}</p>
              <div className="text-xs mt-2 opacity-75">
                {pattern.cycles} cycles • {pattern.inhale}s inhale • {pattern.hold}s hold • {pattern.exhale}s exhale
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Breathing Exercise */}
      <Card className="zen-glass zen-shadow rounded-3xl border-white/20">
        <CardContent className="p-8">
          <div className="text-center space-y-8">
            {/* Breathing Circle */}
            <div className="flex justify-center">
              <motion.div
                className="rounded-full zen-gradient flex items-center justify-center"
                animate={{
                  width: getCircleSize(),
                  height: getCircleSize(),
                }}
                transition={{
                  duration: timeRemaining > 0 ? timeRemaining : 1,
                  ease: "easeInOut"
                }}
              >
                <Wind className="w-12 h-12 text-white" />
              </motion.div>
            </div>

            {/* Phase Text */}
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white">
                {getPhaseText()}
              </h2>
              {timeRemaining > 0 && (
                <div className="text-6xl font-bold text-white">
                  {timeRemaining}
                </div>
              )}
              {currentPhase !== 'ready' && currentPhase !== 'complete' && (
                <p className="text-white/70">
                  Cycle {currentCycle + 1} of {selectedPattern.cycles}
                </p>
              )}
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              {!isActive && currentPhase === 'ready' && (
                <Button
                  onClick={startExercise}
                  className="zen-gradient text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Exercise
                </Button>
              )}
              
              {isActive && (
                <Button
                  onClick={pauseExercise}
                  variant="outline"
                  className="zen-glass border-white/30 text-white hover:bg-white/10 px-8 py-3"
                >
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </Button>
              )}
              
              {!isActive && currentPhase !== 'ready' && (
                <Button
                  onClick={startExercise}
                  className="zen-gradient text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Resume
                </Button>
              )}
              
              {currentPhase !== 'ready' && (
                <Button
                  onClick={resetExercise}
                  variant="outline"
                  className="zen-glass border-white/30 text-white hover:bg-white/10 px-8 py-3"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset
                </Button>
              )}
            </div>

            {currentPhase === 'complete' && (
              <div className="text-center">
                <p className="text-white/80 mb-4">
                  Excellent work! Take a moment to notice how you feel.
                </p>
                <Button
                  onClick={resetExercise}
                  className="zen-gradient text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Try Another Session
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}