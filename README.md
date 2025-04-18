# **About Spotify Playlist Analyzer**
Is it just me or is managing Spotify playlists a bit too cumbersome? Want something simpler in life? Something made for music lovers? Try Spotify Playlist Analyzer — a JavaScript application that fetches tracks from a Spotify playlist and allows you to search for them on YouTube.

## Installation
To get started, clone this repository and install the necessary dependencies.

```bash
git clone <repository-url>
cd <repository-directory>
npm install
```

### Usage
**To use the Spotify Playlist Analyzer, follow these steps:**

**Initialize the Spotify API**: Ensure you have valid Spotify API credentials. Replace the placeholder credentials in the code with your own.

**Fetch Playlist Tracks**: Input a Spotify playlist URL to retrieve and display the list of tracks.

**Search on YouTube**: Select a track to perform a YouTube search and view the results.

#### Example Command
To initialize the Spotify API and fetch playlist tracks:
```javascript
initializeSpotify().then(success => {
  if (success) {
    getPlaylistTracks('https://open.spotify.com/playlist/your_playlist_id')
      .then(tracks => console.log(tracks))
      .catch(error => console.error(error));
  }
});
```
#### Disclaimer
Ensure you replace the placeholder Spotify API credentials with your own. The application requires a valid client ID and secret to function properly.
