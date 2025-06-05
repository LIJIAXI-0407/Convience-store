// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess';
import History from './pages/History/History';
import StrawberryCandyPriceModal from './components/Modal/StrawberryCandyPriceModal';
import OrangeJuicePriceModal from './components/Modal/OrangeJuicePriceModal';
import StrawberryDollPriceModal from './components/Modal/StrawberryDollPriceModal';
import FootballPriceModal from './components/Modal/FootballPriceModal';
import PotatoCripsPriceModal from './components/Modal/PotatoCripsPriceModal';
import MoonHoneyPriceModal from './components/Modal/MoonHoneyPriceModal';
import CokaPriceModal from './components/Modal/CokaPriceModal';
import CafeBeveragePriceModal from './components/Modal/CafeBeveragePriceModal';
import Login from './pages/Login/Login';
import SignUp from './pages/Register/SignUp';
import Member from './pages/MemberCard/Member';
import AIChat from './pages/AIService/AI Chat';
import YogurtPriceModal from './components/Modal/YogurtPriceModal';
import IcedLattePriceModal from './components/Modal/IcedLattePriceModal';
import DeliciousPastaPriceModal from './components/Modal/DeliciousPastaPriceModal';
import BigHambergPriceModal from './components/Modal/BigHambergPriceModal';
import TakoYakiPriceModal from './components/Modal/TakoYakiPriceModal';
import Scan from './pages/Scan/Scan';

function App() {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/history" element={<History />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/member" element={<Member />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/product-modal" element={
              <>
                <Home />
                <StrawberryCandyPriceModal />
              </>
            } />
            <Route path="/coka-cola-modal" element={
              <>
                <Home />
                <CokaPriceModal />
              </>
            } />
            <Route path="/potato-crips-modal" element={
              <>
                <Home />
                <PotatoCripsPriceModal />
              </>
            } />
            <Route path="/moon-honey-modal" element={
              <>
                <Home />
                <MoonHoneyPriceModal />
              </>
            } />
            <Route path="/cafe-beverage-modal" element={
              <>
                <Home />
                <CafeBeveragePriceModal />
              </>
            } />
            <Route path="/member/orange-juice-modal" element={
              <>
                <Member />
                <OrangeJuicePriceModal />
              </>
            } />
            <Route path="/member/strawberry-doll-modal" element={
              <>
                <Member />
                <StrawberryDollPriceModal />
              </>
            } />
            <Route path="/member/football-modal" element={
              <>
                <Member />
                <FootballPriceModal />
              </>
            } />
            <Route path="/yogurt-modal" element={
              <>
                <Home />
                <YogurtPriceModal />
              </>
            } />
            <Route path="/iced-latte-modal" element={
              <>
                <Home />
                <IcedLattePriceModal />
              </>
            } />
            <Route path="/delicious-pasta-modal" element={
              <>
                <Home />
                <DeliciousPastaPriceModal />
              </>
            } />
            <Route path="/big-hamberg-modal" element={
              <>
                <Home />
                <BigHambergPriceModal />
              </>
            } />
            <Route path="/tako-yaki-modal" element={
              <>
                <Home />
                <TakoYakiPriceModal />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
