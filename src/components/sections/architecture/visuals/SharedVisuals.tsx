'use client';

import React from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { Server } from 'lucide-react';
import { cn } from '../../../../lib/utils';

export function SequenceLine({ delay, top, left, right, width, label, color, arrow, dashed = false }: { delay: number; top?: string | number; left?: string | number; right?: string | number; width: string | number; label: string; color: string; arrow: 'left' | 'right'; dashed?: boolean }) {
    const shouldReduce = useReducedMotion();

    return (
        <m.div
            initial={{ width: 0 }}
            animate={{ width }}
            transition={shouldReduce
                ? { duration: 0, delay: 0 }
                : { duration: 0.6, delay }
            }
            className={cn("absolute h-[1.5px]", dashed ? "border-t border-dashed border-current" : "bg-current", color)}
            style={{ top, left, right }}
        >
            <div className={cn("absolute top-1/2 -translate-y-1/2 border-y-[4px] border-y-transparent", arrow === 'right' ? "right-0 border-l-[6px] border-l-current" : "left-0 border-r-[6px] border-r-current")} />
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[7px] md:text-[8px] font-mono font-bold whitespace-nowrap text-foreground/80 uppercase">{label}</span>
        </m.div>
    );
}

export function Table({ title, fields, top, left }: { title: string; fields: string[]; top?: string | number; left?: string | number }) {
    return (
        <div className="absolute glass border border-border rounded-lg overflow-hidden w-24 md:w-32 shadow-xl" style={{ top, left }}>
            <div className="bg-primary/10 px-2 py-1 border-b border-border">
                <span className="text-[8px] font-black font-mono text-indigo-400 uppercase">{title}</span>
            </div>
            <div className="flex flex-col p-1.5 gap-1 bg-background/20">
                {fields.map((f: string) => (
                    <span key={f} className="text-[7px] font-mono text-muted-foreground flex items-center gap-1.5 line-clamp-1">
                        <div className="w-0.5 h-0.5 rounded-full bg-primary/30" /> {f}
                    </span>
                ))}
            </div>
        </div>
    );
}

export function ServiceMini({ name }: { name: string }) {
    return (
        <div className="px-3 py-1.5 glass rounded-lg border border-border flex items-center gap-2 group hover:border-primary/50 transition-all">
            <Server className="w-2.5 h-2.5 text-indigo-400" />
            <span className="text-[8px] font-black tracking-widest uppercase">{name}</span>
        </div>
    );
}
