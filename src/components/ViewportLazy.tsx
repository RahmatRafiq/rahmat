'use client';

import React from 'react';

interface ViewportLazyProps {
    children: React.ReactNode;
    /**
     * Estimated natural height, used only as the intrinsic size hint while the
     * section is offscreen. The browser reserves this much space so there is no
     * layout shift, then renders the real (possibly different) height once the
     * section scrolls near the viewport. An approximate value is fine.
     */
    minHeight?: string;
    /** @deprecated kept for API compatibility; no longer used. */
    threshold?: number;
    /** @deprecated kept for API compatibility; no longer used. */
    rootMargin?: string;
}

/**
 * Defer rendering of offscreen sections to cut Total Blocking Time, without
 * causing layout shift.
 *
 * Uses the browser-native `content-visibility: auto` + `contain-intrinsic-size`
 * pair: the section's subtree is skipped while it is far from the viewport
 * (TBT win), while `contain-intrinsic-size` reserves `minHeight` so the
 * scrollbar and the elements below stay put (CLS stays ~0). When the section
 * nears the viewport the browser renders it at its real height. Because the
 * markup is always present (just not painted), it is still server-rendered and
 * crawlable.
 */
export default function ViewportLazy({ children, minHeight = '600px' }: ViewportLazyProps) {
    return (
        <div
            className="w-full"
            style={{
                contentVisibility: 'auto',
                containIntrinsicSize: `auto ${minHeight}`,
            }}
        >
            {children}
        </div>
    );
}
