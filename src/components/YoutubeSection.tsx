import React, { useEffect, useState } from 'react';
import { Youtube } from 'lucide-react';
import type { Track } from '../App';

interface YoutubeSectionProps {
  currentTrack: Track | null;
}

interface YoutubeResult {
  title: string;
  url: string;
  thumbnail: string;
  videoId: string;
}

// YouTube API Key'inizi buraya ekleyin
const YOUTUBE_API_KEY = 'AIzaSyB5d4FmO5kov88crlGYBDCXKNdcD-uFYIA';

function YoutubeSection({ currentTrack }: YoutubeSectionProps) {
  const [results, setResults] = useState<YoutubeResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchYoutube = async () => {
      if (!currentTrack) return;

      setIsLoading(true);
      setError(null);

      try {
        const searchQuery = `${currentTrack.name} ${currentTrack.artist} official music video`;
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=${encodeURIComponent(
            searchQuery
          )}&type=video&key=${YOUTUBE_API_KEY}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch YouTube results');
        }

        const data = await response.json();
        
        const formattedResults = data.items.map((item: any) => ({
          title: item.snippet.title,
          url: `https://youtube.com/watch?v=${item.id.videoId}`,
          thumbnail: item.snippet.thumbnails.high.url,
          videoId: item.id.videoId
        }));

        setResults(formattedResults);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    searchYoutube();
  }, [currentTrack]);

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Youtube className="h-6 w-6 text-red-500" />
        <h2 className="text-xl font-semibold">YouTube Results</h2>
      </div>

      {currentTrack ? (
        <div className="space-y-4">
          <p className="text-gray-400">
            Results for: {currentTrack.name} - {currentTrack.artist}
          </p>
          
          {isLoading && (
            <div className="text-center py-4">
              <p>Loading results...</p>
            </div>
          )}

          {error && (
            <div className="text-red-500 text-center py-4">
              <p>{error}</p>
            </div>
          )}

          {!isLoading && !error && results.map((result, index) => (
            <div key={index} className="bg-gray-700 rounded overflow-hidden">
              <img 
                src={result.thumbnail} 
                alt={result.title} 
                className="w-full h-40 object-cover" 
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{result.title}</h3>
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Watch on YouTube
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-12">
          <p>Select a track from the Spotify playlist to see YouTube results</p>
        </div>
      )}
    </div>
  );
}

export default YoutubeSection;