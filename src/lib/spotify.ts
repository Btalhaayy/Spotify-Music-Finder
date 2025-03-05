import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

// Type guard to check if the track is a music track
function isMusicTrack(track: any): track is SpotifyApi.TrackObjectFull {
  return 'artists' in track;
}

// Initialize the API
export const initializeSpotify = async () => {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(''),
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    spotifyApi.setAccessToken(data.access_token);
    return true;
  } catch (error) {
    console.error('Error initializing Spotify API:', error);
    return false;
  }
};

export const getPlaylistTracks = async (playlistUrl: string) => {
  try {
    // Extract playlist ID from URL
    const playlistId = playlistUrl.split('playlist/')[1]?.split('?')[0];
    if (!playlistId) throw new Error('Invalid playlist URL');

    const response = await spotifyApi.getPlaylist(playlistId);
    return response.tracks.items.map(item => {
      const track = item.track;
      
      // Check if it's a music track
      if (isMusicTrack(track)) {
        return {
          name: track.name,
          artist: track.artists[0].name,
          id: track.id
        };
      } else {
        // Handle podcast episodes or other content types
        return {
          name: track.name,
          artist: 'Unknown Artist',
          id: track.id
        };
      }
    });
  } catch (error) {
    console.error('Error fetching playlist:', error);
    throw error;
  }
};

export default spotifyApi;