import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './component/layout/Navbar'
import Footer from './component/layout/Footer'
import MostActiveSymbols from './component/pages/MostActiveSymbols';

import './App.scss';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path='/most-active-symbols' element={<MostActiveSymbols />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
