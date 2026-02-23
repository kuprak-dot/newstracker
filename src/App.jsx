import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import NewsDetail from './pages/NewsDetail';
import TrackedNews from './pages/TrackedNews';
import Notifications from './pages/Notifications';
import { updatesData } from './data/updatesData';

function App() {
  // State tanımlamaları
  const [trackedEntities, setTrackedEntities] = useState(() => {
    const saved = localStorage.getItem('trackedEntities');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeUpdates, setActiveUpdates] = useState([]);
  const [readUpdates, setReadUpdates] = useState(() => {
    const saved = localStorage.getItem('readUpdates');
    return saved ? JSON.parse(saved) : [];
  });

  // Takip edilenler değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('trackedEntities', JSON.stringify(trackedEntities));
  }, [trackedEntities]);

  // Okunan bildirimleri kaydet
  useEffect(() => {
    localStorage.setItem('readUpdates', JSON.stringify(readUpdates));
  }, [readUpdates]);

  // Takip/Takipten Çık mantığı
  const handleToggleTrack = (entity) => {
    setTrackedEntities(prev => {
      const isTracking = prev.some(e => e.id === entity.id);
      if (isTracking) {
        return prev.filter(e => e.id !== entity.id);
      } else {
        return [...prev, entity];
      }
    });

    // UX için ufak bir animasyon/hissiyat (gerçekte toast eklenebilir)
  };

  // Mock Notification Sistemi: 
  // Takip edilen entity'lere ait güncellemeleri simüle et (örneğin 3 saniye sonra gelsin)
  useEffect(() => {
    if (trackedEntities.length === 0) {
      setActiveUpdates([]);
      return;
    }

    const timer = setTimeout(() => {
      // Sadece takip edilen konulara ait güncellemeleri filtrele
      const newUpdates = updatesData.filter(update =>
        trackedEntities.some(entity => entity.id === update.entityId)
      );

      setActiveUpdates(newUpdates);
    }, 3000); // Demoya özel hızlı gelmesi için 3 sn gecikme

    return () => clearTimeout(timer);
  }, [trackedEntities]);

  // Bildirim sayısını hesapla (aktif - okunanlar)
  const notificationCount = activeUpdates.filter(u => !readUpdates.includes(u.id)).length;

  const handleMarkAsRead = (updateId) => {
    if (!readUpdates.includes(updateId)) {
      setReadUpdates(prev => [...prev, updateId]);
    }
  };

  const handleMarkAllAsRead = () => {
    const allIds = activeUpdates.map(u => u.id);
    setReadUpdates(allIds);
  };

  return (
    <Router>
      <Header notificationCount={notificationCount} />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                trackedEntities={trackedEntities}
                handleToggleTrack={handleToggleTrack}
              />
            }
          />
          <Route
            path="/news/:id"
            element={
              <NewsDetail
                trackedEntities={trackedEntities}
                handleToggleTrack={handleToggleTrack}
              />
            }
          />
          <Route
            path="/tracked"
            element={
              <TrackedNews
                trackedEntities={trackedEntities}
                handleToggleTrack={handleToggleTrack}
              />
            }
          />
          <Route
            path="/notifications"
            element={
              <Notifications
                updates={activeUpdates}
                readUpdates={readUpdates}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
              />
            }
          />
        </Routes>
      </main>

      <BottomNav notificationCount={notificationCount} />
    </Router>
  );
}

export default App;
