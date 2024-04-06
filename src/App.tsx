// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UrlCreator from './Components/UrlCreator';
import Redirector from './Components/Redirector'; 

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={UrlCreator} />
        <Route path="/:shortenedUrlKey" Component={Redirector} /> {/* This route will match any shortened URL */}
      </Routes>
    </Router>
  );
}

export default App;
