
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto'; // Importing for Chart.js
// import Sidebar from './Sidebar'; // Import the Sidebar component
// import './App.css'; // Import the CSS file

// const API_KEY = 'AIzaSyDKINTEZRCP1tvL4uCSwZ9ev9aZ2aqqiXk'; // Replace with your actual API key
// const CHANNEL_ID = 'UCfF8pgdHcfqc-Co_ViXvFbQ'; // Replace with the channel ID

// function App() {
  
//   const [videoData, setVideoData] = useState([]);
//   const [channelName, setChannelName] = useState('');
//   const [channelLogo, setChannelLogo] = useState(''); // State for channel logo
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sliderValue, setSliderValue] = useState(5); // Default of videos to display

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch channel details
//         const channelResponse = await axios.get(
//           `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${CHANNEL_ID}&key=${API_KEY}`
//         );
//         if (!channelResponse.data.items.length) {
//           throw new Error('Channel not found.');
//         }
//         setChannelName(channelResponse.data.items[0].snippet.title);
//         setChannelLogo(channelResponse.data.items[0].snippet.thumbnails.high.url); // Set the channel logo

//         // Fetch video data
//         const videoResponse = await axios.get(
//           `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=50&key=${API_KEY}` // Increased maxResults
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
//           };
//         });

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

//   if (loading) return <p className="message">Loading...</p>;
//   if (error) return <p className="message">Error: {error}</p>;

//   // Slice the video data based on the slider value
//   const displayedVideoData = sliderValue === 0 ? [] : videoData.slice(0, sliderValue);

//   const chartData = {
//     labels: displayedVideoData.map(video => video.date),
//     datasets: [
//       {
//         label: 'Views',
//         data: displayedVideoData.map(video => video.views),
//         fill: true,
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         borderColor: 'rgba(75,192,192,1)',
//         tension: 0.4,
//       },
//       {
//         label: 'Likes',
//         data: displayedVideoData.map(video => video.likes),
//         fill: true,
//         backgroundColor: 'rgba(153,102,255,0.2)',
//         borderColor: 'rgba(153,102,255,1)',
//         tension: 0.4,
//       },
//       {
//         label: 'Comments',
//         data: displayedVideoData.map(video => video.comments),
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
//     <div className="container">
//       <Sidebar /> {/* Include the Sidebar component */}
//       <div className="mainContent">
//         <h1 className="title">YouTube Channel Analytics Dashboard</h1>
//         {channelName && (
//           <div className="channelInfo">
//             <img src={channelLogo} alt={`${channelName} Logo`} className="channelLogo" />
//             <h2 className="channelName">Channel Name: {channelName}</h2>
//           </div>
//         )}

//         <div className="sliderContainer">
//           <label htmlFor="videoSlider" className="sliderLabel">
//             Number of videos to display: {sliderValue === 0 ? 'All' : sliderValue}
//           </label>
//           <input
//             id="videoSlider"
//             type="number"
//             min="0"
//             value={sliderValue}
//             onChange={(e) => setSliderValue(Math.max(0, parseInt(e.target.value, 10)))}
//             className="slider"
//           />
//         </div>

//         <div className="dataContainer">
//           <h2 className="subTitle">Video Engagement Data</h2>
//           <div className="scrollableContainer">
//             <div className="cardsContainer">
//               {displayedVideoData.map(video => (
//                 <div key={video.title} className="card">
//                   <h3 className="videoTitle">{video.title}</h3>
//                   <p className="videoDetail"><strong>Published Date:</strong> {video.date}</p>
//                   <p className="videoDetail"><strong>Views:</strong> {video.views.toLocaleString()}</p>
//                   <p className="videoDetail"><strong>Likes:</strong> {video.likes.toLocaleString()}</p>
//                   <p className="videoDetail"><strong>Comments:</strong> {video.comments.toLocaleString()}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="chartContainer">
//           <h2 className="subTitle">Engagement Over Time</h2>
//           <Line data={chartData} options={chartOptions} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto'; // Importing for Chart.js
// import Sidebar from './Sidebar'; // Import the Sidebar component
// import './App.css'; // Import the CSS file

// const API_KEY = 'AIzaSyDKINTEZRCP1tvL4uCSwZ9ev9aZ2aqqiXk'; // Replace with your actual API key
// const CHANNEL_ID = 'UCfF8pgdHcfqc-Co_ViXvFbQ'; // Replace with the channel ID

// function App() {
  
//   const [videoData, setVideoData] = useState([]);
//   const [channelName, setChannelName] = useState('');
//   const [channelLogo, setChannelLogo] = useState(''); // State for channel logo
//   const [subscriberCount, setSubscriberCount] = useState(0); // State for subscriber count
//   const [totalVideos, setTotalVideos] = useState(0); // State for total number of videos
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sliderValue, setSliderValue] = useState(5); // Default of videos to display

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch channel details
//         const channelResponse = await axios.get(
//           `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${CHANNEL_ID}&key=${API_KEY}`
//         );
//         if (!channelResponse.data.items.length) {
//           throw new Error('Channel not found.');
//         }
//         const channelData = channelResponse.data.items[0];
//         setChannelName(channelData.snippet.title);
//         setChannelLogo(channelData.snippet.thumbnails.high.url); // Set the channel logo
//         setSubscriberCount(channelData.statistics.subscriberCount); // Set subscriber count

//         // Fetch video data
//         const videoResponse = await axios.get(
//           `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=50&key=${API_KEY}` // Increased maxResults
//         );

//         if (!videoResponse.data.items.length) {
//           throw new Error('No videos found for this channel.');
//         }

//         setTotalVideos(videoResponse.data.items.length); // Set total number of videos

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
//           };
//         });

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

//   if (loading) return <p className="message">Loading...</p>;
//   if (error) return <p className="message">Error: {error}</p>;

//   // Slice the video data based on the slider value
//   const displayedVideoData = sliderValue === 0 ? [] : videoData.slice(0, sliderValue);

//   const chartData = {
//     labels: displayedVideoData.map(video => video.date),
//     datasets: [
//       {
//         label: 'Views',
//         data: displayedVideoData.map(video => video.views),
//         fill: true,
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         borderColor: 'rgba(75,192,192,1)',
//         tension: 0.4,
//       },
//       {
//         label: 'Likes',
//         data: displayedVideoData.map(video => video.likes),
//         fill: true,
//         backgroundColor: 'rgba(153,102,255,0.2)',
//         borderColor: 'rgba(153,102,255,1)',
//         tension: 0.4,
//       },
//       {
//         label: 'Comments',
//         data: displayedVideoData.map(video => video.comments),
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
//     <div className="container">
//       <Sidebar /> {/* Include the Sidebar component */}
//       <div className="mainContent">
//         <h1 className="title">YouTube Channel Analytics Dashboard</h1>
//         {channelName && (
//           <div className="channelInfo">
//             <img src={channelLogo} alt={`${channelName} Logo`} className="channelLogo" />
//             <h2 className="channelName">Channel Name: {channelName}</h2>
//             <p className="subscriberCount"><strong>Subscribers:</strong> {subscriberCount.toLocaleString()}</p> {/* Display subscriber count */}
//             <p className="totalVideos"><strong>Total Videos:</strong> {totalVideos.toLocaleString()}</p> {/* Display total number of videos */}
//           </div>
//         )}

//         <div className="sliderContainer">
//           <label htmlFor="videoSlider" className="sliderLabel">
//             Number of videos to display: {sliderValue === 0 ? 'All' : sliderValue}
//           </label>
//           <input
//             id="videoSlider"
//             type="number"
//             min="0"
//             max={totalVideos}
//             value={sliderValue}
//             onChange={(e) => setSliderValue(Math.min(totalVideos, Math.max(0, parseInt(e.target.value, 10))))}
//             className="slider"
//           />
//         </div>

//         <div className="dataContainer">
//           <h2 className="subTitle">Video Engagement Data</h2>
//           <div className="scrollableContainer">
//             <div className="cardsContainer">
//               {displayedVideoData.map(video => (
//                 <div key={video.title} className="card">
//                   <h3 className="videoTitle">{video.title}</h3>
//                   <p className="videoDetail"><strong>Published Date:</strong> {video.date}</p>
//                   <p className="videoDetail"><strong>Views:</strong> {video.views.toLocaleString()}</p>
//                   <p className="videoDetail"><strong>Likes:</strong> {video.likes.toLocaleString()}</p>
//                   <p className="videoDetail"><strong>Comments:</strong> {video.comments.toLocaleString()}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="chartContainer">
//           <h2 className="subTitle">Engagement Over Time</h2>
//           <Line data={chartData} options={chartOptions} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Importing for Chart.js
import Sidebar from './Sidebar'; // Import the Sidebar component
import './App.css'; // Import the CSS file

const API_KEY = 'AIzaSyDKINTEZRCP1tvL4uCSwZ9ev9aZ2aqqiXk'; // Replace with your actual API key
const CHANNEL_ID = 'UCfF8pgdHcfqc-Co_ViXvFbQ'; // Replace with the channel ID

function App() {
  
  const [videoData, setVideoData] = useState([]);
  const [channelName, setChannelName] = useState('');
  const [channelLogo, setChannelLogo] = useState(''); // State for channel logo
  const [subscriberCount, setSubscriberCount] = useState(0); // State for subscriber count
  const [totalVideos, setTotalVideos] = useState(0); // State for total number of videos
  const [totalShorts, setTotalShorts] = useState(0); // State for total number of Shorts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sliderValue, setSliderValue] = useState(5); // Default of videos to display

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch channel details
        const channelResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${CHANNEL_ID}&key=${API_KEY}`
        );
        if (!channelResponse.data.items.length) {
          throw new Error('Channel not found.');
        }
        const channelData = channelResponse.data.items[0];
        setChannelName(channelData.snippet.title);
        setChannelLogo(channelData.snippet.thumbnails.high.url); // Set the channel logo
        setSubscriberCount(channelData.statistics.subscriberCount); // Set subscriber count

        // Fetch video data
        const videoResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=50&key=${API_KEY}` // Increased maxResults
        );

        if (!videoResponse.data.items.length) {
          throw new Error('No videos found for this channel.');
        }

        setTotalVideos(videoResponse.data.items.length); // Set total number of videos

        const videoIds = videoResponse.data.items.map(item => item.id.videoId).join(',');

        const statsResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${API_KEY}`
        );

        if (statsResponse.data.items.length !== videoResponse.data.items.length) {
          throw new Error('Mismatch between videos and statistics.');
        }

        const shortsCount = statsResponse.data.items.filter(item => {
          const duration = item.contentDetails.duration;
          return parseDuration(duration) <= 60; // Check if video duration is 60 seconds or less
        }).length;

        setTotalShorts(shortsCount); // Set total number of Shorts

        const data = videoResponse.data.items.map((item, index) => {
          const stats = statsResponse.data.items[index].statistics;
          return {
            title: item.snippet.title,
            views: parseInt(stats.viewCount, 10) || 0,
            likes: parseInt(stats.likeCount, 10) || 0,
            comments: parseInt(stats.commentCount, 10) || 0,
            date: item.snippet.publishedAt.split('T')[0],
          };
        });

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

  // Function to convert ISO 8601 duration format to seconds
  const parseDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;
    return hours * 3600 + minutes * 60 + seconds;
  };

  if (loading) return <p className="message">Loading...</p>;
  if (error) return <p className="message">Error: {error}</p>;

  // Slice the video data based on the slider value
  const displayedVideoData = sliderValue === 0 ? [] : videoData.slice(0, sliderValue);

  const chartData = {
    labels: displayedVideoData.map(video => video.date),
    datasets: [
      {
        label: 'Views',
        data: displayedVideoData.map(video => video.views),
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.4,
      },
      {
        label: 'Likes',
        data: displayedVideoData.map(video => video.likes),
        fill: true,
        backgroundColor: 'rgba(153,102,255,0.2)',
        borderColor: 'rgba(153,102,255,1)',
        tension: 0.4,
      },
      {
        label: 'Comments',
        data: displayedVideoData.map(video => video.comments),
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
    <div className="container">
      <Sidebar /> {/* Include the Sidebar component */}
      <div className="mainContent">
        <h1 className="title">YouTube Channel Analytics Dashboard</h1>
        {channelName && (
          <div className="channelInfo">
            <img src={channelLogo} alt={`${channelName} Logo`} className="channelLogo" />
            <h2 className="channelName">Channel Name: {channelName}</h2>
            <p className="subscriberCount"><strong>Subscribers:</strong> {subscriberCount.toLocaleString()}</p> {/* Display subscriber count */}
            <p className="totalVideos"><strong>Total Videos:</strong> {totalVideos.toLocaleString()}</p> {/* Display total number of videos */}
            <p className="totalShorts"><strong>Total Shorts:</strong> {totalShorts.toLocaleString()}</p> {/* Display total number of Shorts */}
          </div>
        )}

        <div className="sliderContainer">
          <label htmlFor="videoSlider" className="sliderLabel">
            Number of videos to display: {sliderValue === 0 ? 'All' : sliderValue}
          </label>
          <input
            id="videoSlider"
            type="number"
            min="0"
            max={totalVideos}
            value={sliderValue}
            onChange={(e) => setSliderValue(Math.min(totalVideos, Math.max(0, parseInt(e.target.value, 10))))}
            className="slider"
          />
        </div>

        <div className="dataContainer">
          <h2 className="subTitle">Video Engagement Data</h2>
          <div className="scrollableContainer">
            <div className="cardsContainer">
              {displayedVideoData.map(video => (
                <div key={video.title} className="card">
                  <h3 className="videoTitle">{video.title}</h3>
                  <p className="videoDetail"><strong>Published Date:</strong> {video.date}</p>
                  <p className="videoDetail"><strong>Views:</strong> {video.views.toLocaleString()}</p>
                  <p className="videoDetail"><strong>Likes:</strong> {video.likes.toLocaleString()}</p>
                  <p className="videoDetail"><strong>Comments:</strong> {video.comments.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chartContainer">
          <h2 className="subTitle">Engagement Over Time</h2>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default App;
