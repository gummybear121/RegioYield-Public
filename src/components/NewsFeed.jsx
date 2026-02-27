import { useState, useEffect } from 'react';
import { getCryptoNews } from '../lib/news';

export default function NewsFeed() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getCryptoNews(null, 10);
      setNews(data);
      setLoading(false);
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <>
        <h2 className="section-title">
          <div className="cube-icon" style={{ background: 'var(--accent-gold-dim)' }}></div>
          News Feeds
        </h2>
        <div style={{ padding: '10px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
          Loading news...
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="section-title">
        <div className="cube-icon" style={{ background: 'var(--accent-gold-dim)' }}></div>
        News Feeds
      </h2>
      <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
        {news.map((item) => (
          <a 
            key={item.id} 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="news-item"
          >
            <div className="news-source">{item.source}</div>
            <div className="news-headline">{item.title}</div>
          </a>
        ))}
      </div>
    </>
  );
}
