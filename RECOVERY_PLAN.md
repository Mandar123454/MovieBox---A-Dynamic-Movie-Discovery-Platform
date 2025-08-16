# Movie App Recovery Plan

After fixing the blank screen issue, follow these steps to restore the full functionality.

## Step 1: Verify Basic App Works

1. Visit http://localhost:5174/
2. You should see a simplified version of the app
3. Click the "Test TMDB API" button
4. Verify that movies are loaded from the API

## Step 2: Restore Router

Update App.jsx to use React Router:

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ color: '#032541', marginBottom: '20px' }}>MovieBox</h1>
        
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ marginRight: '15px' }}>Home</a>
          <a href="/movies">Movies</a>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

// Simple Home component
function Home() {
  return (
    <div>
      <h2>Welcome to MovieBox</h2>
      <p>A simple movie discovery application</p>
    </div>
  );
}

export default App;
```

## Step 3: Add Components One by One

Add components back in this order:

1. Header
2. Footer
3. HomePage
4. MoviesPage
5. Other pages and components

Test after each addition to ensure everything works.

## Step 4: Add Full API Integration

Once the basic components are working, re-enable the full API integration.

## Step 5: Final Styling and Polish

Apply the final styling and polish to make the app look professional.

## Troubleshooting Tips

- Check the browser console for errors
- Verify the API key is working
- Make sure all imported components exist
- Check for syntax errors in your components
- Ensure CSS is properly loaded
