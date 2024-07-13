import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './pages/ContentPage';
import Privacy from './pages/PrivacyPage';
import Login from './pages/LoginPage';
import "./styles/App.css";

function App() {

  return (
    <div className='App'>
      <Header />

      <div className='content'>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
