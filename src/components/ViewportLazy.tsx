'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ViewportLazyProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    threshold?: number;
    rootMargin?: string;
}

/**
 * Defer hydration/rendering of heavy sections until they are close to the viewport.
 * This significantly helps in reducing Total Blocking Time (TBT).
 */
export default function ViewportLazy({
    children,
    fallback,
    threshold = 0.05,
    rootMargin = '200px'
}: ViewportLazyProps) {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold, rootMargin }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    return (
        <div ref={containerRef} className="w-full min-h-[100px]">
            {isVisible ? children : fallback}
        </div>
    );
}