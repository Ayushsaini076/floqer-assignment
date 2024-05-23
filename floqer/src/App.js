import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import Table from './components/Table';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatbot from './components/Chatbot';

// import charts from './components/Charts';

function App() {
  
  
  return (
    
    
    <BrowserRouter>
    <div className="h-[100%] pt-[2rem] w-[100%] bg-gradient-to-r from-[#E4DEFD] to-[#FBECEA]">
    <Navbar/>
      <Routes>
        <Route path='/' element={<Table/>}/>
        <Route path='/chat' element={<Chatbot/>}/>
      </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
