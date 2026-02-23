// src/components/BottomNav.jsx
import React from 'react';
import { Home, Bookmark, Bell, Rss } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BottomNav({ notificationCount = 0, subscribedSourcesCount = 0 }) {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { id: 'home', path: '/', icon: Home, label: 'Haberler' },
        { id: 'sources', path: '/sources', icon: Rss, label: 'Kaynaklar', badge: subscribedSourcesCount > 0 ? subscribedSourcesCount : null },
        { id: 'tracked', path: '/tracked', icon: Bookmark, label: 'Takip' },
        { id: 'notifications', path: '/notifications', icon: Bell, label: 'Bildirimler', badge: notificationCount > 0 ? notificationCount : null },
    ];

    return (
        <nav style={styles.bottomNav}>
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                    <button
                        key={item.id}
                        style={styles.navItem}
                        onClick={() => navigate(item.path)}
                    >
                        <div style={{ position: 'relative' }}>
                            <Icon
                                size={24}
                                color={isActive ? 'var(--accent-red)' : 'var(--text-secondary)'}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                            {item.badge && (
                                <span style={styles.miniBadge}></span>
                            )}
                        </div>
                        <span style={{
                            ...styles.label,
                            color: isActive ? 'var(--accent-red)' : 'var(--text-secondary)',
                            fontWeight: isActive ? '600' : '400'
                        }}>
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
}

const styles = {
    bottomNav: {
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '600px',
        height: 'var(--bottom-nav-height)',
        backgroundColor: 'var(--bg-card)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
        zIndex: 1000,
        paddingBottom: 'env(safe-area-inset-bottom)',
        borderTop: '1px solid var(--border-color)',
    },
    navItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: '100%',
        gap: '4px',
    },
    label: {
        fontSize: '11px',
        transition: 'color 0.2s ease',
    },
    miniBadge: {
        position: 'absolute',
        top: '-2px',
        right: '-2px',
        width: '8px',
        height: '8px',
        backgroundColor: 'var(--accent-red)',
        borderRadius: '50%',
        border: '1.5px solid var(--bg-card)',
    }
};
