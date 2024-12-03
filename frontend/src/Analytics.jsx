

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto'; // Importing for Chart.js
// import Sidebar from './Sidebar'; // Import the Sidebar component

// const API_KEY = 'AIzaSyCrHrKynKUn7JQYnBWcprije5YML9oM6o4'; // Replace with your actual API key
// const CHANNEL_ID = 'UCsvbtREDWIJF3kGVYg2g_ew'; // Replace with the channel ID

// const Analytics = () => {
//   const [videoData, setVideoData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showAll, setShowAll] = useState(false); // State to toggle between top 4 and all videos

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch video data
//         const videoResponse = await axios.get(
//           `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=20&key=${API_KEY}`
//         );

//         if (!videoResponse.data.items.length) {
//           throw new Error('No videos found for this channel.');
//         }

//         const videoIds = videoResponse.data.items.map(item => item.id.videoId).join(',');

//         const statsResponse = await axios.get(
//           `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY}`
//         );

//         if (statsResponse.data.items.length !== videoResponse.data.items.length) {
//           throw new Error('Mismatch between videos and statistics.');
//         }

//         const data = videoResponse.data.items.map((item, index) => {
//           const stats = statsResponse.data.items[index].statistics;
//           return {
//             title: item.snippet.title,
//             views: parseInt(stats.viewCount, 10) || 0,
//             likes: parseInt(stats.likeCount, 10) || 0,
//             comments: parseInt(stats.commentCount, 10) || 0,
//             date: item.snippet.publishedAt.split('T')[0],
//             averageViews: parseInt(stats.viewCount, 10) || 0, // Using total views as a placeholder for average
//             thumbnail: item.snippet.thumbnails.medium.url, // Add thumbnail URL
//           };
//         });

//         // Sort videos by views in descending order
//         data.sort((a, b) => b.views - a.views);

//         setVideoData(data);
//       } catch (error) {
//         setError(error.response ? error.response.data.error.message : error.message);
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p style={styles.message}>Loading...</p>;
//   if (error) return <p style={styles.message}>Error: {error}</p>;

//   const top4Videos = videoData.slice(0, 4); // Get the top 4 videos
//   const allTopRatedVideos = videoData; // All videos (sorted by views)

//   const chartData = {
//     labels: videoData.map(video => video.date),
//     datasets: [
//       {
//         label: 'Views',
//         data: videoData.map(video => video.views),
//         fill: true,
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         borderColor: 'rgba(75,192,192,1)',
//         tension: 0.4,
//       },
//       {
//         label: 'Likes',
//         data: videoData.map(video => video.likes),
//         fill: true,
//         backgroundColor: 'rgba(153,102,255,0.2)',
//         borderColor: 'rgba(153,102,255,1)',
//         tension: 0.4,
//       },
//       {
//         label: 'Comments',
//         data: videoData.map(video => video.comments),
//         fill: true,
//         backgroundColor: 'rgba(255,159,64,0.2)',
//         borderColor: 'rgba(255,159,64,1)',
//         tension: 0.4,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         grid: {
//           color: '#e0e0e0',
//         },
//       },
//       y: {
//         grid: {
//           color: '#e0e0e0',
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           font: {
//             size: 14,
//           },
//         },
//       },
//       tooltip: {
//         backgroundColor: '#333',
//         titleFont: {
//           size: 16,
//         },
//         bodyFont: {
//           size: 14,
//         },
//       },
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <Sidebar /> {/* Add Sidebar here */}
//       <div style={styles.mainContent}>
//         <h1 style={styles.title}>Analytic Dashboard (last 28 days)</h1>
//         <div style={styles.chartContainer}>
//           <Line data={chartData} options={chartOptions} />
//         </div>

//         <div style={styles.topVideosContainer}>
//           <h2 style={styles.subTitle}>Top Rated Videos</h2>
//           <div style={styles.videoList}>
//             {(showAll ? allTopRatedVideos : top4Videos).map((video) => (
//               <div key={video.title} style={styles.topVideoCard}>
//                 <img src={video.thumbnail} alt={video.title} style={styles.videoThumbnail} /> {/* Display thumbnail */}
//                 <h3 style={styles.videoTitle}>{video.title}</h3>
//                 <div style={styles.videoDetails}>
//                   <div style={styles.detailColumn}>
//                     <p style={styles.videoDetail}><strong>Views:</strong> {video.views.toLocaleString()}</p>
//                     <p style={styles.videoDetail}><strong>Average Views:</strong> {video.averageViews.toLocaleString()}</p>
//                   </div>
//                 </div>
//                 <p style={styles.videoDetail}><strong>Date:</strong> {video.date}</p>
//               </div>
//             ))}
//           </div>
//           <button
//             style={styles.button}
//             onClick={() => setShowAll(!showAll)}
//           >
//             {showAll ? 'Show Top 4 Videos' : 'Show All Videos'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     fontFamily: 'Arial, sans-serif',
//     display: 'flex',
//   },
//   mainContent: {
//     marginLeft: '250px', // Adjust based on sidebar width
//     padding: '30px',
//     backgroundColor: '#f0f2f5',
//     minHeight: '100vh',
//     flex: 1,
//   },
//   title: {
//     textAlign: 'center',
//     color: '#2c3e50',
//     marginBottom: '20px',
//     fontSize: '2.5rem',
//   },
//   chartContainer: {
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//     padding: '20px',
//     height: '400px',
//   },
//   topVideosContainer: {
//     marginTop: '30px',
//     padding: '20px',
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//   },
//   subTitle: {
//     color: '#34495e',
//     marginBottom: '15px',
//     fontSize: '1.5rem',
//     textAlign: 'center',
//   },
//   videoList: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '15px',
//   },
//   topVideoCard: {
//     backgroundColor: '#ecf0f1',
//     padding: '15px',
//     borderRadius: '8px',
//     boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   videoThumbnail: {
//     width: '100%', // Ensure it scales with its container
//     maxWidth: '300px', // Reduced size from 400px to 300px
//     borderRadius: '8px',
//     marginBottom: '10px',
//   },
//   videoTitle: {
//     fontSize: '1.2rem',
//     marginBottom: '10px',
//   },
//   videoDetails: {
//     display: 'flex',
//     justifyContent: 'space-between',
//   },
//   detailColumn: {
//     display: 'flex',
//     flexDirection: 'column',
//     width: '50%',
//   },
//   videoDetail: {
//     fontSize: '1rem',
//     marginBottom: '5px',
//   },
//   message: {
//     textAlign: 'center',
//     color: '#e74c3c',
//     fontSize: '1.2rem',
//   },
//   button: {
//     display: 'block',
//     width: '100%',
//     padding: '10px',
//     marginTop: '20px',
//     fontSize: '1rem',
//     color: '#fff',
//     backgroundColor: '#3498db',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//   },
// };

// export default Analytics;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Sidebar from './Sidebar';
import './Analytics.css';

const API_KEY = 'AIzaSyCrHrKynKUn7JQYnBWcprije5YML9oM6o4';
const CHANNEL_ID = 'UCsvbtREDWIJF3kGVYg2g_ew';

const Analytics = () => {
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState('views');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=20&key=${API_KEY}`
        );

        if (!videoResponse.data.items.length) {
          throw new Error('No videos found for this channel.');
        }

        const videoIds = videoResponse.data.items.map(item => item.id.videoId).join(',');
        const statsResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY}`
        );

        if (statsResponse.data.items.length !== videoResponse.data.items.length) {
          throw new Error('Mismatch between videos and statistics.');
        }

        const data = videoResponse.data.items.map((item, index) => {
          const stats = statsResponse.data.items[index].statistics;
          return {
            title: item.snippet.title,
            views: parseInt(stats.viewCount, 10) || 0,
            likes: parseInt(stats.likeCount, 10) || 0,
            comments: parseInt(stats.commentCount, 10) || 0,
            date: item.snippet.publishedAt.split('T')[0],
            averageViews: parseInt(stats.viewCount, 10) || 0,
            thumbnail: item.snippet.thumbnails.medium.url,
          };
        });

        data.sort((a, b) => b.views - a.views);
        setVideoData(data);
      } catch (error) {
        setError(error.response ? error.response.data.error.message : error.message);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p style={styles.message}>Loading...</p>;
  if (error) return <p style={styles.message}>Error: {error}</p>;

  const totalViews = videoData.reduce((acc, video) => acc + video.views, 0);
  const totalLikes = videoData.reduce((acc, video) => acc + video.likes, 0);
  const averageViews = totalViews / videoData.length || 0;

  const sortedVideos = [...videoData].sort((a, b) => {
    return sortBy === 'views' ? b.views - a.views : b.likes - a.likes;
  });

  const top4Videos = sortedVideos.slice(0, 4);
  const allTopRatedVideos = sortedVideos;

  const chartData = {
    labels: videoData.map(video => video.date),
    datasets: [
      {
        label: 'Views',
        data: videoData.map(video => video.views),
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.4,
      },
      {
        label: 'Likes',
        data: videoData.map(video => video.likes),
        fill: true,
        backgroundColor: 'rgba(153,102,255,0.2)',
        borderColor: 'rgba(153,102,255,1)',
        tension: 0.4,
      },
      {
        label: 'Comments',
        data: videoData.map(video => video.comments),
        fill: true,
        backgroundColor: 'rgba(255,159,64,0.2)',
        borderColor: 'rgba(255,159,64,1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
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
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: '#333',
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        },
      },
    },
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.mainContent}>
        <div style={styles.analyticsSummary}>
          <h2>Analytics Dashboard</h2>
          <p><strong>Total Views:</strong> {totalViews.toLocaleString()}</p>
          <p><strong>Total Likes:</strong> {totalLikes.toLocaleString()}</p>
          <p><strong>Average Views per Video:</strong> {averageViews.toLocaleString()}</p>
        </div>

        <div style={styles.chartContainer}>
          <Line data={chartData} options={chartOptions} />
        </div>

        <div style={styles.topVideosContainer}>
          <h2 style={styles.subTitle}>Top Rated Videos</h2>
          <div style={styles.sortButtons}>
            <button onClick={() => setSortBy('views')} style={styles.button}>
              Sort by Views
            </button>
            <button onClick={() => setSortBy('likes')} style={styles.button}>
              Sort by Likes
            </button>
          </div>
          <div style={styles.videoList}>
            {(showAll ? allTopRatedVideos : top4Videos).map((video) => (
              <div key={video.title} style={styles.topVideoCard}>
                <img src={video.thumbnail} alt={video.title} style={styles.videoThumbnail} />
                <h3 style={styles.videoTitle}>{video.title}</h3>
                <div style={styles.videoDetails}>
                  <div style={styles.detailColumn}>
                    <p style={styles.videoDetail}><strong>Views:</strong> {video.views.toLocaleString()}</p>
                    <p style={styles.videoDetail}><strong>Likes:</strong> {video.likes.toLocaleString()}</p>
                    <p style={styles.videoDetail}><strong>Average Views:</strong> {video.averageViews.toLocaleString()}</p>
                  </div>
                </div>
                <p style={styles.videoDetail}><strong>Date:</strong> {video.date}</p>
              </div>
            ))}
          </div>
          <button
            style={styles.button}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Top 4 Videos' : 'Show All Videos'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
  },
  mainContent: {
    marginLeft: '250px', // Adjust based on sidebar width
    padding: '30px',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
    flex: 1,
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '20px',
    height: '400px',
  },
  topVideosContainer: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  subTitle: {
    color: '#34495e',
    marginBottom: '15px',
    fontSize: '1.5rem',
    textAlign: 'center',
  },
  videoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  topVideoCard: {
    backgroundColor: '#ecf0f1',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  videoThumbnail: {
    width: '100%', // Ensure it scales with its container
    maxWidth: '300px', // Reduced size from 400px to 300px
    borderRadius: '8px',
    marginBottom: '10px',
  },
  videoTitle: {
    fontSize: '1.2rem',
    marginBottom: '10px',
  },
  videoDetails: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  detailColumn: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  videoDetail: {
    fontSize: '1rem',
    marginBottom: '5px',
  },
  message: {
    textAlign: 'center',
    color: '#e74c3c',
    fontSize: '1.2rem',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginTop: '20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#3498db',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default Analytics;
