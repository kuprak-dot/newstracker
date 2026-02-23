// src/pages/Notifications.jsx
import React from 'react';
import NotificationItem from '../components/NotificationItem';
import { Bell } from 'lucide-react';

export default function Notifications({ updates, readUpdates, onMarkAsRead, onMarkAllAsRead }) {
    // Okunmamışları üste, yenileri üste sırala
    const sortedUpdates = [...updates].sort((a, b) => {
        const isARead = readUpdates.includes(a.id);
        const isBRead = readUpdates.includes(b.id);

        if (isARead === isBRead) {
            return new Date(b.date) - new Date(a.date);
        }
        return isARead ? 1 : -1;
    });

    const unreadCount = updates.filter(u => !readUpdates.includes(u.id)).length;

    return (
        <div>
            <div style={styles.header}>
                <h2 style={styles.pageTitle}>Gelişmeler</h2>
                {unreadCount > 0 && (
                    <button style={styles.markAllBtn} onClick={onMarkAllAsRead}>
                        Tümünü Okundu İşaretle
                    </button>
                )}
            </div>

            <p style={styles.pageSubtitle}>
                Takip ettiğiniz konularla ilgili son durum güncellemeleri.
            </p>

            {updates.length === 0 ? (
                <div style={styles.emptyState}>
                    <Bell size={48} color="var(--border-color)" />
                    <p style={styles.emptyText}>Henüz yeni bir gelişme yok.</p>
                </div>
            ) : (
                <div style={styles.list}>
                    {sortedUpdates.map(update => (
                        <NotificationItem
                            key={update.id}
                            update={update}
                            isRead={readUpdates.includes(update.id)}
                            onMarkAsRead={onMarkAsRead}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
    },
    pageTitle: {
        fontSize: '22px',
        color: 'var(--text-main)',
        fontWeight: '800',
        letterSpacing: '-0.5px',
        margin: 0,
    },
    markAllBtn: {
        fontSize: '12px',
        color: 'var(--accent-red)',
        fontWeight: '600',
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
        gap: '2px', // Item'lar kendi mb'sine sahip
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
