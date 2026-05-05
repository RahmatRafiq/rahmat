"use client";
import {
  useScroll,
  useTransform,
  m,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-[1600px] mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative pl-12 md:pl-24 py-8 md:py-12"
          >
            {/* Timeline Dot */}
            <div className="absolute left-7 md:left-7 top-1/2 -translate-y-1/2 z-40">
                <div className="h-4 w-4 rounded-full bg-background border-2 border-primary/50 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                </div>
            </div>

            <div className="relative w-full">
              {item.content}
            </div>
          </div>
        ))}

        {/* The Line */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-9 left-9 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <m.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-indigo-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
