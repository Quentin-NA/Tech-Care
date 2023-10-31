import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';

import AllReceiptsView from './components/views/AllReceiptsView.jsx';
import NewReceiptForm from './components/views/NewReceiptForm.jsx';
import ReceiptView from './components/views/ReceiptView';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className='container'>
        <Navbar />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/receipts" element={<AllReceiptsView />} />
          <Route path="/newReceipt" element={<NewReceiptForm />} />
          <Route path="/receipt/:id" element={<ReceiptView />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
