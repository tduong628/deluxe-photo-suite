
import React from 'react';
import DeluxeWordmark from './DeluxeWordmark';

/**
 * One-shot splash screen (spec §4a, §5b), shown once per app boot before
 * Home mounts. CSS-only. Reduced-motion users never mount this component at
 * all — App.tsx gates `showSplash` on `prefers-reduced-motion` up front —
 * so there is no partially-animated frame to guard against here.
 */
const Splash: React.FC = () => {
    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: 'var(--color-bg)' }}
        >
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: '60vw',
                    height: '60vw',
                    maxWidth: '480px',
                    maxHeight: '480px',
                    background: 'radial-gradient(circle, var(--color-accent-tint) 0%, transparent 70%)',
                    filter: 'blur(48px)',
                    animation: 'splash-glow 900ms ease-out forwards',
                }}
            />
            <div style={{ animation: 'splash-mark 600ms var(--ease-standard) forwards' }}>
                <DeluxeWordmark variant="splash" />
            </div>
        </div>
    );
};

export default Splash;
