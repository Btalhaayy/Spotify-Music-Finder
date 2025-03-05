import React, { useState } from 'react';
import { Music, AlertCircle } from 'lucide-react';
import type { Track } from '../App';
import { getPlaylistTracks } from '../lib/spotify';

interface SpotifySectionProps {
  onTracksSelected: (tracks: Track[]) => void;
  onTrackSelect: (track: Track) => void;
  selectedTracks: Track[];
}

function SpotifySection({ onTracksSelected, onTrackSelect, selectedTracks }: SpotifySectionProps) {
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const tracks = await getPlaylistTracks(playlistUrl);
      onTracksSelected(tracks);
    } catch (err) {
      setError('Failed to load playlist. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Music className="h-6 w-6 text-green-500" />
        <h2 className="text-xl font-semibold">Spotify Playlist</h2>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={playlistUrl}
            onChange={(e) => setPlaylistUrl(e.target.value)}
            placeholder="Paste Spotify playlist URL"
            className="flex-1 px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Loading...' : 'Load'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-4 p-4 bg-red-900/50 rounded flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="text-red-200">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        {selectedTracks.map((track) => (
          <div
            key={track.id}
            onClick={() => onTrackSelect(track)}
            className="p-4 bg-gray-700 rounded cursor-pointer hover:bg-gray-600 transition"
          >
            <h3 className="font-semibold">{track.name}</h3>
            <p className="text-gray-400">{track.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpotifySection;