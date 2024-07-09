import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    } else if (!isRunning && elapsedTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const handleStart = () => {
    setStartTime(Date.now() - elapsedTime);
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps([...laps, elapsedTime]);
  };

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 100);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${milliseconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4 overflow-hidden">
      <h1 className="text-4xl font-bold mb-8">Stopwatch</h1>
      <div className="text-6xl font-mono bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
        {formatTime(elapsedTime)}
      </div>
      <div className="flex space-x-4 mb-8">
        <button 
          onClick={handleStart} 
          disabled={isRunning} 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start
        </button>
        <button 
          onClick={handleStop} 
          disabled={!isRunning} 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Stop
        </button>
        <button 
          onClick={handleLap} 
          disabled={!isRunning} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Lap
        </button>
        <button 
          onClick={handleReset} 
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>
      <div className="flex flex-col items-center w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Laps</h2>
        <ul className="bg-gray-800 p-4 rounded-lg shadow-lg w-full overflow-auto max-h-40">
          {laps.map((lap, index) => (
            <li key={index} className="mb-2">
              {formatTime(lap)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Stopwatch;
