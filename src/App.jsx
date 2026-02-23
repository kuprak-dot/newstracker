import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import NewsDetail from './pages/NewsDetail';
import TrackedNews from './pages/TrackedNews';
import Notifications from './pages/Notifications';
import SourcesPage from './pages/SourcesPage';
import { sourcesData } from './data/sourcesData';
import { fetchRssFeed } from './utils/fetchRss';

function App() {
  const [trackedEntities, setTrackedEntities] = useState(() => {
    const saved = localStorage.getItem('trackedEntities');
    return saved ? JSON.parse(saved) : [];
  });

  const [subscribedSources, setSubscribedSources] = useState(() => {
    const saved = localStorage.getItem('subscribedSources');
    return saved ? JSON.parse(saved) : [];
  });

  const [allNews, setAllNews] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);

  const [activeUpdates, setActiveUpdates] = useState([]);
  const [readUpdates, setReadUpdates] = useState(() => {
    const saved = localStorage.getItem('readUpdates');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('trackedEntities', JSON.stringify(trackedEntities));
  }, [trackedEntities]);

  useEffect(() => {
    localStorage.setItem('subscribedSources', JSON.stringify(subscribedSources));
  }, [subscribedSources]);

  useEffect(() => {
    localStorage.setItem('readUpdates', JSON.stringify(readUpdates));
  }, [readUpdates]);

  const fetchNews = async () => {
    setIsLoadingNews(true);
    try {
      const promises = sourcesData.map(source =>
        fetchRssFeed(source.rssUrl, source.name, source.id)
      );
      const results = await Promise.all(promises);
      const combined = results.flat().sort((a, b) => new Date(b.date) - new Date(a.date));
      setAllNews(combined);
    } catch (error) {
      console.error("News fetch error:", error);
    } finally {
      setIsLoadingNews(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const intervalId = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Update trackableEntities on news dynamically
  const newsWithTracking = useMemo(() => {
    return allNews.map(newsItem => {
      const matchedEntities = trackedEntities.filter(entity => {
        const keyword = entity.name.toLowerCase();
        return newsItem.title.toLowerCase().includes(keyword) || newsItem.summary.toLowerCase().includes(keyword);
      });
      return { ...newsItem, trackableEntities: matchedEntities };
    });
  }, [allNews, trackedEntities]);

  // Generate Notifications
  useEffect(() => {
    if (trackedEntities.length === 0 || allNews.length === 0) {
      setActiveUpdates([]);
      return;
    }

    const newUpdates = [];
    allNews.forEach(newsItem => {
      trackedEntities.forEach(entity => {
        const keyword = entity.name.toLowerCase();
        if (newsItem.title.toLowerCase().includes(keyword) || newsItem.summary.toLowerCase().includes(keyword)) {
          newUpdates.push({
            id: `update-${newsItem.id}-${entity.id}`,
            entityId: entity.id,
            title: `Takip edilen konu: ${entity.name}`,
            updateSummary: newsItem.title,
            updateDetail: newsItem.summary,
            date: newsItem.date,
            type: "new_development",
            relatedNewsId: newsItem.id
          });
        }
      });
    });

    // En son bildirimler en üstte
    newUpdates.sort((a, b) => new Date(b.date) - new Date(a.date));
    setActiveUpdates(newUpdates);
  }, [allNews, trackedEntities]);

  const handleToggleTrack = (entity) => {
    setTrackedEntities(prev => {
      const isTracking = prev.some(e => e.id === entity.id);
      if (isTracking) {
        return prev.filter(e => e.id !== entity.id);
      } else {
        return [...prev, entity];
      }
    });
  };

  const handleToggleSubscribe = (source) => {
    setSubscribedSources(prev => {
      const isSubscribed = prev.some(s => s.id === source.id);
      if (isSubscribed) {
        return prev.filter(s => s.id !== source.id);
      } else {
        return [...prev, source];
      }
    });
  };

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
                subscribedSources={subscribedSources}
                allNews={newsWithTracking}
                isLoading={isLoadingNews}
              />
            }
          />
          <Route
            path="/news/:id"
            element={
              <NewsDetail
                trackedEntities={trackedEntities}
                handleToggleTrack={handleToggleTrack}
                allNews={newsWithTracking}
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
          <Route
            path="/sources"
            element={
              <SourcesPage
                subscribedSources={subscribedSources}
                onToggleSubscribe={handleToggleSubscribe}
              />
            }
          />
        </Routes>
      </main>

      <BottomNav
        notificationCount={notificationCount}
        subscribedSourcesCount={subscribedSources.length}
      />
    </Router>
  );
}

export default App;
