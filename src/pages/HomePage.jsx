// src/pages/HomePage.jsx
import React from 'react';
import NewsCard from '../components/NewsCard';
import { newsData } from '../data/newsData';

export default function HomePage({ trackedEntities, handleToggleTrack }) {
    return (
        <div>
            <h2 style={styles.pageTitle}>Günün Öne Çıkanları</h2>
            <div style={styles.newsList}>
                {newsData.map(news => {
                    // Bu haberdeki ana entity (kişi/olay) halihazırda takip ediliyor mu kontrol et
                    const mainEntityId = news.trackableEntities?.[0]?.id;
                    const isTracked = trackedEntities.some(e => e.id === mainEntityId);

                    return (
                        <NewsCard
                            key={news.id}
                            news={news}
                            isTracked={isTracked}
                            onToggleTrack={handleToggleTrack}
                        />
                    );
                })}
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
    newsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    }
};
