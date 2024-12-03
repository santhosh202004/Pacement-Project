// About.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = 'AIzaSyCrHrKynKUn7JQYnBWcprije5YML9oM6o4'; // Replace with your actual API key
const CHANNEL_ID = 'UCsvbtREDWIJF3kGVYg2g_ew'; // Replace with the channel ID

const About = () => {
  const [channelDescription, setChannelDescription] = useState('');
  const [channelLogo, setChannelLogo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${CHANNEL_ID}&key=${API_KEY}`
        );
        if (!response.data.items.length) {
          throw new Error('Channel not found.');
        }
        const { description, thumbnails } = response.data.items[0].snippet;
        setChannelDescription(description);
        setChannelLogo(thumbnails.high.url); // Get the channel logo
      } catch (error) {
        setError(error.response ? error.response.data.error.message : error.message);
        console.error('Error fetching channel data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelData();
  }, []);

  if (loading) return <p style={styles.message}>Loading...</p>;
  if (error) return <p style={styles.message}>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About the Channel</h1>
      <div style={styles.channelInfo}>
        <img src={channelLogo} alt="Channel Logo" style={styles.channelLogo} />
        <p style={styles.description}>{channelDescription}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '20px',
    fontSize: '2rem',
  },
  channelInfo: {
    textAlign: 'center',
  },
  channelLogo: {
    borderRadius: '50%',
    width: '100px',
    height: '100px',
    marginBottom: '10px',
  },
  description: {
    color: '#34495e',
    fontSize: '1rem',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  message: {
    textAlign: 'center',
    color: '#e74c3c',
    fontSize: '1.2rem',
  },
};

export default About;
