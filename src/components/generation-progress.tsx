'use client';

import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

export function GenerationProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full space-y-2 pt-2">
      <p className="text-sm text-muted-foreground animate-pulse">
        Analyzing repository and generating README...
      </p>
      <Progress value={progress} className="w-full" />
    </div>
  );
}
