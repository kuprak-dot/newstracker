// src/pages/NewsDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Bookmark } from 'lucide-react';
import { newsData } from '../data/newsData';

export default function NewsDetail({ trackedEntities, handleToggleTrack }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const news = newsData.find(n => n.id === id);

    if (!news) {
        return <div style={styles.notFound}>Haber bulunamadı.</div>;
    }

    const mainEntity = news.trackableEntities?.[0];
    const isTracked = mainEntity && trackedEntities.some(e => e.id === mainEntity.id);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('tr-TR', options);
    };

    return (
        <div style={styles.container}>
            <button style={styles.backButton} onClick={() => navigate(-1)}>
                <ArrowLeft size={20} />
                Geri Dön
            </button>

            <article>
                <div style={styles.meta}>
                    <span style={styles.source}>{news.source}</span>
                    <div style={styles.timeContainer}>
                        <Clock size={14} color="var(--text-secondary)" />
                        <span style={styles.time}>{formatDate(news.date)}</span>
                    </div>
                </div>

                <h1 style={styles.title}>{news.title}</h1>

                {mainEntity && (
                    <div style={styles.trackBanner}>
                        <div style={styles.bannerInfo}>
                            <span style={styles.bannerLabel}>İlgili Konu/Kişi:</span>
                            <span style={styles.bannerEntity}>{mainEntity.name}</span>
                        </div>
                        <button
                            className="btn-primary"
                            style={{ padding: '8px 12px', fontSize: '14px', backgroundColor: isTracked ? 'var(--text-main)' : 'var(--accent-red)' }}
                            onClick={() => handleToggleTrack(mainEntity)}
                        >
                            <Bookmark size={16} fill={isTracked ? "white" : "none"} />
                            {isTracked ? 'Takip Ediliyor' : 'Gelişmeleri Takip Et'}
                        </button>
                    </div>
                )}

                <div style={styles.content}>
                    <p style={styles.summaryLead}>{news.summary}</p>
                    <div style={styles.divider}></div>
                    <p style={styles.detailText}>{news.detail}</p>
                </div>
            </article>
        </div>
    );
}

const styles = {
    container: {
        paddingBottom: '24px',
    },
    notFound: {
        padding: '40px 20px',
        textAlign: 'center',
        color: 'var(--text-secondary)',
    },
    backButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: 'var(--text-secondary)',
        marginBottom: '20px',
        padding: '0',
        fontWeight: '600',
    },
    meta: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
    },
    source: {
        fontSize: '13px',
        fontWeight: '700',
        color: 'var(--accent-red)',
        textTransform: 'uppercase',
    },
    timeContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    time: {
        fontSize: '13px',
        color: 'var(--text-secondary)',
    },
    title: {
        fontSize: '24px',
        fontWeight: '800',
        lineHeight: '1.3',
        marginBottom: '24px',
        color: 'var(--text-main)',
    },
    trackBanner: {
        backgroundColor: 'var(--bg-card)',
        padding: '16px',
        borderRadius: 'var(--border-radius)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        border: '1px solid var(--accent-red)',
        boxShadow: '0 4px 12px rgba(230, 57, 70, 0.1)',
    },
    bannerInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    bannerLabel: {
        fontSize: '11px',
        color: 'var(--text-secondary)',
        textTransform: 'uppercase',
        fontWeight: '700',
    },
    bannerEntity: {
        fontSize: '15px',
        fontWeight: '700',
        color: 'var(--text-main)',
    },
    content: {
        fontSize: '16px',
        lineHeight: '1.7',
        color: 'var(--text-main)',
    },
    summaryLead: {
        fontSize: '18px',
        fontWeight: '600',
        color: 'var(--text-main)',
        marginBottom: '20px',
        lineHeight: '1.5',
    },
    divider: {
        height: '1px',
        backgroundColor: 'var(--border-color)',
        margin: '20px 0',
    },
    detailText: {
        whiteSpace: 'pre-wrap',
    }
};
