import React, { useState, useEffect } from 'react';
import { Music, Youtube, Github, Linkedin, Globe } from 'lucide-react';
import SpotifySection from './components/SpotifySection';
import YoutubeSection from './components/YoutubeSection';
import ExampleSection from './components/ExampleSection';
import { initializeSpotify } from './lib/spotify';

export interface Track {
  name: string;
  artist: string;
  id: string;
}

function App() {
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      const success = await initializeSpotify();
      setInitialized(success);
    };
    init();
  }, []);

  if (!initialized) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-xl">Initializing Spotify API...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="h-8 w-8 text-green-500" />
            <h1 className="text-2xl font-bold">Spotify to YouTube Converter </h1>
          </div>
          <div className="flex items-center gap-2">
            <Youtube className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 flex-grow">
        <div className="grid grid-cols-2 gap-4">
          {/* Spotify Section */}
          <SpotifySection 
            onTracksSelected={setSelectedTracks}
            onTrackSelect={setCurrentTrack}
            selectedTracks={selectedTracks}
          />

          {/* YouTube Section */}
          <YoutubeSection 
            currentTrack={currentTrack}
          />
        </div>

        {/* Example Section */}
        <ExampleSection />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm">
                Designed & Built by{' '}
                <a 
                  href="https://btalhaayyildiz.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Bedirhan Talha Ayyıldız
                </a>
              </p>
            </div>
            
            <div className="flex space-x-6">
              <a
                href="https://github.com/btalhaayy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              
              <a
                href="https://www.linkedin.com/in/btalhaayy/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              
              <a
                href="https://btalhaayyildiz.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Personal Website"
              >
                <Globe className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;