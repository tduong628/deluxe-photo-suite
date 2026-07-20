
import React, { useEffect, useState } from 'react';
import { LanguagePack, View } from '../types';
import { fetchGallery } from '../services/galleryService';
import { fetchStaffUploads } from '../services/staffInboxService';
import Icon from './icons';

interface MainMenuProps {
    langPack: LanguagePack;
    onNavigate: (view: View) => void;
}

const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
};

const todayLabel = (): string =>
    new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

const MainMenu: React.FC<MainMenuProps> = ({ langPack, onNavigate }) => {
    const [previewThumb, setPreviewThumb] = useState<string | null>(null);
    const [galleryCount, setGalleryCount] = useState<number | null>(null);
    const [inboxCount, setInboxCount] = useState<number | null>(null);

    useEffect(() => {
        let cancelled = false;
        fetchGallery().then(items => {
            if (cancelled) return;
            setGalleryCount(items.length);
            setPreviewThumb(items[0]?.thumbnailUrl ?? null);
        });
        fetchStaffUploads().then(uploads => {
            if (cancelled) return;
            const salonUploads = uploads.filter(u => !(u.salon || '').includes('Zen'));
            setInboxCount(salonUploads.filter(u => u.status === 'PENDING').length);
        });
        return () => { cancelled = true; };
    }, []);

    return (
        <div className="pb-10 mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '480px' }}>

            {/* Greeting strip */}
            <div className="animate-stagger-1 px-1">
                <p className="section-label mb-1.5">{getGreeting().toUpperCase()}</p>
                <h1 className="font-display" style={{ fontSize: 'var(--text-h1)', color: 'var(--color-ink)', lineHeight: 1.1 }}>
                    Deluxe Nail Spa
                </h1>
                <p style={{ marginTop: '0.35rem', color: 'var(--color-ink-soft)', fontSize: 'var(--text-caption)', fontWeight: 500 }}>
                    {todayLabel()}
                </p>
            </div>

            {/* Primary card — Photo Branding (the star) */}
            <button
                onClick={() => onNavigate(View.Branding)}
                className="animate-stagger-2 ios-btn-press luxury-card text-left overflow-hidden relative"
                style={{ width: '100%', minHeight: '168px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', cursor: 'pointer' }}
                aria-label={langPack.cat5Title}
            >
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(90deg, var(--color-accent-tint) 0%, var(--color-surface) 42%)', borderRadius: 'inherit' }}
                />
                <div className="relative z-10 flex-shrink-0 flex items-center justify-center overflow-hidden"
                    style={{ width: '108px', height: '108px', borderRadius: '1rem', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
                    {previewThumb ? (
                        <img src={previewThumb} alt="" className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                        <span style={{ color: 'var(--color-accent)' }}><Icon name="branding" className="w-9 h-9" /></span>
                    )}
                </div>
                <div className="relative z-10 flex-1 min-w-0">
                    <p className="section-label" style={{ marginBottom: '0.25rem' }}>Tool 01</p>
                    <h2 className="font-display" style={{ fontSize: 'var(--text-h2)', fontWeight: 600, color: 'var(--color-ink)', lineHeight: 1.15 }}>
                        {langPack.cat5Title}
                    </h2>
                    <p style={{ marginTop: '0.25rem', color: 'var(--color-ink-soft)', fontSize: 'var(--text-caption)' }}>
                        {langPack.cat5Desc}
                    </p>
                </div>
                <div className="relative z-10 flex-shrink-0" style={{
                    width: '2.5rem', height: '2.5rem', background: 'var(--color-accent)', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </div>
            </button>

            {/* Social Post card */}
            <button
                onClick={() => onNavigate(View.Social)}
                className="animate-stagger-2 ios-btn-press luxury-card text-left overflow-hidden relative"
                style={{ width: '100%', minHeight: '112px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', cursor: 'pointer' }}
                aria-label={langPack.cat6Title}
            >
                <div className="flex-shrink-0 flex items-center justify-center"
                    style={{ width: '3.25rem', height: '3.25rem', background: 'var(--color-accent-tint)', borderRadius: '1rem' }}>
                    <span style={{ color: 'var(--color-accent)' }}><Icon name="social" className="w-6 h-6" /></span>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="section-label" style={{ marginBottom: '0.25rem' }}>Tool 02</p>
                    <h2 className="font-display" style={{ fontSize: 'var(--text-h2)', fontWeight: 600, color: 'var(--color-ink)', lineHeight: 1.15 }}>
                        {langPack.cat6Title}
                    </h2>
                    <p style={{ marginTop: '0.25rem', color: 'var(--color-ink-soft)', fontSize: 'var(--text-caption)' }}>
                        {langPack.cat6Desc}
                    </p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-soft)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M9 5l7 7-7 7"/>
                </svg>
            </button>

            {/* Two-up row: Inbox + Gallery */}
            <div className="animate-stagger-3 grid grid-cols-2 gap-3">
                <button
                    onClick={() => onNavigate(View.Inbox)}
                    className="ios-btn-press luxury-card text-left relative"
                    style={{ padding: '1.25rem', aspectRatio: '1/1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                    aria-label="Staff Inbox"
                >
                    <div className="flex items-start justify-between">
                        <span style={{ color: 'var(--color-accent)' }}><Icon name="inbox" className="w-6 h-6" /></span>
                        {!!inboxCount && (
                            <span
                                className="flex items-center justify-center"
                                style={{ minWidth: '20px', height: '20px', padding: '0 6px', borderRadius: '9999px', background: 'var(--color-accent)', color: '#fff', fontSize: '0.65rem', fontWeight: 700 }}
                            >
                                {inboxCount}
                            </span>
                        )}
                    </div>
                    <h3 style={{ fontSize: 'var(--text-h3)', fontWeight: 600, color: 'var(--color-ink)' }}>Staff Inbox</h3>
                </button>

                <button
                    onClick={() => onNavigate(View.Gallery)}
                    className="ios-btn-press luxury-card text-left relative"
                    style={{ padding: '1.25rem', aspectRatio: '1/1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                    aria-label="Gallery"
                >
                    <div className="flex items-start justify-between">
                        <span style={{ color: 'var(--color-accent)' }}><Icon name="gallery" className="w-6 h-6" /></span>
                        {!!galleryCount && (
                            <span style={{ color: 'var(--color-ink-soft)', fontSize: 'var(--text-caption)', fontWeight: 600 }}>
                                {galleryCount}
                            </span>
                        )}
                    </div>
                    <h3 style={{ fontSize: 'var(--text-h3)', fontWeight: 600, color: 'var(--color-ink)' }}>Gallery</h3>
                </button>
            </div>

            {/* Footer tagline */}
            <p className="animate-stagger-3 text-center" style={{ color: 'var(--color-ink-soft)', fontSize: 'var(--text-label)', letterSpacing: '0.08em', fontWeight: 600, textTransform: 'uppercase' }}>
                Powered by Google Gemini AI
            </p>

        </div>
    );
};

export default MainMenu;
