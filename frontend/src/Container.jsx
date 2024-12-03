// import React, { useState } from 'react';
// import axios from 'axios';
// import './Container.css'; // CSS file for styling

// const API_KEY = 'AIzaSyDKINTEZRCP1tvL4uCSwZ9ev9aZ2aqqiXk';
// const CHANNEL_ID = 'UCfF8pgdHcfqc-Co_ViXvFbQ';

// const Container = () => {
//   const [shortsData, setShortsData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchShortsDetails = async () => {
//     setLoading(true);
//     setError(null); // Reset error state
//     try {
//       const videoResponse = await axios.get(
//         `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=50&key=${API_KEY}`
//       );

//       const videoIds = videoResponse.data.items.map(item => item.id.videoId).join(',');
//       const detailsResponse = await axios.get(
//         `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${API_KEY}`
//       );

//       const shorts = videoResponse.data.items
//         .map((item, index) => ({
//           ...item,
//           statistics: detailsResponse.data.items[index]?.statistics,
//           snippet: detailsResponse.data.items[index]?.snippet,
//         }))
//         .filter(item => {
//           const duration = item.contentDetails?.duration || '';
//           return parseDuration(duration) <= 60; // Identify Shorts based on duration
//         });

//       setShortsData(shorts); // Store shorts data
//     } catch (error) {
//       setError(error.response ? error.response.data.error.message : error.message);
//       console.error('Error fetching Shorts:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const parseDuration = (duration) => {
//     if (!duration) return 0; // Return 0 if duration is null or undefined
//     const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
//     const hours = match[1] ? parseInt(match[1]) : 0;
//     const minutes = match[2] ? parseInt(match[2]) : 0;
//     const seconds = match[3] ? parseInt(match[3]) : 0;
//     return hours * 3600 + minutes * 60 + seconds;
//   };

//   return (
//     <div className="container" onClick={fetchShortsDetails}>
//       {loading && <p>Loading...</p>}
//       {error && <p className="error">Error: {error}</p>}
//       <div className="shortsList">
//         {shortsData.map(short => (
//           <div key={short.id.videoId} className="shortCard">
//             <img src={short.snippet.thumbnails.default.url} alt={short.snippet.title} />
//             <div className="shortCardDetails">
//               <h3>{short.snippet.title}</h3>
//               <p>Published on: {new Date(short.snippet.publishedAt).toLocaleDateString()}</p>
//               <p>Total Views: {short.statistics.viewCount}</p>
//               <p>Total Likes: {short.statistics.likeCount}</p>
//               <p>Average Views: {(short.statistics.viewCount / shortsData.length).toFixed(0)}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Container;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Container.css'; // CSS file for styling

// const API_KEY = 'AIzaSyDKINTEZRCP1tvL4uCSwZ9ev9aZ2aqqiXk';
// const CHANNEL_ID = 'UCfF8pgdHcfqc-Co_ViXvFbQ';

// const Container = () => {
//   const [shortsData, setShortsData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [analytics, setAnalytics] = useState({ totalViews: 0, totalLikes: 0, avgViews: 0 });

//   const fetchShortsDetails = async () => {
//     setLoading(true);
//     setError(null); // Reset error state
//     try {
//       const videoResponse = await axios.get(
//         `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=50&key=${API_KEY}`
//       );

//       const videoIds = videoResponse.data.items.map(item => item.id.videoId).join(',');
//       const detailsResponse = await axios.get(
//         `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${API_KEY}`
//       );

//       const shorts = videoResponse.data.items
//         .map((item, index) => ({
//           ...item,
//           statistics: detailsResponse.data.items[index]?.statistics,
//           snippet: detailsResponse.data.items[index]?.snippet,
//         }))
//         .filter(item => {
//           const duration = item.contentDetails?.duration || '';
//           return parseDuration(duration) <= 60; // Identify Shorts based on duration
//         });

//       setShortsData(shorts); // Store shorts data

//       // Calculate total views, likes, and average views
//       const totalViews = shorts.reduce((sum, short) => sum + parseInt(short.statistics.viewCount, 10), 0);
//       const totalLikes = shorts.reduce((sum, short) => sum + parseInt(short.statistics.likeCount || 0, 10), 0);
//       const avgViews = shorts.length > 0 ? (totalViews / shorts.length).toFixed(2) : 0;

//       setAnalytics({ totalViews, totalLikes, avgViews });

//     } catch (error) {
//       setError(error.response ? error.response.data.error.message : error.message);
//       console.error('Error fetching Shorts:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const parseDuration = (duration) => {
//     if (!duration) return 0; // Return 0 if duration is null or undefined
//     const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
//     const hours = match[1] ? parseInt(match[1]) : 0;
//     const minutes = match[2] ? parseInt(match[2]) : 0;
//     const seconds = match[3] ? parseInt(match[3]) : 0;
//     return hours * 3600 + minutes * 60 + seconds;
//   };

//   // Automatically fetch data when the component mounts
//   useEffect(() => {
//     fetchShortsDetails();
//   }, []);

//   return (
//     <div className="container">
//       {loading && <p>Loading...</p>}
//       {error && <p className="error">Error: {error}</p>}

//       <div className="analyticsDashboard">
//         <h2>Analytics Dashboard</h2>
//         <p>Total Views: {analytics.totalViews}</p>
//         <p>Total Likes: {analytics.totalLikes}</p>
//         <p>Average Views per Video: {analytics.avgViews}</p>
//       </div>

//       <div className="shortsList">
//         {shortsData.map(short => (
//           <div key={short.id.videoId} className="shortCard">
//             <img src={short.snippet.thumbnails.default.url} alt={short.snippet.title} />
//             <div className="shortCardDetails">
//               <h3>{short.snippet.title}</h3>
//               <p>Published on: {new Date(short.snippet.publishedAt).toLocaleDateString()}</p>
//               <p>Total Views: {short.statistics.viewCount}</p>
//               <p>Total Likes: {short.statistics.likeCount}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Container;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Container.css'; // CSS file for styling

// const API_KEY = 'AIzaSyDKINTEZRCP1tvL4uCSwZ9ev9aZ2aqqiXk';
// const CHANNEL_ID = 'UCfF8pgdHcfqc-Co_ViXvFbQ';

// const Container = () => {
//   const [shortsData, setShortsData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [analytics, setAnalytics] = useState({ totalViews: 0, totalLikes: 0, avgViews: 0 });

//   const fetchShortsDetails = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const videoResponse = await axios.get(
//         `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=50&key=${API_KEY}`
//       );

//       const videoIds = videoResponse.data.items.map(item => item.id.videoId).join(',');
//       const detailsResponse = await axios.get(
//         `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${API_KEY}`
//       );

//       const shorts = videoResponse.data.items
//         .map((item, index) => ({
//           ...item,
//           statistics: detailsResponse.data.items[index]?.statistics,
//           snippet: detailsResponse.data.items[index]?.snippet,
//         }))
//         .filter(item => {
//           const duration = item.contentDetails?.duration || '';
//           return parseDuration(duration) <= 60;
//         });

//       setShortsData(shorts);

//       const totalViews = shorts.reduce((sum, short) => sum + parseInt(short.statistics.viewCount, 10), 0);
//       const totalLikes = shorts.reduce((sum, short) => sum + parseInt(short.statistics.likeCount || 0, 10), 0);
//       const avgViews = shorts.length > 0 ? (totalViews / shorts.length).toFixed(2) : 0;

//       setAnalytics({ totalViews, totalLikes, avgViews });

//     } catch (error) {
//       setError(error.response ? error.response.data.error.message : error.message);
//       console.error('Error fetching Shorts:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const parseDuration = (duration) => {
//     if (!duration) return 0;
//     const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
//     const hours = match[1] ? parseInt(match[1]) : 0;
//     const minutes = match[2] ? parseInt(match[2]) : 0;
//     const seconds = match[3] ? parseInt(match[3]) : 0;
//     return hours * 3600 + minutes * 60 + seconds;
//   };

//   useEffect(() => {
//     fetchShortsDetails();
//   }, []);

//   return (
//     <div className="container">
//       {loading && <p>Loading...</p>}
//       {error && <p className="error">Error: {error}</p>}

//       <div className="analyticsDashboard">
//         <h2>Analytics Dashboard</h2>
//         <p>Total Views: {analytics.totalViews}</p>
//         <p>Total Likes: {analytics.totalLikes}</p>
//         <p>Average Views per Video: {analytics.avgViews}</p>
//       </div>

//       <div className="shortsList">
//         {shortsData.map(short => (
//           <div key={short.id.videoId} className="shortCard">
//             <img src={short.snippet.thumbnails.default.url} alt={short.snippet.title} />
//             <div className="shortCardDetails">
//               <h3>{short.snippet.title}</h3>
//               <p>Published on: {new Date(short.snippet.publishedAt).toLocaleDateString()}</p>
//               <p>Total Views: {short.statistics.viewCount}</p>
//               <p>Total Likes: {short.statistics.likeCount}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Container;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import './Container.css'; // CSS file for styling

const API_KEY = 'AIzaSyDKINTEZRCP1tvL4uCSwZ9ev9aZ2aqqiXk';
const CHANNEL_ID = 'UCfF8pgdHcfqc-Co_ViXvFbQ';

const Container = () => {
  const [shortsData, setShortsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analytics, setAnalytics] = useState({ totalViews: 0, totalLikes: 0, avgViews: 0 });
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState('views');
  const [likesData, setLikesData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);

  const fetchShortsDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const videoResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=50&key=${API_KEY}`
      );

      const videoIds = videoResponse.data.items.map(item => item.id.videoId).join(',');
      const detailsResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${API_KEY}`
      );

      const shorts = videoResponse.data.items
        .map((item, index) => {
          const stats = detailsResponse.data.items[index]?.statistics || {};
          return {
            ...item,
            statistics: stats,
            snippet: detailsResponse.data.items[index]?.snippet,
          };
        })
        .filter(item => {
          const duration = item.contentDetails?.duration || '';
          return parseDuration(duration) <= 60;
        });

      setShortsData(shorts);

      const totalViews = shorts.reduce((sum, short) => sum + parseInt(short.statistics.viewCount, 10), 0);
      const totalLikes = shorts.reduce((sum, short) => sum + parseInt(short.statistics.likeCount || 0, 10), 0);
      const avgViews = shorts.length > 0 ? (totalViews / shorts.length).toFixed(2) : 0;

      setAnalytics({ totalViews, totalLikes, avgViews });

      // Extract likes and comments data
      const likesData = shorts.map(short => parseInt(short.statistics.likeCount || 0, 10));
      const commentsData = shorts.map(short => parseInt(short.statistics.commentCount || 0, 10));

      setLikesData(likesData);
      setCommentsData(commentsData);

    } catch (error) {
      setError(error.response ? error.response.data.error.message : error.message);
      console.error('Error fetching Shorts:', error);
    } finally {
      setLoading(false);
    }
  };

  const parseDuration = (duration) => {
    if (!duration) return 0;
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;
    return hours * 3600 + minutes * 60 + seconds;
  };

  const handleSort = (key) => {
    setSortBy(key);
  };

  const sortedShorts = [...shortsData].sort((a, b) => {
    const aCount = parseInt(a.statistics[sortBy === 'views' ? 'viewCount' : 'likeCount'], 10) || 0;
    const bCount = parseInt(b.statistics[sortBy === 'views' ? 'viewCount' : 'likeCount'], 10) || 0;
    return bCount - aCount; // Descending order
  });

  useEffect(() => {
    fetchShortsDetails();
  }, []);

  return (
    <div className="container">
      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="analyticsDashboard">
        <h2>Analytics Dashboard</h2>
        <p>Total Views: {analytics.totalViews}</p>
        <p>Total Likes: {analytics.totalLikes}</p>
        <p>Average Views per Video: {analytics.avgViews}</p>

        <div className="sortOptions">
          <button onClick={() => handleSort('views')}>Sort by Views</button>
          <button onClick={() => handleSort('likes')}>Sort by Likes</button>
          <button onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Show Top 4' : 'Show All'}
          </button>
        </div>
      </div>

      <div className="shortsList">
        {(showAll ? sortedShorts : sortedShorts.slice(0, 4)).map(short => (
          <div key={short.id.videoId} className="shortCard">
            <img src={short.snippet.thumbnails.default.url} alt={short.snippet.title} />
            <div className="shortCardDetails">
              <h3>{short.snippet.title}</h3>
              <p>Published on: {new Date(short.snippet.publishedAt).toLocaleDateString()}</p>
              <p>Total Views: {short.statistics.viewCount}</p>
              <p>Total Likes: {short.statistics.likeCount}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Views Over Time Chart */}
      <div className="chartContainer">
        <h3>Views Over Time</h3>
        <Line
          data={{
            labels: shortsData.map(short => new Date(short.snippet.publishedAt).toLocaleDateString()),
            datasets: [{
              label: 'Views',
              data: shortsData.map(short => parseInt(short.statistics.viewCount, 10) || 0),
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
            }],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  color: '#e0e0e0',
                },
              },
              y: {
                grid: {
                  color: '#e0e0e0',
                },
              },
            },
          }}
        />
      </div>

      {/* Likes Over Time Chart */}
      <div className="chartContainer">
        <h3>Likes Over Time</h3>
        <Line
          data={{
            labels: shortsData.map(short => new Date(short.snippet.publishedAt).toLocaleDateString()),
            datasets: [{
              label: 'Likes',
              data: likesData,
              fill: false,
              backgroundColor: 'rgba(255,206,86,0.4)',
              borderColor: 'rgba(255,206,86,1)',
            }],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  color: '#e0e0e0',
                },
              },
              y: {
                grid: {
                  color: '#e0e0e0',
                },
              },
            },
          }}
        />
      </div>

      {/* Comments Over Time Chart */}
      <div className="chartContainer">
        <h3>Comments Over Time</h3>
        <Line
          data={{
            labels: shortsData.map(short => new Date(short.snippet.publishedAt).toLocaleDateString()),
            datasets: [{
              label: 'Comments',
              data: commentsData,
              fill: false,
              backgroundColor: 'rgba(153,102,255,0.4)',
              borderColor: 'rgba(153,102,255,1)',
            }],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  color: '#e0e0e0',
                },
              },
              y: {
                grid: {
                  color: '#e0e0e0',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Container;
