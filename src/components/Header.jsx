// src/components/Header.jsx
import React from 'react';
import { Bell } from 'lucide-react';

export default function Header({ notificationCount = 0 }) {
    return (
        <header className="header" style={styles.header}>
            <div style={styles.logoContainer}>
                <h1 style={styles.logo}>
                    Haber<span style={{ color: 'var(--accent-red)' }}>Takip</span>
                </h1>
            </div>
            <div style={styles.actionContainer}>
                <button style={styles.iconButton}>
                    <Bell size={24} color="var(--text-main)" />
                    {notificationCount > 0 && (
                        <span style={styles.badge}>{notificationCount}</span>
                    )}
                </button>
            </div>
        </header>
    );
}

const styles = {
    header: {
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '600px',
        height: 'var(--header-height)',
        backgroundColor: 'var(--bg-card)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
        zIndex: 1000,
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        fontSize: '24px',
        fontWeight: '800',
        margin: 0,
        letterSpacing: '-0.5px',
    },
    actionContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    iconButton: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
    },
    badge: {
        position: 'absolute',
        top: '4px',
        right: '4px',
        backgroundColor: 'var(--accent-red)',
        color: 'white',
        fontSize: '10px',
        fontWeight: 'bold',
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid var(--bg-card)',
    }
};
