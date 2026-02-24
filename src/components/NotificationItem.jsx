// src/components/NotificationItem.jsx
import React from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotificationItem({ update, isRead, onMarkAsRead }) {
    const navigate = useNavigate();

    const handleNotificationClick = () => {
        onMarkAsRead(update.id);
        navigate(`/news/${update.relatedNewsId}`);
    };

    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('tr-TR', options);
    };

    return (
        <div
            style={{
                ...styles.container,
                backgroundColor: isRead ? 'var(--bg-card)' : 'rgba(230, 57, 70, 0.05)',
                borderLeft: isRead ? '4px solid transparent' : '4px solid var(--accent-red)'
            }}
            onClick={handleNotificationClick}
        >
            <div style={styles.iconContainer}>
                <AlertCircle size={24} color="var(--accent-red)" />
            </div>

            <div style={styles.content}>
                <div style={styles.header}>
                    <h3 style={styles.title}>{update.title}</h3>
                    <span style={styles.time}>{formatDate(update.date)}</span>
                </div>

                <p style={styles.summary}>{update.updateSummary}</p>

                <div style={styles.actionRow}>
                    <span style={styles.actionText}>Haberde Oku</span>
                    <ArrowRight size={14} color="var(--accent-red)" />
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        gap: '12px',
        padding: '16px',
        marginBottom: '8px',
        borderRadius: '8px',
        cursor: 'pointer',
        border: '1px solid var(--border-color)',
        transition: 'all var(--transition-speed) ease',
    },
    iconContainer: {
        paddingTop: '2px',
    },
    content: {
        flex: 1,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '4px',
    },
    title: {
        fontSize: '15px',
        lineHeight: '1.3',
        margin: 0,
        fontWeight: '700',
        color: 'var(--text-main)',
        paddingRight: '8px',
    },
    time: {
        fontSize: '11px',
        color: 'var(--text-secondary)',
        whiteSpace: 'nowrap',
        fontWeight: '500',
    },
    summary: {
        fontSize: '14px',
        color: 'var(--text-main)',
        margin: '0 0 8px 0',
        lineHeight: '1.4',
    },
    actionRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        justifyContent: 'flex-end',
    },
    actionText: {
        fontSize: '12px',
        color: 'var(--accent-red)',
        fontWeight: '600',
    }
};
