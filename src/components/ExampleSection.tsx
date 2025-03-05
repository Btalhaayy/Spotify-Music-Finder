import React from 'react';
import { Info } from 'lucide-react';

function ExampleSection() {
  return (
    <div className="mt-8 bg-gray-800 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Info className="h-6 w-6 text-blue-500" />
        <h2 className="text-xl font-semibold">How to Use</h2>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gray-700 p-4 rounded">
          <h3 className="font-semibold mb-2">Step 1: Paste Playlist URL</h3>
          <p className="text-gray-400">Copy your Spotify playlist URL and paste it in the input field above</p>
        </div>

        <div className="bg-gray-700 p-4 rounded">
          <h3 className="font-semibold mb-2">Step 2: Select Track</h3>
          <p className="text-gray-400">Click on any track from the loaded playlist to find it on YouTube</p>
        </div>

        <div className="bg-gray-700 p-4 rounded">
          <h3 className="font-semibold mb-2">Step 3: Watch on YouTube</h3>
          <p className="text-gray-400">Choose from the YouTube results and click to watch the video</p>
        </div>
      </div>
    </div>
  );
}

export default ExampleSection;