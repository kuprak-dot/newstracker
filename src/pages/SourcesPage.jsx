// src/pages/SourcesPage.jsx
import React, { useState } from 'react';
import { Rss, Search } from 'lucide-react';
import SourceCard from '../components/SourceCard';
import { sourcesData, sourceCategories } from '../data/sourcesData';

export default function SourcesPage({ subscribedSources, onToggleSubscribe }) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = sourcesData.filter(source => {
        const matchesCategory = activeCategory === 'all' || source.category === activeCategory;
        const matchesSearch =
            source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            source.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const subscribedCount = subscribedSources.length;

    return (
        <div>
            {/* Başlık */}
            <div style={styles.pageHeader}>
                <div>
                    <h2 style={styles.pageTitle}>Haber Kaynakları</h2>
                    <p style={styles.pageSubtitle}>
                        {subscribedCount > 0
                            ? `${subscribedCount} kaynağa abone oldunuz`
                            : 'İlgilendiğiniz kaynakları seçin'}
                    </p>
                </div>
                {subscribedCount > 0 && (
                    <div style={styles.badge}>
                        <Rss size={14} color="white" />
                        <span>{subscribedCount}</span>
                    </div>
                )}
            </div>

            {/* Arama */}
            <div style={styles.searchContainer}>
                <Search size={16} color="var(--text-secondary)" style={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Kaynak ara..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            {/* Kategori Filtresi */}
            <div style={styles.categoryScroll}>
                {sourceCategories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        style={{
                            ...styles.categoryChip,
                            backgroundColor: activeCategory === cat.id ? 'var(--accent-red)' : 'var(--bg-card)',
                            color: activeCategory === cat.id ? 'white' : 'var(--text-secondary)',
                            border: activeCategory === cat.id
                                ? '1px solid transparent'
                                : '1px solid var(--border-color)',
                            fontWeight: activeCategory === cat.id ? '700' : '500',
                        }}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Kaynak Listesi */}
            {filtered.length === 0 ? (
                <div style={styles.emptyState}>
                    <Search size={44} color="var(--border-color)" />
                    <p style={styles.emptyText}>Eşleşen kaynak bulunamadı.</p>
                </div>
            ) : (
                <div style={styles.list}>
                    {filtered.map(source => (
                        <SourceCard
                            key={source.id}
                            source={source}
                            isSubscribed={subscribedSources.some(s => s.id === source.id)}
                            onToggleSubscribe={onToggleSubscribe}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

const styles = {
    pageHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px',
    },
    pageTitle: {
        fontSize: '22px',
        marginBottom: '4px',
        color: 'var(--text-main)',
        fontWeight: '800',
        letterSpacing: '-0.5px',
    },
    pageSubtitle: {
        fontSize: '13px',
        color: 'var(--text-secondary)',
        margin: 0,
    },
    badge: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        backgroundColor: 'var(--accent-red)',
        color: 'white',
        fontSize: '13px',
        fontWeight: '700',
        padding: '6px 12px',
        borderRadius: '20px',
    },
    searchContainer: {
        position: 'relative',
        marginBottom: '14px',
    },
    searchIcon: {
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
    },
    searchInput: {
        width: '100%',
        padding: '10px 12px 10px 38px',
        borderRadius: '10px',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-card)',
        fontSize: '14px',
        color: 'var(--text-main)',
        fontFamily: 'inherit',
        outline: 'none',
    },
    categoryScroll: {
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '4px',
        marginBottom: '16px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
    },
    categoryChip: {
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '12px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        transition: 'all 0.2s ease',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '60px 20px',
        textAlign: 'center',
    },
    emptyText: {
        fontSize: '15px',
        color: 'var(--text-secondary)',
        marginTop: '14px',
    },
};
