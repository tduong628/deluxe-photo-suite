
import React from 'react';
import { Language } from '../constants';
import { View } from '../types';
import DeluxeWordmark from './DeluxeWordmark';
import Icon from './icons';

interface HeaderProps {
    currentLang: Language;
    onSetLang: (lang: Language) => void;
    onGoHome: () => void;
    currentView: View;
}

const Header: React.FC<HeaderProps> = ({ currentLang, onSetLang, onGoHome, currentView }) => {
    const languages: Language[] = ['EN', 'ES', 'VI'];
    const isHome = currentView === View.MainMenu;

    return (
        <header
            className="glass-panel sticky top-0 z-40"
            style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
            <div className="max-w-2xl mx-auto px-4 sm:px-5 flex justify-between items-center" style={{ height: '60px' }}>
                <div className="flex items-center gap-1 min-w-0">
                    {!isHome && (
                        <button
                            onClick={onGoHome}
                            aria-label="Back to Home"
                            className="ios-btn-press flex items-center justify-center flex-shrink-0"
                            style={{ width: '44px', height: '44px', marginLeft: '-10px', color: 'var(--color-ink)' }}
                        >
                            <Icon name="chevronLeft" className="w-5 h-5" />
                        </button>
                    )}
                    <button onClick={onGoHome} className="ios-btn-press flex items-center min-w-0" aria-label="Go home">
                        <DeluxeWordmark variant="header" />
                    </button>
                </div>

                {/* Language switcher */}
                <div
                    className="flex items-center p-1 gap-0.5 flex-shrink-0"
                    style={{
                        background: 'var(--color-surface-2)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '9999px',
                    }}
                >
                    {languages.map(lang => {
                        const isActive = currentLang === lang;
                        return (
                            <button
                                key={lang}
                                onClick={() => onSetLang(lang)}
                                className="ios-btn-press"
                                style={{
                                    padding: '0.3rem 0.65rem',
                                    borderRadius: '9999px',
                                    fontSize: 'var(--text-label)',
                                    fontWeight: 600,
                                    letterSpacing: '0.05em',
                                    color: isActive ? 'var(--color-accent-dark)' : 'var(--color-ink-soft)',
                                    background: 'transparent',
                                    transition: `color var(--dur-fast) ease`,
                                }}
                            >
                                {lang}
                            </button>
                        );
                    })}
                </div>
            </div>
        </header>
    );
};

export default Header;
