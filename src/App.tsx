import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfileList from './features/components/ProfileList';
import ProfileShow from './features/pages/ProfileShow';
import EditProfile from './features/pages/EditProfile';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProfileList />} />
          <Route path="/profile/:id" element={<ProfileShow />} />
          <Route path="/create" element={<EditProfile />} />
          <Route path="/edit/:id" element={<EditProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;