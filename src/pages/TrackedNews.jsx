// src/pages/TrackedNews.jsx
import React from 'react';
import { Bookmark, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TrackedNews({ trackedEntities, handleToggleTrack }) {
    const navigate = useNavigate();

    return (
        <div>
            <h2 style={styles.pageTitle}>Takip Ettiklerim</h2>
            <p style={styles.pageSubtitle}>
                İlgilendiğiniz kişi ve olaylarla ilgili yeni gelişmeler olduğunda anında bildirim alacaksınız.
            </p>

            {trackedEntities.length === 0 ? (
                <div style={styles.emptyState}>
                    <Bookmark size={48} color="var(--border-color)" />
                    <p style={styles.emptyText}>Henüz takip ettiğiniz bir konu yok.</p>
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/')}
                        style={{ marginTop: '16px' }}
                    >
                        Haberlere Göz At
                    </button>
                </div>
            ) : (
                <div style={styles.list}>
                    {trackedEntities.map(entity => (
                        <div key={entity.id} style={styles.card}>
                            <div style={styles.cardHeader}>
                                <div style={styles.entityInfo}>
                                    <span style={styles.entityType}>
                                        {entity.type === 'person' ? 'Kişi' : entity.type === 'topic' ? 'Konu' : 'Proje'}
                                    </span>
                                    <h3 style={styles.entityName}>{entity.name}</h3>
                                </div>
                                <button
                                    style={styles.untrackBtn}
                                    onClick={() => handleToggleTrack(entity)}
                                    title="Takipten Çık"
                                >
                                    <Bookmark size={20} color="var(--accent-red)" fill="var(--accent-red)" />
                                </button>
                            </div>
                            <div style={styles.cardFooter}>
                                <AlertCircle size={14} color="var(--text-secondary)" />
                                <span style={styles.footerText}>Aktif olarak izleniyor</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles = {
    pageTitle: {
        fontSize: '22px',
        marginBottom: '8px',
        color: 'var(--text-main)',
        fontWeight: '800',
        letterSpacing: '-0.5px',
    },
    pageSubtitle: {
        fontSize: '14px',
        color: 'var(--text-secondary)',
        marginBottom: '24px',
        lineHeight: '1.4',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    card: {
        backgroundColor: 'var(--bg-card)',
        padding: '16px',
        borderRadius: 'var(--border-radius)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--box-shadow)',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '12px',
    },
    entityInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    entityType: {
        fontSize: '11px',
        color: 'var(--text-secondary)',
        textTransform: 'uppercase',
        fontWeight: '700',
        marginBottom: '4px',
    },
    entityName: {
        fontSize: '16px',
        fontWeight: '700',
        color: 'var(--text-main)',
        margin: 0,
    },
    untrackBtn: {
        padding: '8px',
        backgroundColor: 'rgba(230,57,70,0.05)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardFooter: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        paddingTop: '12px',
        borderTop: '1px solid var(--border-color)',
    },
    footerText: {
        fontSize: '12px',
        color: 'var(--text-secondary)',
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        textAlign: 'center',
    },
    emptyText: {
        fontSize: '16px',
        color: 'var(--text-secondary)',
        marginTop: '16px',
    }
};
