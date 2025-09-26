'use client';

import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

export function Celebration() {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (windowSize.width === 0) return null;

    return <Confetti width={windowSize.width} height={windowSize.height} recycle={false} />;
}
