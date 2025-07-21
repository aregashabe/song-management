// App.jsx
import React, { Suspense, lazy } from 'react';

// Lazy load components
const Create = lazy(() => import('./components/Create'));
const Home = lazy(() => import('./components/Home'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Create />
        <Home />
      </Suspense>
    </div>
  );
}

export default App;
