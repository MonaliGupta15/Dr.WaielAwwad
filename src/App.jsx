import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import MasterProfile from './pages/MasterProfile'
import Gallery from './pages/Gallery'
import Articles from './pages/Articles'
import Contact from './pages/Contact'
import SmoothScroll from './components/SmoothScroll'

const App = () => {
  return (
    <div className="bg-ivory selection:bg-gold/30 selection:text-forest">
      <SmoothScroll>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/master-profile" element={<MasterProfile />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </SmoothScroll>
    </div>
  )
}

export default App