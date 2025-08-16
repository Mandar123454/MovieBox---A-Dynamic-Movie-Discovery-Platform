import React from 'react';
import ReactDOM from 'react-dom/client';

// Simple component that definitely renders
const TestApp = () => {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#e50914', marginBottom: '20px' }}>MovieBox Test Page</h1>
      <p style={{ fontSize: '18px', marginBottom: '20px' }}>If you can see this content, React is rendering correctly!</p>
      <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <p><strong>Current Environment:</strong></p>
        <ul style={{ marginTop: '10px', lineHeight: '1.6' }}>
          <li>API Key: {import.meta.env.VITE_TMDB_API_KEY ? `${import.meta.env.VITE_TMDB_API_KEY.substring(0, 4)}...` : 'Not found'}</li>
          <li>Mode: {import.meta.env.MODE}</li>
          <li>Base URL: {import.meta.env.BASE_URL}</li>
        </ul>
      </div>
      <button 
        style={{ 
          marginTop: '20px', 
          padding: '10px 20px', 
          backgroundColor: '#0070f3', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        onClick={() => alert('React events are working!')}
      >
        Click Me
      </button>
    </div>
  );
};

// Directly render to the DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>
);
