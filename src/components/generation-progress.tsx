'use client';

import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

const messages = [
  'Fetching repository data...',
  'Analyzing dependencies and structure...',
  'Understanding the code...',
  'Generating README content...',
  'Adding some final touches...',
];

export function GenerationProgress() {
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    // Simulate progress for the progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + 5;
      });
    }, 600);

    // Cycle through messages
    const messageInterval = setInterval(() => {
        setCurrentMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
    }, 2000); // Change message every 2 seconds

    return () => {
        clearInterval(progressInterval);
        clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="w-full space-y-2 pt-2">
      <p className="text-sm text-muted-foreground animate-pulse transition-all duration-300">
        {messages[currentMessageIndex]}
      </p>
      <Progress value={progress} className="w-full" />
    </div>
  );
}
