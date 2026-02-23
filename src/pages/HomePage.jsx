import React, { useState } from 'react';
import NewsCard from '../components/NewsCard';
import { sourcesData } from '../data/sourcesData';
import { Rss, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomePage({ trackedEntities, handleToggleTrack, subscribedSources, allNews = [], isLoading = false }) {
    const navigate = useNavigate();
    const [activeSourceFilter, setActiveSourceFilter] = useState('all');

    // Abone olunan kaynaklara filtrele (veya tamnını göster)
    const visibleNews = allNews.filter(news => {
        if (activeSourceFilter === 'all') {
            // Eğer hiç abone yoksa tümünü göster; abone varsa sadece onları
            if (subscribedSources.length === 0) return true;
            return subscribedSources.some(s => s.name === news.source);
        }
        return news.source === activeSourceFilter;
    });

    // Filtre çubuğu için: abone olunan kaynaklar (+ "Tümü" seçeneği)
    const filterSources = subscribedSources.length > 0
        ? [{ id: 'all', name: 'Tümü' }, ...subscribedSources]
        : [];

    return (
        <div>
            <h2 style={styles.pageTitle}>Günün Öne Çıkanları</h2>

            {/* Kaynak filtre çubuğu */}
            {filterSources.length > 0 && (
                <div style={styles.filterRow}>
                    {filterSources.map(src => {
                        const isActive = activeSourceFilter === (src.id === 'all' ? 'all' : src.name);
                        const sourceInfo = sourcesData.find(s => s.name === src.name);
                        return (
                            <button
                                key={src.id || src.name}
                                onClick={() => setActiveSourceFilter(src.id === 'all' ? 'all' : src.name)}
                                style={{
                                    ...styles.filterChip,
                                    backgroundColor: isActive
                                        ? (sourceInfo ? sourceInfo.color : 'var(--accent-red)')
                                        : 'var(--bg-card)',
                                    color: isActive ? 'white' : 'var(--text-secondary)',
                                    border: isActive ? '1px solid transparent' : '1px solid var(--border-color)',
                                    fontWeight: isActive ? '700' : '500',
                                }}
                            >
                                {src.name}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Abone olmadığında promosyon banner */}
            {subscribedSources.length === 0 && (
                <div style={styles.sourceBanner} onClick={() => navigate('/sources')}>
                    <Rss size={20} color="var(--accent-red)" />
                    <div style={styles.bannerText}>
                        <span style={styles.bannerTitle}>Kaynaklarınızı seçin</span>
                        <span style={styles.bannerSub}>İlgilendiğiniz kaynakları takibe alın →</span>
                    </div>
                </div>
            )}

            <div style={styles.newsList}>
                {isLoading ? (
                    <div style={styles.loadingState}>
                        <Loader2 size={32} color="var(--accent-red)" />
                        <p style={styles.loadingText}>Son dakika haberleri yükleniyor...</p>
                    </div>
                ) : visibleNews.length > 0 ? (
                    visibleNews.map(news => {
                        const isTracked = news.trackableEntities?.length > 0;
                        return (
                            <NewsCard
                                key={news.id}
                                news={news}
                                isTracked={isTracked}
                                onToggleTrack={handleToggleTrack}
                            />
                        );
                    })
                ) : (
                    <div style={styles.emptyState}>
                        <p style={styles.emptyText}>Bu kaynaktan henüz haber yok.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    pageTitle: {
        fontSize: '22px',
        marginBottom: '16px',
        color: 'var(--text-main)',
        fontWeight: '800',
        letterSpacing: '-0.5px',
    },
    filterRow: {
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '4px',
        marginBottom: '14px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
    },
    filterChip: {
        padding: '5px 13px',
        borderRadius: '20px',
        fontSize: '12px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        transition: 'all 0.2s ease',
    },
    sourceBanner: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: 'rgba(230,57,70,0.05)',
        border: '1px dashed rgba(230,57,70,0.3)',
        borderRadius: 'var(--border-radius)',
        padding: '12px 16px',
        marginBottom: '16px',
        cursor: 'pointer',
    },
    bannerText: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
    },
    bannerTitle: {
        fontSize: '14px',
        fontWeight: '700',
        color: 'var(--text-main)',
    },
    bannerSub: {
        fontSize: '12px',
        color: 'var(--accent-red)',
    },
    newsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    emptyState: {
        padding: '40px 0',
        textAlign: 'center',
    },
    emptyText: {
        color: 'var(--text-secondary)',
        fontSize: '14px',
    },
    loadingState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 0',
        gap: '12px',
    },
    loadingText: {
        color: 'var(--text-secondary)',
        fontSize: '14px',
        fontWeight: '500',
    }
};
