
import React, { useState } from 'react';

interface DeluxeWordmarkProps {
    /** 'header' = compact horizontal lockup (~28px tall). 'splash' = large centered lockup (~220px wide). */
    variant?: 'header' | 'splash';
}

/**
 * Deluxe wordmark slot. Spec §4a: John supplies the real cream/copper
 * "DELUXE ✕ NAIL SPA" wordmark at public/logo.png. Until that file lands,
 * this renders a text-based CSS lockup instead of the file. Swapping in the
 * real file later is a one-line change — just drop `logo.png` into
 * `public/` and this component starts rendering it automatically (the
 * onError handler flips back to the text lockup if the image is ever
 * missing or fails to load again).
 */
const DeluxeWordmark: React.FC<DeluxeWordmarkProps> = ({ variant = 'header' }) => {
    const [imageFailed, setImageFailed] = useState(false);

    if (!imageFailed) {
        return (
            <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="Deluxe Nail Spa"
                onError={() => setImageFailed(true)}
                className={variant === 'header' ? 'h-7 w-auto object-contain' : 'w-auto object-contain'}
                style={variant === 'splash' ? { height: 'auto', width: 'min(220px, 60vw)' } : undefined}
            />
        );
    }

    const isHeader = variant === 'header';
    return (
        <div
            className="flex flex-col items-center leading-none select-none"
            style={{ alignItems: isHeader ? 'flex-start' : 'center' }}
        >
            <span
                className="font-display"
                style={{
                    fontSize: isHeader ? '1.05rem' : 'clamp(2rem, 8vw, 2.75rem)',
                    fontWeight: 700,
                    letterSpacing: '0.01em',
                    color: 'var(--color-ink)',
                    lineHeight: 1,
                }}
            >
                DEL<span style={{ color: 'var(--color-accent)' }}>U</span>XE
            </span>
            <span
                className="section-label"
                style={{
                    marginTop: isHeader ? '2px' : '10px',
                    fontSize: isHeader ? '0.5rem' : '0.7rem',
                    letterSpacing: '0.22em',
                }}
            >
                Nail Spa
            </span>
            <span
                style={{
                    marginTop: isHeader ? '3px' : '10px',
                    width: isHeader ? '18px' : '48px',
                    height: '1.5px',
                    background: 'var(--color-accent)',
                    opacity: 0.7,
                }}
            />
        </div>
    );
};

export default DeluxeWordmark;
