import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const MusicPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch all songs initially
    axios.get('https://back123-production.up.railway.app/songs')
      .then(response => {
        setSongs(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the songs!', error);
      });
  }, []);

  useEffect(() => {
    // Fetch songs based on search query
    if (searchQuery === '') {
      // If search query is empty, fetch all songs
      axios.get('https://back123-production.up.railway.app/songs')
        .then(response => {
          setSongs(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the songs!', error);
        });
    } else {
      // If search query is not empty, perform search
      axios.get('https://back123-production.up.railway.app/search?query=${searchQuery}')
        .then(response => {
          setSongs(response.data);
        })
        .catch(error => {
          console.error('There was an error searching for songs!', error);
        });
    }
  }, [searchQuery]);

  const playSong = (song) => {
    setCurrentSong(song);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen  text-black p-6">
      <img src="https://images5.alphacoders.com/134/thumb-1920-1349944.png" alt="Background" className="absolute inset-0 w-full h-full object-cover z-[-1]" />

     
      <div className="max-w-4xl mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="¿Qué quieres reproducir?"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-400 shadow-md rounded">
            <thead>
              <tr className="bg-gray-300 text-gray-600 text-left">
                <th className="p-4 font-medium">Cancion</th>
                <th className="p-4 font-medium">ALBUM</th>
                <th className="p-4 font-medium text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {songs.map(song => (
                <tr key={song.id} className="border-b border-gray-200">
                  <td className="p-4">{song.title}</td>
                  <td className="p-4">{song.artist}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => playSong(song)}
                      className=" bg-yellow-300 text-white px-4 py-2 rounded hover:bg-orange-600"
                    >
                      Play
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {currentSong && (
          <div className="mt-6 p-4 bg-white rounded shadow-md">
           
            <h2 className="text-2xl font-semibold">{currentSong.title}</h2>
            <audio controls src={currentSong.file_path} className="w-full mt-4" autoPlay />
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;