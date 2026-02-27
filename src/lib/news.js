const NEWS_API = 'https://api.coingecko.com/api/v3/news';

export async function getCryptoNews(category = null, limit = 10) {
  try {
    const url = new URL(NEWS_API);
    url.searchParams.set('per_page', limit.toString());
    url.searchParams.set('page', '1');
    
    const response = await fetch(url.toString());
    const data = await response.json();
    
    if (data.data) {
      return data.data.map(news => ({
        id: news.id,
        title: news.title,
        description: news.description,
        url: news.url,
        thumbnail: news.thumb_2x || news.thumb,
        source: news.news_site,
        publishedAt: news.created_at,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function getNewsByCategory(category, limit = 10) {
  try {
    const url = new URL(NEWS_API);
    url.searchParams.set('per_page', limit.toString());
    url.searchParams.set('page', '1');
    if (category) {
      url.searchParams.set('category', category);
    }
    
    const response = await fetch(url.toString());
    const data = await response.json();
    
    if (data.data) {
      return data.data.map(news => ({
        id: news.id,
        title: news.title,
        description: news.description,
        url: news.url,
        thumbnail: news.thumb_2x || news.thumb,
        source: news.news_site,
        publishedAt: news.created_at,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}
