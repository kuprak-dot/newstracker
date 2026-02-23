// src/components/SourceCard.jsx
import React from 'react';
import { Check, Plus, Rss } from 'lucide-react';

export default function SourceCard({ source, isSubscribed, onToggleSubscribe }) {
    return (
        <div style={styles.card}>
            <div style={styles.left}>
                <div
                    style={{
                        ...styles.logo,
                        backgroundColor: source.color,
                    }}
                >
                    <span style={styles.logoText}>{source.initials}</span>
                </div>
                <div style={styles.info}>
                    <div style={styles.nameRow}>
                        <h3 style={styles.name}>{source.name}</h3>
                        <span
                            style={{
                                ...styles.categoryBadge,
                                backgroundColor: `${source.color}18`,
                                color: source.color,
                            }}
                        >
                            {source.categoryLabel}
                        </span>
                    </div>
                    <p style={styles.description}>{source.description}</p>
                    <div style={styles.stats}>
                        <Rss size={12} color="var(--text-secondary)" />
                        <span style={styles.statsText}>{source.articleCount} haber</span>
                    </div>
                </div>
            </div>

            <button
                style={{
                    ...styles.subscribeBtn,
                    backgroundColor: isSubscribed ? 'rgba(230,57,70,0.08)' : 'var(--accent-red)',
                    color: isSubscribed ? 'var(--accent-red)' : 'white',
                    border: isSubscribed ? '1.5px solid var(--accent-red)' : '1.5px solid transparent',
                }}
                onClick={() => onToggleSubscribe(source)}
                title={isSubscribed ? "Aboneliği Kaldır" : "Abone Ol"}
            >
                {isSubscribed ? (
                    <>
                        <Check size={14} />
                        <span>Takipte</span>
                    </>
                ) : (
                    <>
                        <Plus size={14} />
                        <span>Ekle</span>
                    </>
                )}
            </button>
        </div>
    );
}

const styles = {
    card: {
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--border-radius)',
        padding: '16px',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--box-shadow)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
    },
    left: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        flex: 1,
        minWidth: 0,
    },
    logo: {
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    logoText: {
        color: 'white',
        fontSize: '14px',
        fontWeight: '800',
        letterSpacing: '0.5px',
    },
    info: {
        flex: 1,
        minWidth: 0,
    },
    nameRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
        marginBottom: '4px',
    },
    name: {
        fontSize: '15px',
        fontWeight: '700',
        color: 'var(--text-main)',
        margin: 0,
    },
    categoryBadge: {
        fontSize: '11px',
        fontWeight: '700',
        padding: '2px 7px',
        borderRadius: '5px',
        textTransform: 'uppercase',
        letterSpacing: '0.3px',
    },
    description: {
        fontSize: '12px',
        color: 'var(--text-secondary)',
        lineHeight: '1.5',
        margin: '0 0 6px 0',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
    stats: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    statsText: {
        fontSize: '11px',
        color: 'var(--text-secondary)',
        fontWeight: '500',
    },
    subscribeBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '8px 12px',
        borderRadius: '8px',
        fontSize: '13px',
        fontWeight: '700',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
    },
};
