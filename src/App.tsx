// App.tsx
import React from 'react';
import UrlCreator from './Components/UrlCreator';
import Redirector from './Components/Redirector'; 
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={UrlCreator} />
        <Route path="/:shortenedUrlKey" Component={Redirector} />
      </Routes>
    </Router>
  );
};

export default App;
