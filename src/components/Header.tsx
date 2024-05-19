import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ isAuthenticated, onSignOut, owner, status }) {
  const location = useLocation();
  return (
    <>
      {isAuthenticated && (
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
          <button
            onClick={onSignOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
          <div className="flex items-center">
            <p className="mr-4">Owner: {owner}</p>
            <p className={`mr-4 ${status ? 'text-green-500' : 'text-red-500'}`}>
              ICP Status: {status ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>
      )}
      <h1 className="text-4xl text-center mt-8 font-bold text-gray-800">
        Evenity: Host Events in a Decentralized Way
      </h1>
      <nav className="flex justify-center mt-4">
        <Link
          to="/"
          className={`mx-4 ${
            location.pathname === '/' ? 'text-blue-500' : 'text-gray-600'
          }`}
        >
          Home
        </Link>
        <Link
          to="/view-events"
          className={`mx-4 ${
            location.pathname === '/view-events'
              ? 'text-blue-500'
              : 'text-gray-600'
          }`}
        >
          View Events
        </Link>
        <Link
          to="/host-event"
          className={`mx-4 ${
            location.pathname === '/host-event'
              ? 'text-blue-500'
              : 'text-gray-600'
          }`}
        >
          Host Event
        </Link>
        <Link
          to="/my-nfts"
          className={`mx-4 ${
            location.pathname === '/my-nfts' ? 'text-blue-500' : 'text-gray-600'
          }`}
        >
          My Event NFTs
        </Link>
      </nav>
    </>
  );
}
