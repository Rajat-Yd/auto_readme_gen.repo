'use client';

import { useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import { GenerationProgress } from '@/components/generation-progress';
import { Celebration } from '@/components/celebration';

interface FormStatusProps {
  success: boolean;
}

export function FormStatus({ success }: FormStatusProps) {
  const { pending } = useFormStatus();
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (success && !pending) {
      setShowCelebration(true);
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 5000); // Celebrate for 5 seconds
      return () => clearTimeout(timer);
    }
    setShowCelebration(false);
  }, [success, pending]);
  
  return (
    <>
      {pending && <GenerationProgress />}
      {showCelebration && <Celebration />}
    </>
  );
}
