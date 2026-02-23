// src/components/NewsCard.jsx
import React from 'react';
import { Bookmark, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NewsCard({ news, isTracked, onToggleTrack }) {
    const navigate = useNavigate();

    // Tarihi okunabilir formata çevir
    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('tr-TR', options);
    };

    return (
        <article style={styles.card}>
            <div style={styles.header}>
                <div style={styles.meta}>
                    <span style={styles.source}>{news.source}</span>
                    <div style={styles.timeContainer}>
                        <Clock size={12} color="var(--text-secondary)" />
                        <span style={styles.time}>{formatDate(news.date)}</span>
                    </div>
                </div>
                <button
                    style={styles.trackButton}
                    onClick={(e) => {
                        e.stopPropagation(); // Kart tıklamasını engelle
                        // Sadece ilk ana entity'i takip et (basitlik için)
                        if (news.trackableEntities && news.trackableEntities.length > 0) {
                            onToggleTrack(news.trackableEntities[0]);
                        }
                    }}
                    title={isTracked ? "Takipten Çık" : "Gelişmeleri Takip Et"}
                >
                    <Bookmark
                        size={20}
                        color={isTracked ? "var(--accent-red)" : "var(--text-secondary)"}
                        fill={isTracked ? "var(--accent-red)" : "none"}
                    />
                </button>
            </div>

            <div
                style={styles.content}
                onClick={() => navigate(`/news/${news.id}`)}
            >
                <h2 style={styles.title}>{news.title}</h2>
                <p style={styles.summary}>{news.summary}</p>
            </div>

            <div style={styles.footer}>
                <div style={styles.tags}>
                    {news.trackableEntities?.map(entity => (
                        <span key={entity.id} style={styles.tag}>
                            #{entity.name.replace(/ /g, '')}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
}

const styles = {
    card: {
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--border-radius)',
        padding: '16px',
        marginBottom: '16px',
        boxShadow: 'var(--box-shadow)',
        transition: 'transform var(--transition-speed) ease',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '12px',
    },
    meta: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
    },
    source: {
        fontSize: '12px',
        fontWeight: '700',
        color: 'var(--accent-red)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    timeContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    time: {
        fontSize: '12px',
        color: 'var(--text-secondary)',
    },
    trackButton: {
        padding: '4px',
        backgroundColor: 'rgba(0,0,0,0.03)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        marginBottom: '12px',
    },
    title: {
        fontSize: '18px',
        lineHeight: '1.4',
        marginBottom: '8px',
        color: 'var(--text-main)',
    },
    summary: {
        fontSize: '14px',
        color: 'var(--text-secondary)',
        lineHeight: '1.5',
        margin: 0,
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '12px',
        marginTop: '4px',
    },
    tags: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
    },
    tag: {
        fontSize: '12px',
        backgroundColor: 'var(--bg-main)',
        color: 'var(--text-secondary)',
        padding: '4px 8px',
        borderRadius: '4px',
        fontWeight: '500',
    }
};
